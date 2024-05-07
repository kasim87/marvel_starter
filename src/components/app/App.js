import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, Page404, SinglePage , SingleComicPage, SingleCharacterPage } from "../pages";

function App() {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage/>}/>
                        <Route path='/comics' element={<ComicsPage/>}/>
                        <Route path="/comics/:id">
                            <SinglePage Component={SingleComicPage} dataType='comics'/>    
                        <Route/>
                        <Route path="/characters/:id">
                            <SinglePage Component={SingleCharacterPage} dataType='characters'/>
                        <Route/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </main>
            </div>s
        </Router>
    )
}

export default App;