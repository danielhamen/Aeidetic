from axiom.lib.Expression import Expression
from axiom.lib.Symbol.Symbol import Symbol

class Tensor(Symbol):
    """
    Represents a general n-dimensional object.
    """
    def __init__(self, components: list):
        self.components = components

    def __str__(self) -> str:
        return f"Tensor({self.components})"

    def __repr__(self) -> str:
        return f"Tensor({self.components!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Tensor):
            return False
        return self.components == other.components

    def simplify(self) -> Expression:
        return self
