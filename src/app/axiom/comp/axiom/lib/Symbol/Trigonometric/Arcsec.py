import math
from axiom.lib.Symbol.Trigonometric.Trigonometric import Trigonometric
from axiom.lib.Symbol.Const import Const
from axiom.lib.Expression import Expression

class Arcsec(Trigonometric):
    def __init__(self, argument: Expression):
        super().__init__("arcsec", argument)

    def simplify(self):
        return Arcsec(self.argument.simplify())

    def evaluate(self, env: dict = {}) -> Expression:
        arg = self.argument.evaluate(env)
        if isinstance(arg, Const):
            return Const(math.acos(1 / arg.value))
        raise ValueError("Cannot evaluate non-constant argument")
