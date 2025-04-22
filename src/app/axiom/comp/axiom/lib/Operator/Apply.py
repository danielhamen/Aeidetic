from axiom.lib.Expression import Expression
from axiom.lib.Operator.Operator import Operator

class Apply(Operator):
    """
    Represents applying the normal operator (delimiters like |x|).
    """
    def __init__(self, expr: Expression, mode: str):
        self.expr = expr
        self.mode = mode  # e.g., 'abs', 'norm', etc.

    def __str__(self) -> str:
        return f"{self.mode}({self.expr})"

    def __repr__(self) -> str:
        return f"Apply({self.expr!r}, mode={self.mode!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Apply):
            return False
        return self.expr == other.expr and self.mode == other.mode

    def simplify(self) -> Expression:
        return self
