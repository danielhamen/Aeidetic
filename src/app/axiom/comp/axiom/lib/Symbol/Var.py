from axiom.lib.Symbol.Symbol import Symbol
from axiom.lib.Expression import Expression
from axiom.lib.Symbol.Const import Const

class Var(Symbol):
    """
    Represents a variable (e.g., x, y).
    """
    def __init__(self, name: str):
        self.name = name

    def __str__(self) -> str:
        return self.name

    def __repr__(self) -> str:
        return f"Var({self.name!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Var):
            return False
        return self.name == other.name

    def simplify(self) -> Expression:
        return self

    def evaluate(self, env: dict = {}) -> 'Expression':
        if self.name in env and isinstance(env[self.name], (float, int, Const)):
            val = float(env[self.name])
            return Const(val)
        raise ValueError(f"Variable {self.name} not found in environment")
