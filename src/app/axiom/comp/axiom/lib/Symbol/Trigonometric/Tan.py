import math
from axiom.lib.Symbol.Trigonometric.Trigonometric import Trigonometric
from axiom.lib.Symbol.Const import Const
from axiom.lib.Expression import Expression

class Tan(Trigonometric):
    argument: Expression
    def __init__(self, argument: Expression):
        super().__init__("tan", argument)

    def simplify(self) -> 'Tan':
        return Tan(self.argument.simplify())

    def evaluate(self, env: dict = {}) -> Expression:
        arg = self.argument.evaluate(env)
        if isinstance(arg, Const):
            value = float(arg.value)
            return Const(math.tan(value))
        raise ValueError(f"Cannot evaluate non-constant argument")
