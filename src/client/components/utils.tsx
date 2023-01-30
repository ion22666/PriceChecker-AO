export const FirstLetterUpperCaser = (s: string): string =>
    s
        .split(" ")
        .map(word => word.substring(0, 1).toUpperCase() + word.substring(1, word.length).toLowerCase())
        .join(" ");
export const DateFormater = (date: Date) =>
    date
        .toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        })
        .split("/")
        .join("-");
