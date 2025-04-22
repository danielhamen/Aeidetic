from axiom.lib.Expression import Expression
from axiom.lib.Symbol.Const import Const
from axiom.lib.Symbol.Matrix import Matrix
from axiom.lib.Operator.Apply import Apply

class Determinent(Apply):
    def __init__(self, expr: Expression):
        super().__init__(expr, mode='det')

    def simplify(self) -> Expression:
        return Determinent(self.expr.simplify())

    def evaluate(self, env: dict = {}) -> 'Expression':
        expr = self.expr.evaluate(env)
        if isinstance(expr, Matrix):
            assert expr.rows == expr.cols, "Matrix must be square to take the determinant"

            raise NotImplementedError("Determinant calculation not implemented")

        raise ValueError("Cannot evaluate non-matrix determinent")
