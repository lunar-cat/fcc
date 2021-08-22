import { Link } from "react-router-dom";

const App = () => {
    return (
        <article className="container-fluid bg-dark" style={{ height: '100vh' }} >
            <h1 className="display-3 text-white" >Exercises from FreeCodeCamp</h1>
            <div className="list-group">
                <Item to="/calculator" caption="Calculadora" />
                <Item to="/markdown" caption="Markdown Viewer" />
                <Item to="/pomodoro" caption="Pomodoro Timer" />
                <Item to="/quote" caption="Random Quote" />
                <Item to="/drum" caption="Drum Machine" />
            </div>
        </article>
    );
};

const Item = (props) => {
    return (
        <Link to={props.to} className="list-group-item list-group-item-dark list-group-item-action" >
            {props.caption}
        </Link>
    );
}
export default App;