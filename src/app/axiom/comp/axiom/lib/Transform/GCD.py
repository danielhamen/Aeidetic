import math
from axiom.lib.Transform.Transform import Transform
from axiom.lib.Expression import Expression
from axiom.lib.Symbol.Const import Const

class GCD(Transform):
    """
    Represents the greatest common divisor of two expressions.
    """
    def __init__(self, x: Expression, y: Expression):
        self.x = x
        self.y = y

    def __str__(self) -> str:
        return f"GCD({self.x}, {self.y})"

    def __repr__(self) -> str:
        return f"GCD({self.x!r}, {self.y!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, GCD):
            return False
        return self.x == other.x and self.y == other.y

    def simplify(self) -> Expression:
        return GCD(self.x.simplify(), self.y.simplify())

    def evaluate(self, env: dict = {}) -> 'Expression':
        x = self.x.evaluate(env)
        y = self.y.evaluate(env)

        if isinstance(x, Const) and isinstance(y, Const):
            x = int(x.value)
            y = int(y.value)
            return Const(math.gcd(x, y))
        else:
            raise ValueError("GCM is only defined for integer constants")
