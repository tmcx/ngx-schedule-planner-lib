export const arrayOf = (length: number, plus: number = 0) =>
  Array.from(Array(length + 1).keys()).map((num) => num + plus);
