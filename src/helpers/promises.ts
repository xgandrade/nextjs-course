export const sleep = async (ms?: number) =>
  new Promise((resolve) => setTimeout(resolve, ms || Math.random() * 10000));
