from axiom.lib.Expression import Expression
from axiom.lib.Set.Set import Set

class Interval(Set):
    """
    Represents an interval (e.g., [a, b] or (a, b)).
    """
    def __init__(self, lower: Expression, upper: Expression, left_closed: bool = True, right_closed: bool = True):
        self.lower = lower
        self.upper = upper
        self.left_closed = left_closed
        self.right_closed = right_closed

    def __str__(self) -> str:
        left = "[" if self.left_closed else "("
        right = "]" if self.right_closed else ")"
        return f"{left}{self.lower}, {self.upper}{right}"

    def __repr__(self) -> str:
        return f"Interval({self.lower!r}, {self.upper!r}, left_closed={self.left_closed}, right_closed={self.right_closed})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Interval):
            return False
        return (self.lower == other.lower and self.upper == other.upper and
                self.left_closed == other.left_closed and self.right_closed == other.right_closed)

    def simplify(self) -> Expression:
        return self
