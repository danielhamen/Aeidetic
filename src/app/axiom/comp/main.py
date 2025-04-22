from axiom.Axiom import *

x = Var("x")
y = Var("y")
z = Var("z")
i = Var("i")
m = Matrix([
    [x, 1, x],
    [3, 4, 5],
    [3, 4, 5]])

s = Summation(i, 0, 2, Index(m, indices=[Addition(i, 0),i]))
s = s.expand()

ineq = Equal(x, Const(3))

print(s)
# print(s.evaluate({ "x": }))
