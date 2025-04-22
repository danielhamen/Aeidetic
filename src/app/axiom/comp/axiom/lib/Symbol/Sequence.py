from axiom.lib.Expression import Expression
from axiom.lib.Symbol.Symbol import Symbol

class Sequence(Symbol):
    """
    Represents a sequence (e.g., aₙ = n^2).
    """
    def __init__(self, definition: Expression):
        self.definition = definition

    def __str__(self) -> str:
        return f"Sequence({self.definition})"

    def __repr__(self) -> str:
        return f"Sequence({self.definition!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Sequence):
            return False
        return self.definition == other.definition

    def simplify(self) -> Expression:
        return self
