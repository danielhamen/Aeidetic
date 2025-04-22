from typing import Optional
from axiom.lib.Evaluation.Evaluation import Evaluation
from axiom.lib.Symbol.Var import Var
from axiom.lib.Expression import Expression
from axiom.lib.Symbol.Const import Const

class Integral(Evaluation):
    """
    Represents an integral: ∫ f(x) dx.
    """
    def __init__(self, variable: Var, integrand: Expression, lower: Optional[Expression] = None, upper: Optional[Expression] = None):
        self.variable = variable
        self.integrand = integrand
        self.lower = lower
        self.upper = upper

    def __str__(self) -> str:
        if self.lower is not None and self.upper is not None:
            return f"∫_{{{self.lower}}}^{{{self.upper}}} {self.integrand} d{self.variable}"
        return f"∫ {self.integrand} d{self.variable}"

    def __repr__(self) -> str:
        return (f"Integral({self.variable!r}, {self.integrand!r}, "
                f"lower={self.lower!r}, upper={self.upper!r})")

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Integral):
            return False
        return (self.variable == other.variable and self.integrand == other.integrand and
                self.lower == other.lower and self.upper == other.upper)

    def simplify(self) -> Expression:
        return self

    def evaluate(self, env: dict = {}) -> Expression:
        return Const(0)
