from axiom.lib.Transform.Transform import Transform
from axiom.lib.Expression import Expression

class Expand(Transform):
    """
    Represents an expansion transformation.
    """
    def __init__(self, expr: Expression):
        self.expr = expr

    def __str__(self) -> str:
        return f"Expand({self.expr})"

    def __repr__(self) -> str:
        return f"Expand({self.expr!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Expand):
            return False
        return self.expr == other.expr

    def simplify(self) -> Expression:
        return self.expr.simplify()
