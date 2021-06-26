export type Serialize<T> = T extends Record<string, unknown>
  ? { [K in keyof T]: Serialize<T[K]> }
  : T extends unknown[]
  ? Serialize<T[number]>[]
  : T extends Date
  ? string
  : T;
