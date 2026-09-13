type ClassValue =
    string | number | null | undefined | ClassDictionary | ClassArray;
interface ClassDictionary {
    [id: string]: any;
}
interface ClassArray extends Array<ClassValue> {}

export function cn(...inputs: ClassValue[]): string {
    const classes: string[] = [];

    const process = (input: ClassValue) => {
        if (!input && input !== 0) return;
        if (typeof input === "string" || typeof input === "number") {
            classes.push(String(input));
            return;
        }
        if (Array.isArray(input)) {
            input.forEach(process);
            return;
        }
        if (typeof input === "object") {
            for (const key in input as ClassDictionary) {
                if ((input as ClassDictionary)[key]) classes.push(key);
            }
        }
    };

    inputs.forEach(process);

    return classes.join(" ");
}

export default cn;
