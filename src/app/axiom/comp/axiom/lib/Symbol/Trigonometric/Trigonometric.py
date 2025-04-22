from axiom.lib.Expression import Expression
from axiom.lib.Symbol.Function import Function

class Trigonometric(Function):
    """
    Base class for trigonometric functions.
    """
    name: str
    argument: Expression
    def __init__(self, name: str, argument: Expression):
        self.name = name
        self.argument = argument

    def __str__(self) -> str:
        return f"{self.name}({self.argument})"

    def __repr__(self) -> str:
        return f"{self.name}({self.argument})"
