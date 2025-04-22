import json

data = []
with open("index.json", "r") as file:
    data = json.load(file)

examples = [
"""with Ada.Text_IO; use Ada.Text_IO;

procedure Hello_World is
begin
   Put_Line("Hello, world!");
end Hello_World;
""",
"""with Ada.Integer_Text_IO; use Ada.Integer_Text_IO;

procedure Add_Numbers is
   X, Y, Result : Integer;
begin
   Get(Item => X);
   Get(Item => Y);
   Result := X + Y;
   Put(Item => Result);
end Add_Numbers;
""","""procedure If_Example is
   X : Integer := 5;
begin
   if X > 10 then
      Put_Line("Greater than 10");
   else
      Put_Line("Less than or equal to 10");
   end if;
end If_Example;
""",
"""with Ada.Text_IO; use Ada.Text_IO;

procedure Loop_Example is
begin
   for I in 1 .. 5 loop
      Put_Line("Iteration: " & Integer'Image(I));
   end loop;
end Loop_Example;
""",
"""procedure Array_Example is
   type Int_Array is array(1 .. 5) of Integer;
   A : Int_Array := (1, 2, 3, 4, 5);
begin
   for I in A'range loop
      Put_Line("Element: " & Integer'Image(A(I)));
   end loop;
end Array_Example;
""",
"""procedure Multiply_Numbers(X, Y : Integer) is
   Result : Integer;
begin
   Result := X * Y;
   Put_Line("Result: " & Integer'Image(Result));
end Multiply_Numbers;
""",
"""function Factorial(N : Integer) return Integer is
begin
   if N = 0 then
      return 1;
   else
      return N * Factorial(N - 1);
   end if;
end Factorial;

procedure Factorial_Example is
   Result : Integer;
begin
   Result := Factorial(5);
   Put_Line("Factorial: " & Integer'Image(Result));
end Factorial_Example;
""",
"""with Ada.Text_IO; use Ada.Text_IO;

procedure Concatenate_Strings is
   Str1 : String(1 .. 5) := "Hello";
   Str2 : String(1 .. 5) := "World";
begin
   Put_Line(Str1 & " " & Str2);
end Concatenate_Strings;
""",
"""procedure Case_Example is
   X : Integer := 3;
begin
   case X is
      when 1 => Put_Line("One");
      when 2 => Put_Line("Two");
      when 3 => Put_Line("Three");
      when others => Put_Line("Other");
   end case;
end Case_Example;
""",
"""with Ada.Text_IO; use Ada.Text_IO;

procedure Read_File is
   File : File_Type;
   Line : String(1 .. 100);
   Last : Integer;
begin
   Open(File => File, Mode => In_File, Name => "input.txt");
   while not End_Of_File(File) loop
      Get_Line(File, Line, Last);
      Put_Line(Line(1 .. Last));
   end loop;
   Close(File);
end Read_File;
"""
]
examples = [x.strip() for x in examples]

for i,entry in enumerate(data):
    if entry["name"] == "Ada":
        data[i]["examples"] = examples

with open("index.json", "w") as f:
    json.dump(data, f)
