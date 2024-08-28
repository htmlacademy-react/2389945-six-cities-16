export const getRandomInteger = (
  firstValue: number,
  secondValue: number
) => {
  const lower = Math.ceil(Math.min(firstValue, secondValue));
  const upper = Math.floor(Math.max(firstValue, secondValue));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const getRandomArrayElement = <T>(elements: T[]): T =>
  elements[getRandomInteger(0, elements.length - 1)];
