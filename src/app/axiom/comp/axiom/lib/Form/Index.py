from axiom.lib.Symbol.Matrix import Matrix
from axiom.lib.Symbol.Vector import Vector
from axiom.lib.Expression import Expression
from axiom.lib.Form.Form import Form
from axiom.lib.Symbol.Var import Var
from axiom.lib.Symbol.Const import Const
from typing import Union, Optional

class Index(Form):
    """
    Represents an index expression, e.g., A[i], xₙ, or Tensor[i][j].
    """
    base: Expression
    indices: list[Expression]
    def __init__(self, base: Expression, *, index: Optional[Expression] = None, indices: Optional[list[Expression]] = None):
        assert (index is None and indices) or (indices is None and index), "No index or indices found of index"

        self.base = base
        self.indices = [index] if index else indices or []

    def __str__(self) -> str:
        return f"{self.base}{''.join(['[' + str(x) + ']' for x in self.indices])}"

    def __repr__(self) -> str:
        return f"Index({self.base!r}, {self.indices!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Index):
            return False
        return self.base == other.base and self.indices == other.indices

    def simplify(self) -> Expression:
        base = self.base.simplify()
        i = [x.simplify() for x in self.indices]
        return Index(base, indices=i)

    def substitute(self, mapping: dict = {}) -> Expression:
        indices = [x.evaluate(mapping) for x in self.indices]
        assert all(isinstance(x, Const) for x in indices), "Indices must be constants"

        if isinstance(self.base, Matrix):
            assert len(indices) == 2, "Matrix index must have two indices"
            i,j = indices
            assert isinstance(i, Const) and isinstance(j, Const), "Indices must be constants"
            i = i.value
            j = j.value
            assert i.is_integer and j.is_integer, "Indices must be integers"
            i = int(i)
            j = int(j)
            assert 0 <= i < self.base.shape[0] and 0 <= j < self.base.shape[1], "Index out of bounds"

            return self.base[i,j]
        elif isinstance(self.base, Vector):
            assert len(indices) == 1, "Vector index must have one index"

        raise ValueError(f"Cannot index type: {self.base!r}")


    def evaluate(self, env: dict = {}) -> Expression:
        indices = [x.evaluate(env) for x in self.indices]
        assert all(isinstance(x, Const) for x in indices), "Indices must be constants"

        if isinstance(self.base, Matrix):
            assert len(indices) == 2, "Matrix index must have two indices"
            i,j = indices
            assert isinstance(i, Const) and isinstance(j, Const), "Indices must be constants"
            i = i.value
            j = j.value
            assert i.is_integer and j.is_integer, "Indices must be integers"
            i = int(i)
            j = int(j)
            assert 0 <= i < self.base.shape[0] and 0 <= j < self.base.shape[1], "Index out of bounds"

            return self.base[i,j].evaluate(env)
        elif isinstance(self.base, Vector):
            assert len(indices) == 1, "Vector index must have one index"

        raise ValueError(f"Cannot index type: {self.base!r}")
