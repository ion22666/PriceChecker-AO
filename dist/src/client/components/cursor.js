import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
class Cursor extends React.Component {
    imageRef;
    constructor(props) {
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
    handleMouseMove = (event) => {
        this.setState({ x: event.clientX, y: event.clientY });
    };
    render() {
        return _jsx("img", { ref: this.imageRef, className: "cursor", src: "img/cursor.gif", style: { left: this.state.x, top: this.state.y } });
    }
}
export default Cursor;
