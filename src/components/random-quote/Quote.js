import React from 'react';

export default function Quote(props) {
    return (

        <div id="quote-box" style={{ color: 'purple', height: '70%'}}
            className="d-flex align-items-center flex-column px-lg-5 position-relatives">

            <div className="card text-white bg-dark text-center">
                <div className="card-header">
                    <strong>Quote</strong>
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p id="text">{props.quote}</p>
                        <footer className="blockquote-footer">Author: <cite title="Source Title" id="author">{props.author}</cite></footer>
                    </blockquote>
                </div>
            </div>

            <div className="btn-group position-absolute bottom-0 pb-1" role="group">
                <button
                    className="btn btn-light"
                    id="new-quote"
                    onClick={props.handleClick}>
                    New Quote <i className="fas fa-random"></i>
                </button>
                <a
                    className="btn btn-dark"
                    target="_blank"
                    id="tweet-quote"
                    href={`https://twitter.com/intent/tweet?text=${props.quote}`}
                    rel="noreferrer">
                    Twittear <i className="fab fa-twitter"></i>
                </a>
            </div>

        </div>

    );
}