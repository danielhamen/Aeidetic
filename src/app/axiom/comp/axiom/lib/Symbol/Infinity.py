from axiom.lib.Symbol import Symbol
from axiom.lib.Expression import Expression
from axiom.lib.Symbol.Const import Const

class Infinity(Const):
    """
    Represents infinity.
    """
    def __init__(self):
        super().__init__(float('inf'))

    def __str__(self) -> str:
        return "∞"

    def __repr__(self) -> str:
        return "Infinity()"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Infinity):
            return False
        return True

    def simplify(self) -> Expression:
        return self

    def evaluate(self, env: dict = {}) -> 'Expression':
        return Const(float('inf'))
