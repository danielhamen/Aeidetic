import math
from typing import Optional
from axiom.lib.Expression import Expression
from axiom.lib.Form.Form import Form
from axiom.lib.Symbol.Const import Const

class Logarithm(Form):
    """
    Represents a logarithm: log_base(argument).
    Defaults to base 10 if not provided.
    """
    def __init__(self, argument: Expression, *, base: Optional[Expression] = None):
        self.argument = argument
        self.base = base if base is not None else Const(10)

    def __str__(self) -> str:
        return f"log_{self.base}({self.argument})"

    def __repr__(self) -> str:
        return f"Logarithm({self.argument!r}, base={self.base!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Logarithm):
            return False
        return self.argument == other.argument and self.base == other.base

    def simplify(self) -> Expression:
        return Logarithm(self.argument.simplify(), base=self.base.simplify())

    def evaluate(self, env: dict = {}) -> 'Expression':
        argument = self.argument.evaluate(env)
        base = self.base.evaluate(env)

        if isinstance(argument, Const) and isinstance(base, Const):
            argument = float(argument.value)
            base = float(base.value)

            return Const(math.log(argument, base))

        raise ValueError("Logarithm argument and base must be constants")
