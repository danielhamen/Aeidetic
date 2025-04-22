from axiom.lib.Evaluation.Evaluation import Evaluation
from axiom.lib.Symbol.Var import Var
from axiom.lib.Expression import Expression
from axiom.lib.Symbol.Const import Const

class Derivative(Evaluation):
    """
    Represents a derivative: d/dx f(x).
    """
    def __init__(self, variable: Var, expr: Expression):
        self.variable = variable
        self.expr = expr

    def __str__(self) -> str:
        return f"d/d{self.variable}({self.expr})"

    def __repr__(self) -> str:
        return f"Derivative({self.variable!r}, {self.expr!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Derivative):
            return False
        return self.variable == other.variable and self.expr == other.expr

    def simplify(self) -> Expression:
        return self

    def evaluate(self, env: dict = {}) -> Expression:
        return Const(0)
