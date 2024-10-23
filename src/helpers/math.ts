export const getIntArray = (min: number, max: number) => {
  const arr = [];
  for (let i = min; i <= max; i++) {
    arr.push(i);
  }
  return arr;
};

export const shuffleArray = (arr: any[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const getRandomInArrayInRange = (
  min: number,
  max: number,
  count: number,
) => {
  const arr = getIntArray(min, max);
  const shuffled = shuffleArray(arr);
  return shuffled.slice(0, count);
};
