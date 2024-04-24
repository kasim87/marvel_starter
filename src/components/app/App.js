import { BrowserRouter as Router, Route } from "react-router-dom/cjs/react-router-dom.min";
import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage } from "../pages";

function App() {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Route path='/'>
                        <MainPage/>
                    </Route>
                    <Route path='/comics'>           
                        <ComicsPage/>
                    </Route>
                </main>
            </div>
        </Router>
    )
}

export default App;