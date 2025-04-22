from axiom.lib.Domain.Domain import Domain
from axiom.lib.Expression import Expression

class VectorSpace(Domain):
    """
    Represents a vector space, e.g., ℝⁿ.
    """
    def __init__(self, dimension: int):
        self.dimension = dimension

    def __str__(self) -> str:
        return f"ℝ^{self.dimension}"

    def __repr__(self) -> str:
        return f"VectorSpace({self.dimension})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, VectorSpace):
            return False
        return self.dimension == other.dimension

    def simplify(self) -> Expression:
        return self
