from axiom.lib.Expression import Expression
from axiom.lib.AbstractExpression import (AbstractExpression, coerce_expr)
from axiom.lib.Operator.Operator import Operator
from axiom.lib.Symbol.Const import Const
from typing import Union

class Addition(Operator):
    """
    Represents addition: a + b.
    """
    def __init__(self, left: AbstractExpression, right: AbstractExpression):
        self.left = coerce_expr(left)
        self.right = coerce_expr(right)

    def __str__(self) -> str:
        return f"({self.left} + {self.right})"

    def __repr__(self) -> str:
        return f"Addition({self.left!r}, {self.right!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Addition):
            return False
        return self.left == other.left and self.right == other.right

    def simplify(self) -> Expression:
        return Addition(self.left.simplify(), self.right.simplify())

    def evaluate(self, env: dict = {}) -> Expression:
        lhs = self.left.evaluate(env)
        rhs = self.right.evaluate(env)

        if isinstance(lhs, Const) and isinstance(rhs, Const):
            return Const(lhs.value + rhs.value)

        raise ValueError("Cannot evaluate non-constant expressions")

    @staticmethod
    def nadd(*args: Expression) -> Expression:
        """ Returns one `Addition` object from more than two expressions """
        def break_down(expr: list[Expression]) -> Addition:
            if len(expr) == 0:
                return Addition(Const(0), Const(0))

            if len(expr) == 1:
                return Addition(expr[0], Const(0))

            if len(expr) == 2:
                return Addition(expr[0], expr[1])

            mid = len(expr) // 2
            return Addition(break_down(expr[:mid]), break_down(expr[mid:]))

        return break_down(list(args))
