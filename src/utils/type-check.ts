export const isFunction = (functionToCheck: (...args: any[]) => void): boolean => {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
};
