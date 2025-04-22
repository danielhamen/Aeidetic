from axiom.lib.Expression import Expression
from axiom.lib.Operator.Operator import Operator

class Division(Operator):
    """
    Represents division: a ÷ b.
    """
    def __init__(self, numerator: Expression, denominator: Expression):
        self.numerator = numerator
        self.denominator = denominator

    def __str__(self) -> str:
        return f"({self.numerator} / {self.denominator})"

    def __repr__(self) -> str:
        return f"Division({self.numerator!r}, {self.denominator!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Division):
            return False
        return self.numerator == other.numerator and self.denominator == other.denominator

    def simplify(self) -> Expression:
        return self
