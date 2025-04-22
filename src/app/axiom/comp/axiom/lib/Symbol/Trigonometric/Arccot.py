import math
from axiom.lib.Symbol.Trigonometric.Trigonometric import Trigonometric
from axiom.lib.Symbol.Const import Const
from axiom.lib.Expression import Expression

class Arccot(Trigonometric):
    def __init__(self, argument: Expression):
        super().__init__("arccot", argument)

    def simplify(self):
        return Arccot(self.argument.simplify())

    def evaluate(self, env: dict = {}) -> Expression:
        arg = self.argument.evaluate(env)
        if isinstance(arg, Const):
            return Const(math.atan(1 / arg.value))
        raise ValueError("Cannot evaluate non-constant argument")
