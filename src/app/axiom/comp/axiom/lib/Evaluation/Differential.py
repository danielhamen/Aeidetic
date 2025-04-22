from axiom.lib.Evaluation.Evaluation import Evaluation
from axiom.lib.Symbol.Var import Var
from axiom.lib.Expression import Expression
from axiom.lib.Symbol.Const import Const

class Differential(Evaluation):
    """
    Represents a differential element: dx, dy.
    """
    def __init__(self, variable: Var):
        self.variable = variable

    def __str__(self) -> str:
        return f"d{self.variable}"

    def __repr__(self) -> str:
        return f"Differential({self.variable!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Differential):
            return False
        return self.variable == other.variable

    def simplify(self) -> Expression:
        return self

    def evaluate(self, env: dict = {}) -> Expression:
        return Const(0)
