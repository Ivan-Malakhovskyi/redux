import { Route, Routes } from "react-router";
import { lazy } from "react";
import { SharedLayout } from "./components/SharedLayout";
import UsersPage from "./pages/UsersPage";
import CreateUserPage from "./pages/CreateUserPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const PokemonsPage = lazy(() => import("./pages/PokemonsPage"));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/pokemons" element={<PokemonsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/create" element={<CreateUserPage />} />
      </Route>{" "}
    </Routes>
  );
};

export default App;
