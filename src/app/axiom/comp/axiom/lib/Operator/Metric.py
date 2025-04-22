from axiom.lib.Expression import Expression
from axiom.lib.Operator.Operator import Operator

class Metric(Operator):
    """
    Represents an inner product or generalized metric between two expressions.
    """
    def __init__(self, left: Expression, right: Expression):
        self.left = left
        self.right = right

    def __str__(self) -> str:
        return f"⟨{self.left}, {self.right}⟩"

    def __repr__(self) -> str:
        return f"Metric({self.left!r}, {self.right!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Metric):
            return False
        return self.left == other.left and self.right == other.right

    def simplify(self) -> Expression:
        return self
