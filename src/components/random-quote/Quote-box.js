import React from 'react';
import Quote from './Quote';

export default class QuoteBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { quote: '', author: '', cache: '' };
        this.getRandomQuote = this.getRandomQuote.bind(this);
    }
    async componentDidMount() {
        const quotes = await fetch("https://type.fit/api/quotes");
        const response = await quotes.json();
        this.setState({ cache: response });
        this.getRandomQuote();
    }
    getRandomQuote() {
        const randomQuote = this.state.cache[Math.floor(Math.random() * this.state.cache.length)];

        this.setState({ quote: `${randomQuote.text}`, author: `${randomQuote.author === null ? 'Unknown' : randomQuote.author}` });
    }
    render() {
        return (
            <div className="container-fluid" style={{ height: '100vh' }}>
                <div style={{ backgroundColor: '#29333c', color: 'white', height: '100%' }} className="row">
                    <h1 className="p-sm-4 p-2 display-2 text-center" style={{height: '30%'}}>Random Quote Machine</h1>
                    <Quote
                        quote={this.state.quote}
                        author={this.state.author}
                        handleClick={this.getRandomQuote}
                    />
                </div>
            </div>
        );
    }
}