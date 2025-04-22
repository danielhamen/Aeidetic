from axiom.lib.Expression import Expression
from axiom.lib.Logic.Logic import Logic

class Or(Logic):
    """
    Represents a logical OR: a ∨ b.
    """
    def __init__(self, *conditions: Expression):
        self.conditions = conditions

    def __str__(self) -> str:
        return " ∨ ".join(str(cond) for cond in self.conditions)

    def __repr__(self) -> str:
        return f"Or({', '.join(repr(cond) for cond in self.conditions)})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Or):
            return False
        return self.conditions == other.conditions

    def simplify(self) -> Expression:
        return self
