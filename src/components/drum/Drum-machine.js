import React from "react";
import DrumPad from "./Drum-pad";

export default class DrumMachine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "Q": false, "W": false, "E": false, "A": false,
            "S": false, "D": false, "Z": false, "X": false, "C": false
        };
        this.activeKey = '';
        this.preUrl = "https://s3.amazonaws.com/freecodecamp/drums/";
        this.urls = [`${this.preUrl}Heater-1.mp3`, `${this.preUrl}Heater-2.mp3`, `${this.preUrl}Heater-3.mp3`, `${this.preUrl}Heater-4_1.mp3`,
        `${this.preUrl}Heater-6.mp3`, `${this.preUrl}Dsc_Oh.mp3`, `${this.preUrl}Kick_n_Hat.mp3`, `${this.preUrl}RP4_KICK_1.mp3`, `${this.preUrl}Cev_H2.mp3`]
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleKeyUp(e) {
        const key = e.key.toUpperCase();
        if (Object.keys(this.state).includes(key)) {
            this.setState({ [key]: false });
            this.activeKey = '-';
        }
    }
    handleKeyDown(e) {
        const key = e.key.toUpperCase();
        if (Object.keys(this.state).includes(key)) {
            this.setState({ [key]: true });
            this.activeKey = key;
        }
    }
    handleClick(e) {
        const key = e.target.textContent;
        if (Object.keys(this.state).includes(key)) {
            this.setState({ [key]: true });
            this.activeKey = key;
        }
    }
    render() {
        const keyList = Object.keys(this.state).map((val, idx) => <DrumPad
            value={val}
            key={val}
            isPressed={this.state[val]}
            url={this.urls[idx]}
            handleClick={this.handleClick}
        />);
        return (
            <div tabIndex="0" id="drum-machine" style={{height: "100vh"}}
                className="container-fluid d-flex flex-column align-items-center justify-content-center"
                onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp}>
                <h1 className="display-3">Tecla presionada: <span className="badge bg-dark" id="display">{this.activeKey}</span></h1>
                <div className="btn-group btn-group-lg display-3" role="group">
                    {keyList}
                </div>
            </div>
        );
    }

}