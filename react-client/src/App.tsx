import {BrowserRouter, Routes, Route} from "react-router-dom";

import Layout from "./Layout.tsx";
import NoMatchPage from "./pages/NoMatchPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import OrdersPage from "./pages/OrdersPage.tsx";
import OrderDetailsPage from "./pages/OrderDetailsPage.tsx";

function App(): JSX.Element
{
    return (
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/comenzi" element={<OrdersPage />} />
                <Route path="/comenzi/detalii_comanda/:orderId" element={<OrderDetailsPage />} />
                <Route path="*" element={<NoMatchPage />} />
              </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;