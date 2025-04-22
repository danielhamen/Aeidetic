from axiom.lib.Transform.Transform import Transform
from axiom.lib.Expression import Expression

class Im(Transform):
    """
    Represents the extraction of the imaginary part of a complex expression.
    """
    def __init__(self, expr: Expression):
        self.expr = expr

    def __str__(self) -> str:
        return f"Im({self.expr})"

    def __repr__(self) -> str:
        return f"Im({self.expr!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Im):
            return False
        return self.expr == other.expr

    def simplify(self) -> Expression:
        return self
