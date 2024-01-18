export const getRandomBoolWithRandomChance = (): boolean => {
    const [threshold, randomValue] = [Math.random(), Math.random()];
    return randomValue < threshold;
};
