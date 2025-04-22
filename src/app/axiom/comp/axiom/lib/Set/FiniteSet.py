from axiom.lib.Expression import Expression
from axiom.lib.Set.Set import Set

class FiniteSet(Set):
    """
    Represents a finite set, e.g., {1, 2, 3}.
    """
    def __init__(self, elements: list[Expression]):
        self.elements = elements

    def __str__(self) -> str:
        elems = ", ".join(str(elem) for elem in self.elements)
        return f"{{{elems}}}"

    def __repr__(self) -> str:
        return f"FiniteSet({self.elements!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, FiniteSet):
            return False
        return self.elements == other.elements

    def simplify(self) -> Expression:
        return self
