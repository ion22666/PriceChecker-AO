export const FirstLetterUpperCaser = (s: string): string =>
    s
        .split(" ")
        .map(word => word.substring(0, 1).toUpperCase() + word.substring(1, word.length).toLowerCase())
        .join(" ");
