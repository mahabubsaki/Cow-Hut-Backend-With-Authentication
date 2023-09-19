// export const extractNestedObject = <T>(id: string, ...fields: string[]): Partial<T> => {
//     const updatedData = {};
//     fields.forEach(props => {
//         if (props && Object.keys(props).length) {
//             Object.keys(props).forEach(key => {
//                 const nameKey = `name.${key}` as keyof Partial<T>;
//                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                 (updatedData as any)[nameKey] = name[key as keyof typeof name];
//             });
//         }
//     });
//     return updatedData;
// };