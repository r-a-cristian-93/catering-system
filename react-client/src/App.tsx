import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout/Layout.tsx";
import NoMatchPage from "./pages/NoMatchPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import OrdersPage from "./pages/OrdersPage.tsx";
import OrderDetailsPage from "./pages/OrderDetailsPage.tsx";
import { OrderDetailsProvider } from "./contexts/OrderDetailsContext.tsx";
import RecipesPage from "./pages/RecipesPage.tsx";
import RecipeDetailsPage from "./pages/RecipeDatailsPage.tsx";
import IngredientsPage from "./pages/IngredientsPage.tsx";
import IngredientDetailsPage from "./pages/IngredientDetailsPage.tsx";

export default function App(): JSX.Element
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/comenzi" element={<OrdersPage />} />
          <Route path="/comenzi/:orderId" element={<OrderDetailsProvider><OrderDetailsPage /></OrderDetailsProvider>} />
          <Route path="/retete" element={<RecipesPage />} />
          <Route path="/retete/:recipeId" element={<RecipeDetailsPage />} />
          <Route path="/ingrediente" element={<IngredientsPage />} />
          <Route path="/ingrediente/:ingredientId" element={<IngredientDetailsPage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}