import math
from axiom.lib.Symbol.Trigonometric.Trigonometric import Trigonometric
from axiom.lib.Symbol.Const import Const
from axiom.lib.Expression import Expression

class Arctan(Trigonometric):
    def __init__(self, argument: Expression):
        super().__init__("arctan", argument)

    def simplify(self):
        return Arctan(self.argument.simplify())

    def evaluate(self, env: dict = {}) -> Expression:
        arg = self.argument.evaluate(env)
        if isinstance(arg, Const):
            return Const(math.atan(arg.value))
        raise ValueError("Cannot evaluate non-constant argument")
