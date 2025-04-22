from axiom.lib.Expression import Expression
from axiom.lib.Symbol.Const import Const
from axiom.lib.Operator.Operator import Operator
from axiom.lib.Operator.Apply import Apply

class Absolute(Apply):
    def __init__(self, expr: Expression):
        super().__init__(expr, mode='abs')

    def simplify(self) -> Expression:
        return Absolute(self.expr.simplify())

    def evaluate(self, env: dict = {}) -> 'Expression':
        expr = self.expr.evaluate(env)
        if isinstance(expr, Const):
            return Const(abs(float(expr.value)))
        raise ValueError("Cannot evaluate non-constant absolute value")
