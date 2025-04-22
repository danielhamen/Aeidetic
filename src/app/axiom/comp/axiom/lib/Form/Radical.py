from typing import Optional
from axiom.lib.Form.Form import Form
from axiom.lib.Expression import Expression
from axiom.lib.Symbol.Const import Const

class Radical(Form):
    """
    Represents a radical expression.
    If the index is 2, it is a square root.
    """
    def __init__(self, radicand: Expression, *, index: Optional[Expression] = None):
        self.radicand = radicand
        self.index = index if index is not None else Const(2)

    def __str__(self) -> str:
        if isinstance(self.index, Const) and self.index.value == 2:
            return f"√({self.radicand})"
        return f"root[{self.index}]({self.radicand})"

    def __repr__(self) -> str:
        return f"Radical({self.radicand!r}, index={self.index!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Radical):
            return False
        return self.radicand == other.radicand and self.index == other.index

    def simplify(self) -> Expression:
        return Radical(self.radicand.simplify(), index=self.index.simplify())

    def evaluate(self, env: dict = {}) -> Expression:
        radicand = self.radicand.evaluate(env)
        index = self.index.evaluate(env)

        if isinstance(radicand, Const) and isinstance(index, Const):
            radicand = float(radicand.value)
            index = float(index.value)
            return Const((radicand) ** (1/index))

        raise ValueError("Radical is only defined for integer constants")
