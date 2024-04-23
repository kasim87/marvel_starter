import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom/cjs/react-router-dom.min";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

import decoration from '../../resources/img/vision.png';

function App() {
    const [selectedChar, setSelectedChar] = useState(null)
    
    function onCharSelected(id) {
        setSelectedChar(id)
    }

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Route>
                        <ErrorBoundary>
                            <RandomChar/>
                        </ErrorBoundary>
                        <div className="char__content">
                            <ErrorBoundary>
                                <CharList onCharSelected={onCharSelected}/>
                            </ErrorBoundary>
                            <ErrorBoundary>
                                <CharInfo charId={selectedChar}/>
                            </ErrorBoundary>
                        </div>
                        <img className="bg-decoration" src={decoration} alt="vision"/>
                    </Route>
                    <Route>           
                        <AppBanner/>
                        <ComicsList/>
                    </Route>
                </main>
            </div>
        </Router>
    )
}

export default App;