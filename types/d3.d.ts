declare module "d3" {
  export type CurveFactory = unknown;

  export function max<T>(array: Iterable<T>, accessor: (datum: T) => number): number | undefined;
  export function sum<T>(array: Iterable<T>, accessor: (datum: T) => number): number;

  export function scaleBand(domain: string[], range: [number, number]): {
    (value: string): number | undefined;
    padding(value: number): ReturnType<typeof scaleBand>;
    bandwidth(): number;
  };

  export function scaleLinear(domain: [number, number], range: [number, number]): {
    (value: number): number;
    nice(): ReturnType<typeof scaleLinear>;
  };

  export function scaleOrdinal<Domain extends string, Range extends string>(): {
    domain(values: Domain[]): ReturnType<typeof scaleOrdinal<Domain, Range>>;
    range(values: Range[]): (value: Domain) => Range;
  };

  export const curveCatmullRom: {
    alpha(value: number): CurveFactory;
  };

  export function line<T>(): {
    x(accessor: (datum: T) => number): ReturnType<typeof line<T>>;
    y(accessor: (datum: T) => number): ReturnType<typeof line<T>>;
    curve(curve: CurveFactory): (data: T[]) => string | null;
  };
}
