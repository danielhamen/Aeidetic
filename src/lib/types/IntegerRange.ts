export type IsPositive<N extends number> = `${N}` extends `-${number}`
  ? false
  : true;
export type IsSameSign<N1 extends number, N2 extends number> =
  IsPositive<N1> extends IsPositive<N2> ? true : false;
export type ToNumber<T> = T extends `${infer N extends number}` ? N : never;
export type NegateNumber<N extends number> = N extends 0
  ? 0
  : `${N}` extends `-${infer PN}`
    ? ToNumber<PN>
    : ToNumber<`-${N}`>;
export type Abs<N extends number> = `${N}` extends `-${infer PN extends number}`
  ? PN
  : N;

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type EnumerateSigned<N extends number> =
  IsPositive<N> extends true
    ? Enumerate<Abs<N>>
    : NegateNumber<Enumerate<Abs<N>>>;

export type IntegerRange<From extends number, To extends number> =
  IsSameSign<From, To> extends true
    ? Exclude<EnumerateSigned<To>, EnumerateSigned<From>>
    : From | EnumerateSigned<From> | EnumerateSigned<To>;
