export const getIntArray = (min: number, max: number) => {
    const arr = [];
    for (let i = min; i <= max; i++) {
        arr.push(i);
    }
    return arr;
}

export const getRandomInArrayInRange = (min: number, max: number, count: number) => {
    // return Array(max)
    //     .fill(0)
    //     .map((_, idx) => idx + min + 1)
    //     .sort(() => Math.random() - 0.5)
    //     .slice(0, count);

    const arr = getIntArray(min, max);

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr.slice(0, count);
}