from axiom.lib.Operator.Addition import Addition
from axiom.lib.Evaluation.Evaluation import Evaluation
from axiom.lib.Symbol.Var import Var
from axiom.lib.Expression import Expression
from axiom.lib.AbstractExpression import (AbstractExpression, coerce_expr)
from axiom.lib.Symbol.Const import Const

class Summation(Evaluation):
    """
    Represents a summation: ∑ f(i).
    """
    index: Var
    lower: Expression
    upper: Expression
    expr: Expression

    def __init__(self, index: Var, lower: AbstractExpression, upper: AbstractExpression, expr: Expression):
        self.index = index
        self.lower = coerce_expr(lower)
        self.upper = coerce_expr(upper)
        self.expr = expr

    def __str__(self) -> str:
        return f"Σ_{{{self.index}={self.lower}}}^{self.upper}({self.expr})"

    def __repr__(self) -> str:
        return f"Summation({self.index!r}, {self.lower!r}, {self.upper!r}, {self.expr!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Summation):
            return False
        return (self.index == other.index and self.lower == other.lower and
                self.upper == other.upper and self.expr == other.expr)

    def simplify(self) -> Expression:
        return self

    def expand(self) -> Expression:
        if isinstance(self.lower, Const) and isinstance(self.upper, Const):
            if self.lower.is_finite and self.upper.is_finite:
                i = self.lower
                j = self.upper

                # Ensure upper and lower bounds are integers
                if not (i.is_integer and j.is_integer):
                    raise ValueError("Summation bounds must be integers")

                i = int(i.value)
                j = int(j.value) + 1

                return Addition.nadd(
                    *[self.expr.substitute({self.index.name: Const(k)}) for k in range(i, j)]
                )

        raise ValueError("Summation bounds must be finite constants to expand")
        return self

    def evaluate(self, env: dict = {}) -> Expression:
        return self.expand().evaluate(env)
