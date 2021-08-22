import React from "react";

const numberList = [
    { value: '0', id: 'zero' },
    { value: '1', id: 'one' },
    { value: '2', id: 'two' },
    { value: '3', id: 'three' },
    { value: '4', id: 'four' },
    { value: '5', id: 'five' },
    { value: '6', id: 'six' },
    { value: '7', id: 'seven' },
    { value: '8', id: 'eight' },
    { value: '9', id: 'nine' },
]
const operatorList = [
    { value: '+', id: 'add' },
    { value: '-', id: 'subtract' },
    { value: '*', id: 'multiply' },
    { value: '/', id: 'divide' },
    { value: '.', id: 'decimal' },
]

export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.handleButton = this.handleButton.bind(this);
    }
    handleButton(e) {
        const value = e.target.dataset.value;
        if (numberList.map(obj => obj.value).includes(value)) this.props.handleNumber(value);
        else if (operatorList.map(obj => obj.value).includes(value)) this.props.handleOperator(value);
        else console.log(`The data-value attribute of ${e.target} has been modified.`);
    }
    render() {
        return (
            <div className="list-group list-group-flush">

                <li className="list-group-item text-white bg-dark d-flex align-items-center justify-content-between">
                    <div className="btn-group">
                        <button type="button" id="clear" onClick={this.props.handleClear} className="btn btn-danger">Clear</button>
                        <button type="button" id="equals" onClick={this.props.handleEqual} className="btn btn-light"> = </button>
                    </div>
                    <div className="btn-group ms-2">
                        {operatorList.map(obj => <button type="button" key={obj.id} data-value={obj.value}
                            id={obj.id} onClick={this.handleButton} className="btn btn-light">{obj.value}</button>)}
                    </div>
                </li>
                <li className="list-group-item bg-dark">
                    <div className="btn-group">
                        {numberList.map(obj => <button type="button" key={obj.id} data-value={obj.value}
                            id={obj.id} onClick={this.handleButton} className="btn btn-light">{obj.value}</button>)}
                    </div>
                </li>

            </div>

        );
    }
}