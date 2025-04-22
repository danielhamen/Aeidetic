# Expression base
from axiom.lib.Expression import Expression

# Domain
from axiom.lib.Domain.Domain import Domain
from axiom.lib.Domain.Real import Real
from axiom.lib.Domain.ComplexDomain import ComplexDomain
from axiom.lib.Domain.VectorSpace import VectorSpace
from axiom.lib.Domain.MatrixSpace import MatrixSpace
from axiom.lib.Domain.FunctionSpace import FunctionSpace

# Evaluation
from axiom.lib.Evaluation.Evaluation import Evaluation
from axiom.lib.Evaluation.Summation import Summation
from axiom.lib.Evaluation.Product import Product
from axiom.lib.Evaluation.Integral import Integral
from axiom.lib.Evaluation.Derivative import Derivative
from axiom.lib.Evaluation.Partial import Partial
from axiom.lib.Evaluation.Differential import Differential
from axiom.lib.Evaluation.Limit import Limit

# Form
from axiom.lib.Form.Form import Form
from axiom.lib.Form.Fraction import Fraction
from axiom.lib.Form.Radical import Radical
from axiom.lib.Form.Power import Power
from axiom.lib.Form.Logarithm import Logarithm
from axiom.lib.Form.Delimited import Delimited
from axiom.lib.Form.Call import Call
from axiom.lib.Form.Piecewise import Piecewise
from axiom.lib.Form.Index import Index
from axiom.lib.Form.Recurrence import Recurrence
from axiom.lib.Form.Factorial import Factorial

# Logic
from axiom.lib.Logic.Logic import Logic
from axiom.lib.Logic.Equal import Equal
from axiom.lib.Logic.NotEqual import NotEqual
from axiom.lib.Logic.Less import Less
from axiom.lib.Logic.Greater import Greater
from axiom.lib.Logic.And import And
from axiom.lib.Logic.Or import Or
from axiom.lib.Logic.Not import Not
from axiom.lib.Logic.In import In

# Operator
from axiom.lib.Operator.Operator import Operator
from axiom.lib.Operator.Addition import Addition
from axiom.lib.Operator.Subtraction import Subtraction
from axiom.lib.Operator.Multiplication import Multiplication
from axiom.lib.Operator.Division import Division
from axiom.lib.Operator.Exponentiation import Exponentiation
from axiom.lib.Operator.Dot import Dot
from axiom.lib.Operator.Cross import Cross
from axiom.lib.Operator.Metric import Metric
from axiom.lib.Operator.Absolute import Absolute
from axiom.lib.Operator.Normal import Normal
from axiom.lib.Operator.Apply import Apply
from axiom.lib.Operator.Determinent import Determinent

# Set
from axiom.lib.Set.Set import Set
from axiom.lib.Set.Interval import Interval
from axiom.lib.Set.FiniteSet import FiniteSet
from axiom.lib.Set.SetOp import SetOp

# Transform
from axiom.lib.Transform.Transform import Transform
from axiom.lib.Transform.Expand import Expand
from axiom.lib.Transform.Factor import Factor
from axiom.lib.Transform.Differentiate import Differentiate
from axiom.lib.Transform.Trace import Trace
from axiom.lib.Transform.Transpose import Transpose
from axiom.lib.Transform.Inverse import Inverse
from axiom.lib.Transform.GCD import GCD
from axiom.lib.Transform.LCM import LCM
from axiom.lib.Transform.Re import Re
from axiom.lib.Transform.Im import Im

# Symbol
from axiom.lib.Symbol.Symbol import Symbol
from axiom.lib.Symbol.Var import Var
from axiom.lib.Symbol.Const import Const
from axiom.lib.Symbol.Complex import Complex
from axiom.lib.Symbol.Matrix import Matrix
from axiom.lib.Symbol.Vector import Vector
from axiom.lib.Symbol.Quantity import Quantity
from axiom.lib.Symbol.Sequence import Sequence
from axiom.lib.Symbol.Tensor import Tensor
from axiom.lib.Symbol.Function import Function
from axiom.lib.Symbol.Infinity import Infinity
from axiom.lib.Symbol.NaN import NaN

# Trigonometric
from axiom.lib.Symbol.Trigonometric.Trigonometric import Trigonometric
from axiom.lib.Symbol.Trigonometric.Sin import Sin
from axiom.lib.Symbol.Trigonometric.Cos import Cos
from axiom.lib.Symbol.Trigonometric.Tan import Tan
from axiom.lib.Symbol.Trigonometric.Sec import Sec
from axiom.lib.Symbol.Trigonometric.Csc import Csc
from axiom.lib.Symbol.Trigonometric.Cot import Cot
from axiom.lib.Symbol.Trigonometric.Sinh import Sinh
from axiom.lib.Symbol.Trigonometric.Cosh import Cosh
from axiom.lib.Symbol.Trigonometric.Tanh import Tanh
from axiom.lib.Symbol.Trigonometric.Arcsin import Arcsin
from axiom.lib.Symbol.Trigonometric.Arccos import Arccos
from axiom.lib.Symbol.Trigonometric.Arctan import Arctan
from axiom.lib.Symbol.Trigonometric.Arcsec import Arcsec
from axiom.lib.Symbol.Trigonometric.Arccsc import Arccsc
from axiom.lib.Symbol.Trigonometric.Arccot import Arccot
from axiom.lib.Symbol.Trigonometric.Arcsinh import Arcsinh
from axiom.lib.Symbol.Trigonometric.Arccosh import Arccosh
from axiom.lib.Symbol.Trigonometric.Arctanh import Arctanh

from axiom.lib.AbstractExpression import (AbstractExpression, coerce_expr)


# if __name__ == "__main__":
#     # Basic testing of some classes:
#     os.system("clear")

#     print(
#         LCM(Const(8), Const(16)).evaluate()
#     )

#     x = Var("x")
#     y = Const(4.5)
#     frac = Fraction(x, y)
#     rad = Radical(x)
#     pwr = Power(x, Const(2))
#     log_expr = Logarithm(x)
#     fact = Factorial(x)
#     gcd_expr = GCD(Const(12), Const(8))
#     lcm_expr = LCM(Const(12), Const(8))
#     # re_expr = Re(Complex(x, Const(2)))
#     # im_expr = Im(Complex(x, Const(2)))
#     # trans = Transpose(Matrix([[x, y], [Const(1), Const(0)]]))
#     tr_expr = Trace(Matrix([[Const(2), Const(5)], [Const(1), Const(0)]]))
#     # inv_expr = Inverse(Matrix([[x, y], [Const(1), Const(0)]]))
#     func = Sin(x)
#     # vec = Vector([x, Const(3), y])
#     # comp = Complex(x, Const(2))
#     mat = Matrix([[x, y], [Const(1), Const(0)]])
#     ctx = {
#         "x": Const(2),
#         "y": Const(5)
#     }

#     # print("Fraction:", frac)
#     # print("Radical:", rad)
#     # print("Power:", pwr)
#     # print("Logarithm:", log_expr)
#     # print("Factorial:", fact)
#     # print("GCD:", gcd_expr)
#     # print("LCM:", lcm_expr)
#     # print("Re:", re_expr)
#     # print("Im:", im_expr)
#     # print("Transpose:", trans)
#     print("Trace:", tr_expr)
#     tr_expr = tr_expr.simplify()
#     print("Trace Evaluated:", tr_expr)
#     # print("Inverse:", inv_expr)
#     # print("Function (sin):", func)
#     # # print("Vector:", vec)
#     # # print("Complex:", comp)
#     # print("Matrix:", mat)
