from axiom.lib.Expression import Expression
from axiom.lib.AbstractExpression import (AbstractExpression, coerce_expr)
from axiom.lib.Symbol.Symbol import Symbol


class Vector(Symbol):
    """
    Represents a vector with components.
    """
    def __init__(self, components: list[AbstractExpression]):
        self.components = [coerce_expr(x) for x in components]

    def __str__(self) -> str:
        comps = ", ".join(str(comp) for comp in self.components)
        return f"Vector([{comps}])"

    def __repr__(self) -> str:
        comps = ", ".join(repr(comp) for comp in self.components)
        return f"Vector([{comps}])"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Vector):
            return False
        return self.components == other.components

    def __getitem__(self, index: int) -> Expression:
        return self.components[index]

    def __setitem__(self, index: int, value: Expression) -> None:
        self.components[index] = value

    @property
    def dim(self) -> int:
        return len(self.components)

    def simplify(self) -> Expression:
        return self
