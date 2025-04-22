from axiom.lib.Expression import Expression
from axiom.lib.Form.Form import Form
from axiom.lib.Symbol.Const import Const



# =============================================================================
# Implemented Classes: Form
# =============================================================================

class Fraction(Form):
    """
    Represents a fraction: numerator / denominator.
    """
    def __init__(self, numerator: Expression, denominator: Expression):
        self.numerator = numerator
        self.denominator = denominator

    def __str__(self) -> str:
        return f"({self.numerator} / {self.denominator})"

    def __repr__(self) -> str:
        return f"Fraction({self.numerator!r}, {self.denominator!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Fraction):
            return False
        return self.numerator == other.numerator and self.denominator == other.denominator

    def simplify(self) -> Expression:
        # Stub: Extend with actual simplification logic.
        return Fraction(self.numerator.simplify(), self.denominator.simplify())

    def evaluate(self, env: dict = {}) -> 'Expression':
        """Evaluate numerically using optional variable bindings."""
        n = self.numerator.evaluate(env)
        d = self.denominator.evaluate(env)
        if isinstance(n, Const) and isinstance(d, Const):
            n = n.value
            d = d.value
            if d == 0:
                raise ZeroDivisionError("Cannot divide by zero")

            return Const(n / d)

        raise ValueError("Missing corresponding environment definitions or unsupported expression")
