from axiom.lib.Transform.Transform import Transform
from axiom.lib.Expression import Expression

class Re(Transform):
    """
    Represents the extraction of the real part of a complex expression.
    """
    def __init__(self, expr: Expression):
        self.expr = expr

    def __str__(self) -> str:
        return f"Re({self.expr})"

    def __repr__(self) -> str:
        return f"Re({self.expr!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Re):
            return False
        return self.expr == other.expr

    def simplify(self) -> Expression:
        return self
