from axiom.lib.Evaluation.Summation import Summation
from axiom.lib.Transform.Transform import Transform
from axiom.lib.Expression import Expression
from axiom.lib.Symbol.Matrix import Matrix
from axiom.lib.Symbol.Const import Const
from axiom.lib.Form.Index import Index
from axiom.lib.Symbol.Var import Var

class Trace(Transform):
    """
    Represents the trace of a matrix.
    """
    matrix: Matrix
    def __init__(self, matrix: Expression):
        assert isinstance(matrix, Matrix), "Not a Matrix."
        assert matrix.is_square, "Matrix must be square."
        self.matrix = matrix

    def __str__(self) -> str:
        return f"Trace({self.matrix})"

    def __repr__(self) -> str:
        return f"Trace({self.matrix!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Trace):
            return False
        return self.matrix == other.matrix

    def simplify(self) -> Expression:
        m = self.matrix.simplify()
        assert isinstance(m, Matrix)
        assert m.is_square, "Matrix must be square."
        assert not m.is_empty, "Matrix must not be empty."

        i = Var("i")
        expr = Index(m, index=i)
        s = Summation(i, Const(0), Const(1), expr)
        return s

    def evaluate(self, env: dict = {}) -> Expression:
        m = self.matrix.evaluate(env)
        assert isinstance(m, Matrix)
        assert m.is_square, "Matrix must be square."
        tr = 0
        for i in range(m.rows):
            cell = m[i, i]
            assert isinstance(cell, Const), "Cell must be a constant."
            tr += cell.value

        return Const(tr)
