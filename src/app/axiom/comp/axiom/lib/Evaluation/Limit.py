from axiom.lib.Evaluation.Evaluation import Evaluation
from axiom.lib.Symbol.Var import Var
from axiom.lib.Expression import Expression
from axiom.lib.Symbol.Const import Const

class Limit(Evaluation):
    """
    Represents a limit: limₓ→a f(x).
    """
    def __init__(self, variable: Var, point: Expression, expr: Expression):
        self.variable = variable
        self.point = point
        self.expr = expr

    def __str__(self) -> str:
        return f"lim_{{{self.variable}→{self.point}}}({self.expr})"

    def __repr__(self) -> str:
        return f"Limit({self.variable!r}, {self.point!r}, {self.expr!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Limit):
            return False
        return self.variable == other.variable and self.point == other.point and self.expr == other.expr

    def simplify(self) -> Expression:
        return self

    def evaluate(self, env: dict = {}) -> Expression:
        return Const(0)
