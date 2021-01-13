export function memoize<T extends any[], V>(fn: (...args: T) => V) {
    const valueId = "_MEM0IZED_";
    const cache = new Map();

    return function (...args: T): V {
        let level = args.reduce((level, arg) => {
            if (!level.has(arg))
                level.set(arg, new Map());
            return level.get(arg);
        }, cache);

        if (level.has(valueId)) return level.get(valueId);

        const result = fn(...args);
        level.set(valueId, result);
        return result;
    }
}
