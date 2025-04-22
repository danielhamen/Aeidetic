import math
from axiom.lib.Symbol.Trigonometric.Trigonometric import Trigonometric
from axiom.lib.Symbol.Const import Const
from axiom.lib.Expression import Expression

class Cos(Trigonometric):
    argument: Expression
    def __init__(self, argument: Expression):
        super().__init__("cos", argument)

    def simplify(self) -> 'Cos':
        return Cos(self.argument.simplify())

    def evaluate(self, env: dict = {}) -> Expression:
        arg = self.argument.evaluate(env)
        if isinstance(arg, Const):
            value = float(arg.value)
            return Const(math.cos(value))
        raise ValueError(f"Cannot evaluate non-constant argument")
