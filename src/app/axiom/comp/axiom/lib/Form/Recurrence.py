from axiom.lib.Expression import Expression
from axiom.lib.Form.Form import Form

class Recurrence(Form):
    """
    Represents a recurrence relation: aₙ = aₙ₋₁ + 2.
    """
    def __init__(self, relation: Expression):
        self.relation = relation

    def __str__(self) -> str:
        return f"Recurrence({self.relation})"

    def __repr__(self) -> str:
        return f"Recurrence({self.relation!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Recurrence):
            return False
        return self.relation == other.relation

    def simplify(self) -> Expression:
        return self
