from axiom.lib.Expression import Expression
from axiom.lib.Set.Set import Set

class SetOp(Set):
    """
    Represents set operations: union, intersection, or complement.
    """
    def __init__(self, op: str, *sets: Expression):
        self.op = op  # e.g., 'union', 'intersection', 'complement'
        self.sets = sets

    def __str__(self) -> str:
        op_str = {"union": " ∪ ", "intersection": " ∩ ", "complement": " \\ "}.get(self.op, self.op)
        return op_str.join(str(s) for s in self.sets)

    def __repr__(self) -> str:
        return f"SetOp({self.op!r}, {', '.join(repr(s) for s in self.sets)})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, SetOp):
            return False
        return self.op == other.op and self.sets == other.sets

    def simplify(self) -> Expression:
        return self
