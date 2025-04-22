from axiom.lib.Expression import Expression
from axiom.lib.Logic.Logic import Logic

class And(Logic):
    """
    Represents a logical AND: a ∧ b.
    """
    def __init__(self, *conditions: Expression):
        self.conditions = conditions

    def __str__(self) -> str:
        return " ∧ ".join(str(cond) for cond in self.conditions)

    def __repr__(self) -> str:
        return f"And({', '.join(repr(cond) for cond in self.conditions)})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, And):
            return False
        return self.conditions == other.conditions

    def simplify(self) -> Expression:
        return self
