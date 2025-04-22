from axiom.lib.Domain.Domain import Domain
from axiom.lib.Expression import Expression

class FunctionSpace(Domain):
    """
    Represents a function space: functions from domain A to codomain B.
    """
    def __init__(self, domain: Domain, codomain: Domain):
        self.domain = domain
        self.codomain = codomain

    def __str__(self) -> str:
        return f"F: {self.domain} → {self.codomain}"

    def __repr__(self) -> str:
        return f"FunctionSpace({self.domain!r}, {self.codomain!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, FunctionSpace):
            return False
        return self.domain == other.domain and self.codomain == other.codomain

    def simplify(self) -> Expression:
        return self
