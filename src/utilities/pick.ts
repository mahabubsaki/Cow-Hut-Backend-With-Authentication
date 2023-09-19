const pick = <T extends Record<string, unknown>, k extends keyof T>(obj: T, arr: k[]): Partial<T> => {
    const result: Partial<T> = {};
    arr.forEach(item => {
        // If my query objects have the desired property (which I will give in arr parameter array) thi i will take it in result
        if (obj && obj.hasOwnProperty(item)) {
            result[item] = obj[item];
        }
    });
    return result;
};
export default pick;