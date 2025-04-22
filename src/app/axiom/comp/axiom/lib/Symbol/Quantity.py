from axiom.lib.Expression import Expression
from axiom.lib.Symbol.Symbol import Symbol

class Quantity(Symbol):
    """
    Represents a physical quantity (value with a unit).
    """
    def __init__(self, value: Expression, unit: str):
        self.value = value
        self.unit = unit

    def __str__(self) -> str:
        return f"{self.value} {self.unit}"

    def __repr__(self) -> str:
        return f"Quantity({self.value!r}, {self.unit!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Quantity):
            return False
        return self.value == other.value and self.unit == other.unit

    def simplify(self) -> Expression:
        return self
