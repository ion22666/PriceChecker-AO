import { jsx as _jsx } from "react/jsx-runtime";
export const FirstLetterUpperCaser = (s) => s
    .split(" ")
    .map(word => word.substring(0, 1).toUpperCase() + word.substring(1, word.length).toLowerCase())
    .join(" ");
// takes a date and formats it like : mm-dd-yyyy
export const DateFormater = (date) => date
    .toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
})
    .split("/")
    .join("-");
export const ImgElement = (props) => {
    return (_jsx("img", { id: props.id, className: props.className, onClick: props.onClick, src: `https://render.albiononline.com/v1/item/${props.unique_name}.png?quality=${props.quality}`, onError: e => {
            e.currentTarget.src = "img/T1_TRASH.png";
            e.currentTarget.onerror = null;
        } }));
};
export function formatNumber(n) {
    if (n >= 1000000000) {
        n /= 1000000000;
        return n + "B";
    }
    else if (n >= 1000000) {
        n /= 1000000;
        return n + "M";
    }
    else if (n >= 1000) {
        n /= 1000;
        return n + "K";
    }
    return n.toString();
}
