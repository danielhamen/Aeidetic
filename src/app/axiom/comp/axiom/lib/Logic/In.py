from axiom.lib.Expression import Expression
from axiom.lib.Logic.Logic import Logic

class In(Logic):
    """
    Represents a membership test: x ∈ A.
    """
    def __init__(self, element: Expression, set_expr: Expression):
        self.element = element
        self.set_expr = set_expr

    def __str__(self) -> str:
        return f"({self.element} ∈ {self.set_expr})"

    def __repr__(self) -> str:
        return f"In({self.element!r}, {self.set_expr!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, In):
            return False
        return self.element == other.element and self.set_expr == other.set_expr

    def simplify(self) -> Expression:
        return self
