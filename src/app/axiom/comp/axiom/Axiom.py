import math
from abc import (ABC,abstractmethod)
import re
from typing import (Iterable, List, Optional, Generic, TypeVar)
from enum import Enum

class Expression(ABC):
    @abstractmethod
    def __latex__(self) -> str: ...

    def __str__(self) -> str: ...

    def __repr__(self) -> str: ...

class MatrixDelimiter(Enum):
    plain = r"\plain"
    leftCeil = r"\lceil"
    rightCeil = r"\rceil"
    leftFloor = r"\lfloor"
    rightFloor = r"\rfloor"
    leftAngle = r"\langle"
    rightAngle = r"\rangle"
    leftBrace = r"{"
    rightBrace = r"}"
    leftParentheses = r"("
    rightParentheses = r")"
    leftBracket = r"["
    rightBracket = r"]"
    leftPipe = r"\lvert"
    rightPipe = r"\rvert"
    leftDoublepipe = r"\lVert"
    rightDoublepipe = r"\rVert"

T = TypeVar('T')

class Pair(Generic[T]):
    def __init__(self, first: T, second: T) -> None:
        self.first = first
        self.second = second

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Pair):
            return False
        return self.first == other.first and self.second == other.second

    def __str__(self) -> str:
        return f"({self.first}, {self.second})"

    def __repr__(self) -> str:
        return f"Pair(first={self.first}, second={self.second})"

class Symbol(Expression):
    def __init__(self, *, real: Optional[float] = None, integer: Optional[int] = None, complex: Optional[int] = None) -> None:
        pass

    def __latex__(self) -> str:
        return f"\\text{{{self.__class__.__name__}}}"

class Infinity(Expression):
    def __latex__(self) -> str:
        return r"\infty"

class Matrix(Expression):
    _data: list[list[int]]
    delimiters: Pair[MatrixDelimiter]

    def __init__(self, data: Optional[list[list[int]]] = None, *, delimiters: Optional[Pair[MatrixDelimiter]] = None):
        self._data = data or [[]]
        self.delimiters = delimiters or Pair(MatrixDelimiter.leftBracket, MatrixDelimiter.rightBracket)

    @property
    def data(self) -> list[list[int]]:
        return self._data

    def __getitem__(self, i):
        # Handle single i (e.g., m[0] returns the row)
        if isinstance(i, int):
            return self._data[i]
        # Handle slice (e.g., m[0:2])
        elif isinstance(i, slice):
            return Matrix(self._data[i])
        # Handle tuple (e.g., m[0, 1])
        elif isinstance(i, tuple):
            row, col = i
            return self._data[row][col]
        else:
            raise TypeError("Invalid index type")

    def __setitem__(self, j, v):
        # Handle single j (e.g., m[0] = [1, 2])
        if isinstance(j, int):
            self._data[j] = v
        # Handle tuple (e.g., m[0, 1] = 5)
        elif isinstance(j, tuple):
            row, col = j
            self._data[row][col] = v
        else:
            raise TypeError("Invalid j type")

    def __str__(self):
        return '\n'.join([' '.join(map(str, row)) for row in self._data])

    def __latex__(self) -> str:
        # default delimiter values
        l_del = self.delimiters.first
        r_del = self.delimiters.second

        # inner contents of matrix 'matrix contents'
        mc = "\\\\ ".join([" & ".join([f"{{{y.__str__()}}}" for y in x]) for x in self._data])

        return fr"""
\left {l_del.value}
\begin{{matrix}}
    {mc}
\end{{matrix}}
\right {r_del.value}
"""

    def __repr__(self) -> str:
        return f"Matrix(data={self._data}, delimiters={self.delimiters})"

class Vector(Expression):
    _data: list[int]
    delimiters: Pair[MatrixDelimiter]

    def __init__(self, data: Optional[list[int]] = None):
        self._data = data or []

    @property
    def data(self) -> list[int]:
        return self._data

    def __getitem__(self, i):
        # Handle single i (e.g., m[0] returns the row)
        if isinstance(i, int):
            return self._data[i]
        else:
            raise TypeError("Invalid index type")

    def __setitem__(self, j, v):
        if isinstance(j, int):
            self._data[j] = v
        else:
            raise TypeError("Invalid j type")

class Norm(Expression):
    def __init__(self, body: Expression):
        self._body = body

    def __eval__(self) -> Expression:
        if isinstance(self._body, Matrix):
            pass
        elif isinstance(self._body, Vector):
            v: Vector = self._body
            return Radical(sum([x**2 for x in v.data]))
        else:
            raise TypeError("Unknown type to perform norm.")

    def __latex__(self) -> str:
        return f"\\left|{{{self._body.__latex__()}}}\\right|"

class Det(Expression):
    pass

class Abs(Expression):
    def __init__(self, body: Expression):
        self._body = body

    def __eval__(self) -> Expression:
        if isinstance(self._body, Matrix):
            pass
        elif isinstance(self._body, int):
            return abs(self._body)
        else:
            raise TypeError("Unknown type to perform abs.")

    def __latex__(self) -> str:
        return f"\\left|{{{self._body.__latex__()}}}\\right|"

class Radical(Symbol):
    index: Symbol
    radicand: Symbol

    def __init__(self, radicand: Symbol, *, index: Symbol = Symbol(integer=2)):
        self.index = index
        self.radicand = radicand

    def __latex__(self) -> str:
        return f"\\sqrt[{self.index.__latex__()}]{{{self.radicand.__latex__()}}}"

class Fraction(Symbol):
    numerator: Symbol
    denominator: Symbol

    def __init__(self, numerator: Symbol, denominator: Symbol):
        self.numerator = numerator
        self.denominator = denominator

    def __latex__(self) -> str:
        return f"\\frac{{{self.numerator.__latex__()}}}{{{self.denominator.__latex__()}}}"

class Power(Symbol):
    base: Symbol
    exponent: Symbol

    def __init__(self, base: Symbol, exponent: Symbol):
        self.base = base
        self.exponent = exponent

    def __latex__(self) -> str:
        return f"{{{self.base.__latex__()}}}^{{{self.exponent.__latex__()}}}"

class Summation(Symbol):
    index: Symbol
    lower_bound: Symbol
    upper_bound: Symbol
    body: Symbol

    def __init__(self, index: Symbol, lower_bound: Symbol, upper_bound: Symbol, body: Symbol):
        self.index = index
        self.lower_bound = lower_bound
        self.upper_bound = upper_bound
        self.body = body

    def __latex__(self) -> str:
        return f"\\sum_{{{self.index.__latex__()}={self.lower_bound.__latex__()}}}^{{{self.upper_bound.__latex__()}}}{{{self.body.__latex__()}}}"
