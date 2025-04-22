from axiom.lib.Evaluation.Evaluation import Evaluation
from axiom.lib.Symbol.Var import Var
from axiom.lib.Symbol.Const import Const
from axiom.lib.Expression import Expression

class Partial(Evaluation):
    """
    Represents a partial derivative: ∂/∂x f(x, y).
    """
    def __init__(self, variable: Var, expr: Expression):
        self.variable = variable
        self.expr = expr

    def __str__(self) -> str:
        return f"∂/∂{self.variable}({self.expr})"

    def __repr__(self) -> str:
        return f"Partial({self.variable!r}, {self.expr!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Partial):
            return False
        return self.variable == other.variable and self.expr == other.expr

    def simplify(self) -> Expression:
        return self

    def evaluate(self, env: dict = {}) -> Expression:
        return Const(0)
