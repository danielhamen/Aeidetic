from axiom.lib.Expression import Expression
from axiom.lib.Operator.Operator import Operator

class Exponentiation(Operator):
    """
    Represents exponentiation: a ^ b.
    """
    def __init__(self, base: Expression, exponent: Expression):
        self.base = base
        self.exponent = exponent

    def __str__(self) -> str:
        return f"({self.base} ^ {self.exponent})"

    def __repr__(self) -> str:
        return f"Exponentiation({self.base!r}, {self.exponent!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Exponentiation):
            return False
        return self.base == other.base and self.exponent == other.exponent

    def simplify(self) -> Expression:
        return self
