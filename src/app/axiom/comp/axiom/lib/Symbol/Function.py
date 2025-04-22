import math
from axiom.lib.Expression import Expression
from axiom.lib.Symbol.Symbol import Symbol
from axiom.lib.Symbol.Const import Const

class Function(Symbol):
    """
    Represents a symbolic function.
    """
    def __init__(self, name: str, *args: Expression):
        self.name = name
        self.args = args

    def __str__(self) -> str:
        args_str = ", ".join(str(arg) for arg in self.args)
        return f"{self.name}({args_str})"

    def __repr__(self) -> str:
        args_repr = ", ".join(repr(arg) for arg in self.args)
        return f"Function({self.name!r}, {args_repr})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Function):
            return False
        return self.name == other.name and self.args == other.args

    def simplify(self) -> Expression:
        return self

# --- Additional Function subclasses (Named functions) ---
class Ln(Expression):
    argument: Expression
    def __init__(self, argument: Expression):
        self.argument = argument

    def __str__(self) -> str:
        return f"ln({self.argument})"

    def __repr__(self) -> str:
        return f"Ln({self.argument!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Ln):
            return False
        return self.argument == other.argument

    def simplify(self) -> 'Ln':
        return Ln(self.argument.simplify())

    def evaluate(self, env: dict = {}) -> Expression:
        arg = self.argument.evaluate(env)
        if isinstance(arg, Const):
            value = float(arg.value)
            if value <= 0:
                raise ValueError(f"Cannot evaluate natural logarithm of a non-zero or non-positive number")

            return Const(math.log(value))

        raise ValueError(f"Cannot evaluate non-constant argument")
