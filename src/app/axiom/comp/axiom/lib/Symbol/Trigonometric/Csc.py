import math
from axiom.lib.Symbol.Trigonometric.Trigonometric import Trigonometric
from axiom.lib.Symbol.Const import Const
from axiom.lib.Expression import Expression

class Csc(Trigonometric):
    def __init__(self, argument: Expression):
        super().__init__("csc", argument)

    def simplify(self):
        return Csc(self.argument.simplify())

    def evaluate(self, env: dict = {}) -> Expression:
        arg = self.argument.evaluate(env)
        if isinstance(arg, Const):
            return Const(1 / math.sin(arg.value))
        raise ValueError("Cannot evaluate non-constant argument")
