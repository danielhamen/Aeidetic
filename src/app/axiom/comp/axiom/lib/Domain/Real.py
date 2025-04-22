from axiom.lib.Domain.Domain import Domain
from axiom.lib.Expression import Expression

class Real(Domain):
    """
    Represents the set of real numbers ℝ.
    """
    def __str__(self) -> str:
        return "ℝ"

    def __repr__(self) -> str:
        return "Real()"

    def __eq__(self, other: object) -> bool:
        return isinstance(other, Real)

    def simplify(self) -> Expression:
        return self
