# RTK ?

**Redux toolkit query** - бібліотека для керування серверним станом

## Client vs Server State

Контакти зберігаються в БД(зазвичай). Ми дублюємо стан собі на фронт і оновлюємо через redux

1. Наприклад видалення контакту, DELETE запит, повертається id видаленого контакту і ми на фронті робимо filter. Але це вже зробила БД за нас

**Server state** - contacts, все, що приходить з бекенду

**Client state** - contacts, filter, isLoading, isError, formState, isLoggedIn, isRefresh, ui theme

- contacts - дані з бекенду, ми не повинні думати за оновленням, видаленням, додаванням вручну. Нам потрібно сказати видали відповідний контакт, а наш Аpp, щоб забрав оновлені контакти

**Client state**:

- Local state - formState, filter
- Global state - isLoggedIn, ui theme

loading - чи повинні ми думати за loading, коли нам надходять контакти, то утиліта надає нам стани завантаження

**Server state** - contacts, loading

Тепер флоу такий :

- State in DB => fetch to create contact => add in DB => RTK self update contacts and return updated contacts

RTK сама створює екшени завантаження

- isPending, isRejected, isFulfilled
- caching on some time (for Example on 10 min)

### Getting started

- one createApi() - for one backend

```js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (build) => ({
    getPokemonByName: build.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

createApi - генерує хуки + reducer
getPokemonByName - назва функції, яка очікую name чи id, повертає те, що потрібно приставити до baseUrl. За замовучуванням це метод Get

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

хук який буде виконувати http запит - useGetPokemonByNameQuery - getPokemonByName
додає use на початок робить uppercase першої літери назву функції + Query

export const { useGetPokemonByNameQuery } = pokemonApi
```

#### React query quick start

QUESTION ?

WHAT IS MIDDLEWARE ?
WHEN CALL ?

```js
export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    pokemonApi.middleware,
  ],
});
```

In Pokemons

```jsx
const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");
Але як зробити, якщо ми ще не знаємо ім'я покемона,

https://redux-toolkit.js.org/rtk-query/usage/queries#query-hook-options

 {
      skip: true - коли true запиту не буде (pokemon === "")
        pollingInterval: 3000 - кожні 3 секунди буде запит
        refetchOnFocus: true -коли вікно буде у фокусі піде запит

refetchOnFocus працює з setupListeners()
setupListeners(store.dispatch) в store.js;
    },
```

CHECK REDUX STATE DEVTOOLS

##### What return hooks ?

https://redux-toolkit.js.org/rtk-query/usage/queries#frequently-used-query-hook-return-values

- isUninitialized - true when query has`t started
- isLoading - when true, when data loaded first time
- isFetching - true when every request fetch (for isLoading flag)

```jsx
<button type="button" onClick={refetch} disabled={isUninitialized}>
  Refetch
</button>
```

```js
console.log("🚀 ~ Pokemons ~ isError:", isError);
console.log("🚀 ~ Pokemons ~ isFetching:", isFetching);
console.log("🚀 ~ Pokemons ~ data:", data);
console.log("🚀 ~ Pokemons ~ error:", error);
```

1. Робимо запит = дивимось результат (pikachu)
2. Робимо запит по неіснуючому персонажу - дивимось, що стара дата на місці
3. Робимо успішний запит, такий який був в 1. (pikachu)
4. Робимо запит за новим героєм - bulbosaur
5. Йдемо в rtk devtools і дивимось queries
6. Queries - cache

###### Show loading in UI

rx - shortcut for create reducers, actions, selectors

```jsx
{
  data && <h1>{data.name}</h1>;
}

{
  isFetching && <Spinner />;
}
```

**Коли відбувається запит не показувати старі дані**

```jsx
{
  data && !isFetching && <h1>{data.name}</h1>;
}
```

**Пробуємо робити запит з однаковим query ** - чи буде йти запит ?

**Error 😢**

```jsx
{
  showData && !isFetching && !isError && <h1>{data.name}</h1>;
}
```

```jsx
{
  isError && <div>{error.data}</div>;
}
```

Робимо запит з cat

```jsx
{
  isError && error.originalStatus === 404 && (
    <div>
      Sorry, pokemon with name <strong>{pokemon}</strong> not founded 😢
    </div>
  );
}
```

ДИВИМОСЯ REDUX DEVTOOLS QUERIES

Виносимо в окемі змінні

```js
const isNotFoundedError = isError && error.originalStatus === 404;

const showData = data && !isFetching && !isError;
```

**Тобто ми керуємо кешованими даними і думаємо, як часто нам потрібно затягувати нові дані**

https://redux-toolkit.js.org/rtk-query/usage/cache-behavior

With RTK Query, caching is based on:

API endpoint definitions - кеш по ендпоінтам
The serialized query parameters used when components subscribe to data  
from an endpoint - кеш по query parameters
Active subscription reference counts - кеш по компонентам, поки буде підписаний хоч один компонент на дату кеш буде

https://redux-toolkit.js.org/rtk-query/usage/cache-behavior#cache-lifetime--subscription-example

**Короткі підсумки по пройденому**

```jsx
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useGetPokemonByNameQuery } from "@/redux/pokemons";
import { Spinner } from "../Spinner";

