# Tasks

1. Setup Routing:

Private routes:

/tasks

Public:

/login
/register
/home

- HomePage
- LoginPage
- RegisterPage
- TasksPage

Add SharedLayout

2. Add css for show current position

3. Separate redux data:

- auth: authSelectors, authSlice...
- tasks: tasksSelectors, tasksSlice...

4. Connect authReducer to store and add redux-persist (token)

5. In auth redux create:

- operations: CRUD operations (current, login)
- selectors
- authSlice:

State example for auth

```js
const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};
```

6. Create a custom hook to encapsulate logic that is reused across multiple components.

7. Do re-export in components

8. Add lazy-loading for component that need

9. Add Private, Restricted routes

## Fake backend

- BASE_URL - https://dummyjson.com

**ENDPOINTS**

[Auth](https://dummyjson.com/docs/auth)

1.  Auth:

- /auth/me - get current user
- /auth/login - login
- /logout - not exist ❌
- /register - not exist ❌

[Users](https://dummyjson.com/docs/users)

2. Todos

- /todos - get All todos
- /todos/:1 - single
- /todos/add - create todo
- /todos/:1 - update todo
- todos/:1 - delete todo
