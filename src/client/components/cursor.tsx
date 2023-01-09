import * as React from "react";

interface CursorProps {
    // Props go here
}

interface CursorState {
    x: number;
    y: number;
}

class Cursor extends React.Component<CursorProps, CursorState> {
    imageRef: React.RefObject<HTMLImageElement>;

    constructor(props: CursorProps) {
        super(props);
        this.state = { x: 0, y: 0 };
        this.imageRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener("mousemove", this.handleMouseMove);
    }

    componentWillUnmount() {
        document.removeEventListener("mousemove", this.handleMouseMove);
    }

    handleMouseMove = (event: MouseEvent) => {
        this.setState({ x: event.clientX, y: event.clientY });
    };

    render() {
        return <img ref={this.imageRef} className="cursor" src="img/cursor.gif" style={{ left: this.state.x, top: this.state.y }} />;
    }
}

export default Cursor;
