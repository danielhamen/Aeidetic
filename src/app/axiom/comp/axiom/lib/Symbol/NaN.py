from axiom.lib.Symbol import Symbol
from axiom.lib.Expression import Expression
from axiom.lib.Symbol.Const import Const

class NaN(Const):
    """
    Represents an non-numerical numerical value such as 1/0.
    """
    def __init__(self):
        super().__init__(float('nan'))

    def __str__(self) -> str:
        return "∞"

    def __repr__(self) -> str:
        return "NaN()"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, NaN):
            return False
        return True

    def simplify(self) -> Expression:
        return self

    def evaluate(self, env: dict = {}) -> 'Expression':
        return Const(float('nan'))
