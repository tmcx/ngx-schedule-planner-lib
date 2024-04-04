export function arrayOf(length: number, plus: number = 0) {
  return Array.from(Array(length + 1).keys()).map((num) => num + plus);
}

export function clone<T>(variable: T): T {
  return JSON.parse(JSON.stringify(variable)) as T;
}
