from axiom.lib.Expression import Expression
from axiom.lib.Form.Form import Form

class Piecewise(Form):
    """
    Represents a piecewise expression, e.g., if/else expressions.
    """
    def __init__(self, conditions: list[tuple[Expression, Expression]]):
        # Each tuple is (condition, expression)
        self.conditions = conditions

    def __str__(self) -> str:
        conds = " ; ".join(f"if {cond} then {expr}" for cond, expr in self.conditions)
        return f"Piecewise({conds})"

    def __repr__(self) -> str:
        return f"Piecewise({self.conditions!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Piecewise):
            return False
        return self.conditions == other.conditions

    def simplify(self) -> Expression:
        return self
