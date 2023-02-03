export const FirstLetterUpperCaser = (s: string): string =>
    s
        .split(" ")
        .map(word => word.substring(0, 1).toUpperCase() + word.substring(1, word.length).toLowerCase())
        .join(" ");

// takes a date and formats it like : mm-dd-yyyy
export const DateFormater = (date: Date) =>
    date
        .toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        })
        .split("/")
        .join("-");

type Props = { unique_name?: string; quality?: string; className?: string; id?: string; onClick?: React.MouseEventHandler<HTMLImageElement> | undefined };

export const ImgElement: FunctionComponent<Props> = (props: Props) => {
    return (
        <img
            id={props.id}
            className={props.className}
            onClick={props.onClick}
            src={`https://render.albiononline.com/v1/item/${props.unique_name}.png?quality=${props.quality}`}
            onError={e => {
                e.currentTarget.src = "img/T1_TRASH.png";
                e.currentTarget.onerror = null;
            }}
        />
    );
};

export function formatNumber(n: number): string {
    if (n >= 1000000000) {
        n /= 1000000000;
        return n + "B";
    } else if (n >= 1000000) {
        n /= 1000000;
        return n + "M";
    } else if (n >= 1000) {
        n /= 1000;
        return n + "K";
    }
    return n.toString();
}
