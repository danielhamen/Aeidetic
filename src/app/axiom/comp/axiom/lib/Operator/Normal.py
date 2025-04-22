from axiom.lib.Expression import Expression
from axiom.lib.Operator.Operator import Operator
from axiom.lib.Operator.Apply import Apply
from axiom.lib.Symbol.Matrix import Matrix
from axiom.lib.Symbol.Vector import Vector

class Normal(Apply):
    def __init__(self, expr: Expression):
        super().__init__(expr, mode='norm')

    def simplify(self) -> Expression:
        return Normal(self.expr.simplify())

    def expand(self) -> Expression:
        expr = self.expr.expand()
        if isinstance(expr, Matrix):
            raise NotImplementedError("Norm calculation not implemented")
        elif isinstance(expr, Vector):
            raise NotImplementedError("Norm calculation not implemented")

        raise ValueError("Cannot evaluate non-matrix norm")

    def evaluate(self, env: dict = {}) -> Expression:
        return self.expand().evaluate(env)
