export const getRandomDuration = (): number => {
  const min = Math.ceil(60 / 5) * 5;
  const max = Math.floor(240 / 5) * 5;
  return Math.floor((Math.random() * (max - min + 1)) / 5) * 5 + min;
};

export const getRandomRating = (
  min: number = 1,
  max: number = 5,
  precision: number = 1,
): number => {
  const randomValue = Math.random() * (max - min) + min;
  const multiplier = Math.pow(10, precision);
  return Math.round(randomValue * multiplier) / multiplier;
};

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}ч ${mins}м`;
};

export const getRandomYear = (): number => {
  return Math.floor(Math.random() * (2025 - 1900 + 1)) + 1900;
};
