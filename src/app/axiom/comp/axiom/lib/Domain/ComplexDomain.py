from axiom.lib.Domain.Domain import Domain
from axiom.lib.Expression import Expression

class ComplexDomain(Domain):
    """
    Represents the set of complex numbers ℂ.
    """
    def __str__(self) -> str:
        return "ℂ"

    def __repr__(self) -> str:
        return "ComplexDomain()"

    def __eq__(self, other: object) -> bool:
        return isinstance(other, ComplexDomain)

    def simplify(self) -> Expression:
        return self
