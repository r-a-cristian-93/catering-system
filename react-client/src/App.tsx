import {BrowserRouter, Routes, Route} from "react-router-dom";

import Layout from "./Layout.tsx";
import NoMatchPage from "./pages/NoMatchPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
 
function App(): JSX.Element
{
    return (
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NoMatchPage />} />
              </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;