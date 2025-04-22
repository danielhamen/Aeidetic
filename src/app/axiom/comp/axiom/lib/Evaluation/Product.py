from axiom.lib.Evaluation.Evaluation import Evaluation
from axiom.lib.Symbol.Var import Var
from axiom.lib.Expression import Expression
from axiom.lib.Symbol.Const import Const

class Product(Evaluation):
    """
    Represents a product: ∏ f(i).
    """
    def __init__(self, index: Var, lower: Expression, upper: Expression, expr: Expression):
        self.index = index
        self.lower = lower
        self.upper = upper
        self.expr = expr

    def __str__(self) -> str:
        return f"∏_{{{self.index}={self.lower}}}^{self.upper}({self.expr})"

    def __repr__(self) -> str:
        return f"Product({self.index!r}, {self.lower!r}, {self.upper!r}, {self.expr!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Product):
            return False
        return (self.index == other.index and self.lower == other.lower and
                self.upper == other.upper and self.expr == other.expr)

    def simplify(self) -> Expression:
        return self

    def evaluate(self, env: dict = {}) -> Expression:
        return Const(0)
