from typing import Union
from axiom.lib.Symbol.Const import (Const,Expression)

AbstractExpression = Union[Expression, int, float]
def coerce_expr(o: AbstractExpression) -> Expression:
    if isinstance(o, Expression):
        return o
    elif isinstance(o, (int, float)):
        return Const(o)
    else:
        raise TypeError(f"Cannot deabstractify {type(o)}")
