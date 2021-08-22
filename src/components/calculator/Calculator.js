import React from "react";
import Button from "./Button";

export default class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = { input: '0', lastPressed: 'decimalZero', numberHasDecimal: false, dualOperator: false };
        this.handleClear = this.handleClear.bind(this);
        this.handleEqual = this.handleEqual.bind(this);
        this.handleOperator = this.handleOperator.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
    }
    handleClear() {
        this.setState({ input: '0', lastPressed: 'decimalZero', numberHasDecimal: false, dualOperator: false });
    }
    handleEqual() {
        const clean = this.state.input.replace(/[^\d\/\*-+\.]/g, '');
        const result = eval(clean);
        const resultHasDecimal = Number.isInteger(result);
        this.setState({ input: result, lastPressed: 'number', numberHasDecimal: resultHasDecimal, dualOperator: false });
    }
    handleOperator(operator) {
        switch (operator) {
            case '-':
                if (this.state.dualOperator) return;
                const isTheSecondOperator = this.state.lastPressed === 'operator' || this.state.lastPressed === 'subtract';
                this.setState({ lastPressed: 'subtract', numberHasDecimal: false, dualOperator: isTheSecondOperator });
                this.setState((oldState) => ({ input: oldState.input + operator }));
                break;
            case '.':
                if (this.state.lastPressed === 'number' && !this.state.numberHasDecimal) {
                    this.setState((os) => ({ input: os.input + operator, lastPressed: 'decimal', numberHasDecimal: true }));
                } else if (this.state.lastPressed === 'operator' || this.state.lastPressed === 'subtract' || this.state.lastPressed === '') {
                    this.setState((os) => ({ input: os.input + `0.`, lastPressed: 'decimalZero', numberHasDecimal: true, dualOperator: false }));
                }
                break;
            default: // + * /
                const lengthToReplace = (this.state.dualOperator) ? 2 : 1;
                if (this.state.lastPressed === 'number') {
                    this.setState({ lastPressed: 'operator', numberHasDecimal: false, dualOperator: false });
                    this.setState((oldState) => ({ input: oldState.input + operator }));
                } else {
                    this.setState((os) => ({
                        input: os.input.slice(0, os.input.length - lengthToReplace) + operator,
                        lastPressed: 'operator', numberHasDecimal: false, dualOperator: false // false porque estamos reemplazando los 2 operadores que habían
                    }));
                }
                break;
        }
    }
    handleNumber(number) {
        if (number === '0' && !['number', 'decimal'].includes(this.state.lastPressed)) return; // No 0 al inicio
        if (this.state.lastPressed === 'decimalZero') {
            this.setState((os) => ({ input: os.input.slice(0, os.input.length - 2) + number, lastPressed: 'number', numberHasDecimal: false, dualOperator: false }))
        } else {
            this.setState((os) => ({ input: os.input + number, lastPressed: 'number', dualOperator: false }));
        }
        this.setState(({ lastPressed: 'number', dualOperator: false }));
    }
    render() {
        return (
            <div className="container d-flex align-items-center justify-content-center" style={{ height: "100vh", minWidth: 'min-content', maxWidth: 'min-content' }}>
                <div className="card bg-dark text-white">
                    <div className="card-header text-end display-4 ">
                        <p id="display">{this.state.input}</p>
                    </div>
                    <div className="card-body">
                        <Button handleClear={this.handleClear}
                            handleEqual={this.handleEqual} handleNumber={this.handleNumber} handleOperator={this.handleOperator} />

                    </div>
                </div>
            </div>
        );
    }
}