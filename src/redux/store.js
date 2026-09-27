import { configureStore } from "@reduxjs/toolkit";
import { pokemonApi } from "./pokemons";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "./usersApi";

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },

  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    pokemonApi.middleware,
    usersApi.middleware,
  ],
});

setupListeners(store.dispatch);
