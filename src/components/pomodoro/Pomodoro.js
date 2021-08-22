import React from "react";

export default class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            break: 5,
            session: 25,
            activeSession: "session",
            isPaused: true,
            sessionTimeLeft: '25:00',
            breakTimeLeft: '05:00',
        }
        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.timer = this.timer.bind(this);
        this.audio = React.createRef();
        this.timeoudID = '';
    }
    timer() {
        const t = () => {
            this.setState((os) => {
                const type = this.state.activeSession;
                if (os[`${type}TimeLeft`] === '00:00') {
                    document.title = 'STOP';
                    this.audio.current.play();
                    const [osSession, osBreak] = [os.session.toString().padStart(2, '0'), os.break.toString().padStart(2, '0')];
                    const active = (type === 'session') ? 'break' : 'session';
                    return { activeSession: active, isPaused: false, sessionTimeLeft: `${osSession}:00`, breakTimeLeft: `${osBreak}:00` }
                } // Acá cuando termine
                let [m, s] = os[`${type}TimeLeft`].split(':');
                [m, s] = (s === '00') ? [(+m - 1).toString(), '59'] : [m, (+s - 1).toString()];
                return { [`${type}TimeLeft`]: `${m.padStart(2, '0')}:${s.padStart(2, '0')}` };
            });
            this.timeoutID = setTimeout(t, 1000);
            document.title = `${this.state.activeSession.toUpperCase()} - ${this.state[`${this.state.activeSession}TimeLeft`]}`;
        }
        if (this.state.isPaused) this.timeoutID = setTimeout(t, 1000);
        else clearTimeout(this.timeoutID);
        this.setState({ isPaused: !this.state.isPaused });

    }
    handleDecrement(type) {
        if (this.state.activeSession === "type") return;
        this.setState((os) => {
            let m = (os[type] - 1 <= 1) ? 1 : os[type] - 1;
            return { [type]: m, [`${type}TimeLeft`]: `${m.toString().padStart(2, '0')}:00` };
        });
    }
    handleIncrement(type) {
        if (this.state.activeSession === "type") return;
        this.setState((os) => {
            let m = (os[type] + 1 >= 60) ? 60 : os[type] + 1;
            return { [type]: m, [`${type}TimeLeft`]: `${m.toString().padStart(2, '0')}:00` };
        });
    }
    handleReset() {
        clearTimeout(this.timeoutID);
        this.audio.current.pause();
        this.audio.current.currentTime = 0;
        document.title = 'STOP';
        this.setState({ break: 5, session: 25, activeSession: "session", isPaused: true, sessionTimeLeft: '25:00', breakTimeLeft: '05:00' });
    }
    render() {
        const total = this.state[`${this.state.activeSession}`] * 60;
        const left = (+this.state[`${this.state.activeSession}TimeLeft`].split(':')[0] * 60) +
            +this.state[`${this.state.activeSession}TimeLeft`].split(':')[1];
        const width = (100 - ((left * 100) / total)).toFixed(2);
        return (
            <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="card text-center text-white bg-dark" style={{ minWidth: "min-content" }}>
                    <div className="card-body">
                        <div className="card-title display-1">
                            <p id="time-left">{this.state[`${this.state.activeSession}TimeLeft`]}</p>
                        </div>
                        <div className="card-subtitle display-4">
                            <p id="timer-label">{`${this.state.activeSession[0].toUpperCase()}${this.state.activeSession.slice(1)}`}</p>
                        </div>
                    </div>
                    <div className="card-text display-6">
                        <p id="break-label">Break Length: <span id="break-length">{this.state.break}</span></p>
                        <p id="session-label">Session Length: <span id="session-length">{this.state.session}</span></p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item text-white bg-dark">
                            <div className="btn-group btn-group-lg">
                                <button className="btn btn-primary" id="start_stop" onClick={this.timer}>{this.state.isPaused === null || this.state.isPaused ? 'Play' : 'Pausa'}</button>
                                <button className="btn btn-outline-secondary" id="reset" onClick={this.handleReset}>Reset</button>
                            </div>
                        </li>
                        <li className="list-group-item text-white bg-dark">
                            <div className="btn-group btn-group-lg" id="decrement">
                                <button className="btn btn-outline-light" id="break-decrement" onClick={() => this.handleDecrement("break")}>
                                    <i className="fas fa-chevron-down" style={{ marginRight: "5px" }}></i>
                                    Break Decrement
                                </button>
                                <button className="btn btn-light" id="session-decrement" onClick={() => this.handleDecrement("session")}>
                                    <i className="fas fa-chevron-down" style={{ marginRight: "5px" }}></i>
                                    Session Decrement
                                </button>
                            </div>
                        </li>
                        <li className="list-group-item text-white bg-dark">
                            <div className="btn-group btn-group-lg" id="increment">
                                <button className="btn btn-light" id="break-increment" onClick={() => this.handleIncrement("break")}>
                                    <i className="fas fa-chevron-up" style={{ marginRight: "5px" }}></i>
                                    Break Increment
                                </button>
                                <button className="btn btn-outline-light" id="session-increment" onClick={() => this.handleIncrement("session")}>
                                    <i className="fas fa-chevron-up" style={{ marginRight: "5px" }}></i>
                                    Session Increment
                                </button>
                            </div>
                        </li>
                    </ul>
                    <div className="card-footer">
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                                aria-valuenow={width} aria-valuemin="0" aria-valuemax="100" style={{ width: `${width}%`, backgroundColor: '#2b3749' }}></div>
                        </div>

                    </div>
                    <audio id="beep" ref={this.audio} src="./audio.m4a"></audio>
                </div>

            </div>
        );
    }
}