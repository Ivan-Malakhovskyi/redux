# configureStore

```js
export const store = configureStore({
  reducer: rootReducer,
});

⬇️


//! Create root auto
export const store = configureStore({
  reducer: {
  tasks: taskReducer,
  filters: filtersReducer,
},
});

```

## CreateAction

```jsx

export const deleteTask = (taskId) => {
  return {
    type: "tasks/deleteTask",
    payload: taskId,
  };
};

⬇️

export const deleteTask = createAction("tasks/deleteTask");

console.dir(deleteTask)
console.dir(deleteTask(10))

After change action check if works

```

### CreateReducer

```jsx
export const taskReducer1 = createReducer(tasksInitState, (builder) =>
  builder
    .addCase(addAction, (state, action) => {
      //  return [...state, action.payload];
      return state.push(action.payload);
    })
    .addCase(deleteAction, (state, action) => {
      //  return state.filter((item) => item.id !== action.payload);
      const index = state.findIndex((task) => task.id === action.payload);
      state.splice(index, 1);
    })
    .addCase(toggleAction, (state, action) => {
      // return state.map((task) =>
      //   task.id !== action.payload
      //     ? task
      //     : { ...task, completed: !task.completed },
      // );
      for (const task of state) {
        if (task.id === action.payload) {
          task.completed = !task.completed;
        }
      }
    }),

IMMER in createReducer;


export const filtersReducer = createReducer(filtersInitialState, {
 [setStatusFilter]: (state, action) => {
   // ✅ Immer замінить це на операцію оновлення
   state.status = action.payload;

 },
});

Один із підводних каменів бібліотеки Immer полягає в тому, що в коді одного редюсера можна лише або мутувати стан, або повернути оновлений, але не те й інше водночас:
```

#### createSlice

```jsx
import { createSlice } from "@reduxjs/toolkit";

const tasksInitialState = [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksInitialState,
  reducers: {
    addTask(state, action) {
      state.push(action.payload);
    },
    deleteTask(state, action) {
      const index = state.findIndex((task) => task.id === action.payload);
      state.splice(index, 1);
    },
    toggleCompleted(state, action) {
      for (const task of state) {
        if (task.id === action.payload) {
          task.completed = !task.completed;
          break;
        }
      }
    },
  },
});

const { addTask, deleteTask, toggleCompleted } = tasksSlice.actions;
const tasksReducer = tasksSlice.reducer;
```

```jsx
import { createAction, nanoid } from "@reduxjs/toolkit";
export const addTask = createAction("tasks/addTask", (text) => {
  return {
    payload: {
      text,
      id: nanoid(),
      completed: false,
    },
  };
});


reducers: {
   addTask: {
     reducer(state, action) {
       state.push(action.payload);
     },
     prepare(text) {
       return {
         payload: {
           text,
           id: nanoid(),
           completed: false,
         },
       };
     },
   },
   // Код решти редюсерів
 },
```

```jsx
import { createSlice } from "@reduxjs/toolkit";
import { statusFilters } from "./constants";
const filtersInitialState = {
  status: statusFilters.all,
};
const filtersSlice = createSlice({
  name: "filters",
  initialState: filtersInitialState,
  reducers: {
    setStatusFilter(state, action) {
      state.status = action.payload;
    },
  },
});
// Експортуємо генератори екшенів та редюсер
export const { setStatusFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
```
