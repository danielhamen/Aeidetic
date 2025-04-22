from axiom.lib.Domain.Domain import Domain
from axiom.lib.Expression import Expression

class MatrixSpace(Domain):
    """
    Represents a matrix space, e.g., ℝ^(m×n).
    """
    def __init__(self, m: int, n: int):
        self.m = m
        self.n = n

    def __str__(self) -> str:
        return f"ℝ^({self.m}×{self.n})"

    def __repr__(self) -> str:
        return f"MatrixSpace({self.m}, {self.n})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, MatrixSpace):
            return False
        return self.m == other.m and self.n == other.n

    def simplify(self) -> Expression:
        return self
