from abc import (ABC, abstractmethod)
from typing import Union

class Expression(ABC):
    """
    Abstract base class for all mathematical expressions.
    """
    @abstractmethod
    def __str__(self) -> str:
        """Return a human-readable string representation."""
        pass

    @abstractmethod
    def __repr__(self) -> str:
        """Return a detailed string representation."""
        pass

    def __eq__(self, other: object) -> bool:
        """Checks if the expression is equal to another expression."""
        return False

    def substitute(self, mapping: dict = {}) -> 'Expression':
        """
        Returns a new expression with variables substituted according to `mapping`.
        Use this as opposed to `evaluate` when you want to keep the expression symbolic or just substitute one or two variables.
        """
        return self

    def simplify(self) -> 'Expression':
        """
        Return a simplified version of the expression.
        This includes symbolic reduction such as reducing fractions, combining like terms,
        or simplifying algebraic identities (e.g., sin(0) → 0, x + 0 → x).
        """
        return self

    def evaluate(self, env: dict = {}) -> 'Expression':
        """
        Evaluate the expression numerically using variable bindings from `env`.
        If all variables are resolved to constants, return a Const with the result.
        If not all values can be resolved, return a partially evaluated expression.
        """
        return self

    def approximate(self, env: dict = {}, precision: int = 8) -> 'Expression':
        """
        Return a decimal approximation of the evaluated expression as a Const.
        This uses float precision and optionally rounds to `precision` digits.
        Useful for evaluating irrational results like pi or sqrt(2) to decimals.
        """
        return self

    def expand(self) -> 'Expression':
        """
        Expand a compound expression into an explicit form.
        For example, a Summation can be expanded into an addition chain.
        Non-expandable expressions should return themselves.
        """
        return self

    def simplify_deep(self) -> 'Expression':
        """
        Simplify internal components of the expression without modifying its overall form.
        For example, Abs(Fraction(4, 2)) → Abs(2), but still returns an Abs wrapper.
        Useful for recursive simplification of nested structures.
        """
        return self

    def alternatives(self) -> list['Expression']:
        """
        Return a list of expressions that are algebraically or structurally equivalent
        to the current expression. For example, Tan(x) → [Sin(x)/Cos(x)].
        Useful for symbolic comparison, pattern matching, or generating simplification paths.
        """
        return []

    @property
    def is_numerical(self) -> bool:
        """
        Returns True if this expression can be fully evaluated numerically
        without any variables (i.e., evaluate() returns a number).
        """
        try:
            result = self.evaluate()
            return isinstance(result, (int, float))
        except Exception:
            return False
