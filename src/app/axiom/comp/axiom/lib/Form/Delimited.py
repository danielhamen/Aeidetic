from axiom.lib.Form.Form import Form
from axiom.lib.Expression import Expression

class Delimited(Form):
    """
    Represents a delimited expression using the normal operator.
    (e.g., |x|, ||x||, det(x) – interpretation depends on context).
    """
    def __init__(self, expr: Expression, mode: str):
        self.expr = expr
        self.mode = mode  # e.g., 'abs', 'norm', 'det'

    def __str__(self) -> str:
        return f"{self.mode}({self.expr})"

    def __repr__(self) -> str:
        return f"Delimited({self.expr!r}, mode={self.mode!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Delimited):
            return False
        return self.expr == other.expr and self.mode == other.mode

    def simplify(self) -> Expression:
        return self
