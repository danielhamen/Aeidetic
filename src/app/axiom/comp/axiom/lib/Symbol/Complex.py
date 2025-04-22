from axiom.lib.Symbol.Symbol import Symbol
from axiom.lib.Expression import Expression

class Complex(Symbol):
    """
    Represents a complex number: a + bi.
    """
    def __init__(self, real: Expression, imag: Expression):
        self.real = real
        self.imag = imag

    def __str__(self) -> str:
        return f"({self.real} + {self.imag}i)"

    def __repr__(self) -> str:
        return f"Complex({self.real!r}, {self.imag!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Complex):
            return False
        return self.real == other.real and self.imag == other.imag

    def simplify(self) -> Expression:
        return self
