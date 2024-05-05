export class Validator {
  static between(fieldName: string, value: number, min: number, max: number) {
    if (!(value >= min && value <= max)) {
      throw new Error(
        `Invalid value on '${fieldName}'. '${value}' must be between '${min}' and '${max}'`
      );
    }
  }
  static lowerThan(fieldName: string, value: number, value2: number) {
    if (value >= value2) {
      throw new Error(
        `Invalid value on '${fieldName}'. '${value}' must be lower than '${value2}'`
      );
    }
  }
}
