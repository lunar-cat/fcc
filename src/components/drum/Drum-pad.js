import React from "react";

export default class DrumPad extends React.Component {
    constructor(props) {
        super(props);
        this.audioRef = React.createRef();
    }
    componentDidUpdate() {
        if (this.props.isPressed) this.audioRef.current.play();
    }
    render() {
        return (
            <button id={this.props.value} key={this.props.value} className="drum-pad btn btn-dark" onClick={this.props.handleClick}>
                {this.props.value}
                <audio id={this.props.value} src={this.props.url} ref={this.audioRef} className="clip"></audio>
            </button>
        );
    }
}