from axiom.lib.Form.Form import Form
from axiom.lib.Expression import Expression
from axiom.lib.Symbol.Const import Const

class Power(Form):
    """
    Represents an exponentiation: base ^ exponent.
    """
    def __init__(self, base: Expression, exponent: Expression):
        self.base = base
        self.exponent = exponent

    def __str__(self) -> str:
        return f"({self.base}^{self.exponent})"

    def __repr__(self) -> str:
        return f"Power({self.base!r}, {self.exponent!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Power):
            return False
        return self.base == other.base and self.exponent == other.exponent

    def simplify(self) -> Expression:
        return Power(self.base.simplify(), self.exponent.simplify())

    def evaluate(self, env: dict = {}) -> 'Expression':
        base = self.base.evaluate(env)
        exponent = self.exponent.evaluate(env)

        if isinstance(base, Const) and isinstance(exponent, Const):
            base = float(base.value)
            exponent = float(exponent.value)
            return Const(base ** exponent)

        raise ValueError("Cannot evaluate non-constant power")
