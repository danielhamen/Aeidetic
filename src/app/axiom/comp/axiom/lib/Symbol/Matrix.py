from axiom.lib.Symbol.Symbol import Symbol
from axiom.lib.Expression import Expression
from axiom.lib.Symbol.Const import Const
from typing import Union

class Matrix(Symbol):
    """
    Represents a matrix as a list of lists of expressions.
    """
    data: list[list[Expression]]
    def __init__(self, data: list[list[Union[Expression, int, float]]]):
        self.data = [Const(float(j)) if isinstance(j, (int, float)) else j for j in [i for i in data]]

    @property
    def shape(self) -> tuple[int, int]:
        return len(self.data), len(self.data[0])

    @property
    def rows(self) -> int:
        return self.shape[0]

    @property
    def cols(self) -> int:
        return self.shape[1]

    @property
    def is_square(self) -> bool:
        return self.rows == self.cols

    @property
    def is_empty(self) -> bool:
        return self.rows == 0 or self.cols == 0

    def __getitem__(self, key: tuple[int, int]) -> Expression:
        row, col = key
        return self.data[row][col]

    def __setitem__(self, key: tuple[int, int], value: Expression) -> None:
        row, col = key
        self.data[row][col] = value

    def __str__(self) -> str:
        rows = ["[" + ", ".join(str(elem) for elem in row) + "]" for row in self.data]
        return "Matrix([" + ", ".join(rows) + "])"

    def __repr__(self) -> str:
        return f"Matrix({self.data!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Matrix):
            return False
        return self.data == other.data

    def simplify(self) -> Expression:
        return self

    def evaluate(self, env: dict = {}) -> Expression:
        self.data = [[j.evaluate(env) for j in i] for i in self.data]
        return Matrix(self.data)
