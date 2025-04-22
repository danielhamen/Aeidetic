from axiom.lib.Transform.Transform import Transform
from axiom.lib.Symbol.Var import Var
from axiom.lib.Expression import Expression
from axiom.lib.Evaluation.Derivative import Derivative

class Differentiate(Transform):
    """
    Represents a differentiation transformation as a shortcut wrapper for Derivative.
    """
    def __init__(self, expr: Expression, var: Var):
        self.expr = expr
        self.var = var

    def __str__(self) -> str:
        return f"Differentiate({self.expr}, d/d{self.var})"

    def __repr__(self) -> str:
        return f"Differentiate({self.expr!r}, {self.var!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Differentiate):
            return False
        return self.expr == other.expr and self.var == other.var

    def simplify(self) -> Expression:
        return Derivative(self.var, self.expr).simplify()
