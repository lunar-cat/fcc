import { Switch, Route, HashRouter } from "react-router-dom";
import App from "./App";
import Calculator from "./components/calculator/Calculator";
import DrumMachine from "./components/drum/Drum-machine";
import Markdown from "./components/markdown/Markdown";
import Pomodoro from "./components/pomodoro/Pomodoro";
import QuoteBox from "./components/random-quote/Quote-box";

const Routes = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/calculator" component={Calculator} />
                <Route exact path="/drum" component={DrumMachine} />
                <Route exact path="/markdown" component={Markdown} />
                <Route exact path="/pomodoro" component={Pomodoro} />
                <Route exact path="/quote" component={QuoteBox} />
            </Switch>
        </HashRouter>
    );
};

export default Routes;