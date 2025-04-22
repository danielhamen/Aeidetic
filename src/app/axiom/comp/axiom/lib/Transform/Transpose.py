from axiom.lib.Transform.Transform import Transform
from axiom.lib.Expression import Expression

class Transpose(Transform):
    """
    Represents the transpose of a matrix.
    """
    def __init__(self, matrix: Expression):
        self.matrix = matrix

    def __str__(self) -> str:
        return f"Transpose({self.matrix})"

    def __repr__(self) -> str:
        return f"Transpose({self.matrix!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Transpose):
            return False
        return self.matrix == other.matrix

    def simplify(self) -> Expression:
        return self
