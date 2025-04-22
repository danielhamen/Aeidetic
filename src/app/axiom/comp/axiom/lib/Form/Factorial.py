import math
from axiom.lib.Expression import Expression
from axiom.lib.Symbol.Const import Const
from axiom.lib.Form.Form import Form

class Factorial(Form):
    """
    Represents a factorial expression: n!
    """
    def __init__(self, expr: Expression):
        self.expr = expr

    def __str__(self) -> str:
        return f"({self.expr}!)"

    def __repr__(self) -> str:
        return f"Factorial({self.expr!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Factorial):
            return False
        return self.expr == other.expr

    def simplify(self) -> Expression:
        return self

    def evaluate(self, env: dict = {}) -> 'Expression':
        expr = self.expr.evaluate(env)
        if isinstance(expr, Const):
            val = expr.value
            assert val.is_integer and val >= 0, "Factorial argument must be a non-negative integer"
            return Const(math.factorial(int(val)))

        raise ValueError(f"Cannot evaluate factorial of non-constant expression")
