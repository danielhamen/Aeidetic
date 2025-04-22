import math
from axiom.lib.Symbol.Symbol import Symbol
from axiom.lib.Expression import Expression

# =============================================================================
# Implemented Classes: Symbol
# =============================================================================

class Const(Symbol):
    """
    Represents a constant numeric value.
    """
    value: float
    def __init__(self, value: float):
        self.value = float(value)

    def __str__(self) -> str:
        return str(self.value)

    def __repr__(self) -> str:
        return f"Const({self.value})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Const):
            return False
        return self.value == other.value

    def simplify(self) -> Expression:
        return self

    def evaluate(self, env: dict = {}) -> 'Expression':
        return Const(self.value)

    @property
    def is_finite(self) -> bool:
        return not (self.is_infinity or self.is_nan)

    @property
    def is_nan(self) -> bool:
        return math.isnan(self.value)

    @property
    def is_infinity(self) -> bool:
        return math.isinf(self.value)

    @property
    def is_integer(self) -> bool:
        return float(self.value).is_integer()

    def __float__(self) -> float:
        return self.value
