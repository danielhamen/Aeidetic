from axiom.lib.Form.Form import Form
from axiom.lib.Expression import Expression

class Call(Form):
    """
    Represents a function call: f(x), g(2x+1), etc.
    """
    def __init__(self, func: Expression, *args: Expression):
        self.func = func
        self.args = args

    def __str__(self) -> str:
        args_str = ", ".join(str(arg) for arg in self.args)
        return f"{self.func}({args_str})"

    def __repr__(self) -> str:
        args_repr = ", ".join(repr(arg) for arg in self.args)
        return f"Call({self.func!r}, {args_repr})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Call):
            return False
        return self.func == other.func and self.args == other.args

    def simplify(self) -> Expression:
        return self