const Pokemons = () => {
  const [pokemon, setPokemon] = useState("");

  const { error, data, isFetching, isError, isUninitialized, refetch } =
    useGetPokemonByNameQuery(pokemon, {
      skip: pokemon === "",
      refetchOnFocus: true,
      // pollingInterval: 3000,
    });
  console.log("🚀 ~ Pokemons ~ isFetching:", isFetching);
  console.log("🚀 ~ Pokemons ~ data:", data);
  console.log("🚀 ~ Pokemons ~ error:", error);
  console.log("🚀 ~ Pokemons ~ isError:", isError);

  const handleSubmit = (values, { resetForm }) => {
    const { pokemonName } = values;

    setPokemon(pokemonName);

    resetForm();
  };

  const isNotFoundedError = isError && error.originalStatus === 404;
  const showData = data && !isFetching && !isError;

  return (
    <div>
      <Formik
        initialValues={{
          pokemonName: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field name="pokemonName" />
          <button type="submit">Search</button>
        </Form>
      </Formik>

      {isFetching && <Spinner width={60} height={60} />}

      {showData && <h1>{data.name}</h1>}

      {isNotFoundedError && (
        <div>
          Sorry, pokemon with name <strong>{pokemon}</strong> not founded 😢
        </div>
      )}

      <button type="button" onClick={refetch} disabled={isUninitialized}>
        Refetch
      </button>
    </div>
  );
};

export default Pokemons;
```

============================PART 2 ======================

###### MUTATIONS

```jsx
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "users", //! Reducer name
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6a4e600de785c9ef536cbd48.mockapi.io",
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/users`,
      providesTags: ["Users"],
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
} = usersApi;
```

CHECK REDUX DEVTOOLS

https://redux-toolkit.js.org/rtk-query/usage/mutations

- Для мутацій використовується build.mutation()

- transofrmRespone - повернути тільки те що треба

https://redux-toolkit.js.org/rtk-query/usage/mutations#performing-mutations-with-react-hooks

1. НЕ ВИДАЛЯЄТЬСЯ В ІНТЕРФЕЙСІ, БО МИ НЕ ОНОВЛЮЄМО КЕШ

2. ПОТРІБНО ДОДАТИ під час фетчу provideTags: ["Users"]

3. ПОТРІБНО ДОДАТИ TagTypes в createApi - ключ кешу
   І в методі invalidatesTags: ["Users"],

```jsx
const UsersListItem = ({ name, phone, status, email, id }) => {
  const [deleteUser, { data, isSuccess, isLoading: isDeleting }] =
    useDeleteUserMutation();

  return (
    <li style={{ marginBottom: "20px" }}>
      <p>
        Name: <strong>{name}</strong>
      </p>
      <p>
        Phone: <strong>{phone}</strong>
      </p>
      <p>
        Email: <strong>{email}</strong>
      </p>
      <p>
        status <strong>{status ? "Active" : "Non-active"}</strong>
      </p>

      <button type="button" onClick={() => deleteUser(id)}>
        {isDeleting ? <Spinner /> : "Delete"}
      </button>
    </li>
  );
};

export default UsersListItem;
```

```jsx
const UsersList = () => {
  const { data: users, isFetching, isError } = useGetUsersQuery();
  console.log("🚀 ~ UsersList ~ data:", users);

  return (
    <section>
      <h1>Users</h1>

      {isFetching && <Spinner />}

      <ul>
        {users &&
          users.map((item) => <UsersListItem key={item.id} {...item} />)}
      </ul>
    </section>
  );
};

export default UsersList;
```

```jsx
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "users", //! Reducer name
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6a4e600de785c9ef536cbd48.mockapi.io",
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/users`,
      providesTags: ["Users"],
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
} = usersApi;
```

if ok redirect to all users

isSuccess - PROMISE

```jsx
import React from "react";
import { Navigate, useNavigate } from "react-router";
import { useCreateUserMutation } from "@/redux/usersApi";
import { Spinner } from "../Spinner";

const CreateUser = () => {
  const [createUser, { isSuccess, isLoading: isCreating }] =
    useCreateUserMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const userData = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      phone: form.elements.phone.value,
      status: Boolean(form.elements.status.value),
    };

    await createUser(userData);
    try {
      navigate("/users");
    } catch (error) {
      console.log(error);
    }

    e.target.reset();
  };

  return (
    <>
      {/* {isSuccess && <Navigate to="/users" />} */}
      <form
        autoComplete="off"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">
          Name:
          <input type="text" name="name" />
        </label>
        <label htmlFor="phone">
          Phone:
          <input type="number" name="phone" />
        </label>

        <label htmlFor="email">
          Email
          <input type="email" name="email" />
        </label>

        <label htmlFor="status">
          Status:
          <input type="checkbox" name="status" defaultValue={false} />
        </label>

        <button type="submit" disabled={isCreating}>
          {isCreating ? <Spinner /> : "Create"}
        </button>
      </form>
    </>
  );
};

export default CreateUser;
```

```js
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
```
