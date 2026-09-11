```json
{
  "mock-api": "json-server --watch db.json --port 8080"
}
```

```js
createStore(reducer, preloadedState, enhancer);

const initialState = {
  tasks: [
    { id: 0, text: "Learn HTML and CSS", completed: true },
    { id: 1, text: "Get good at JavaScript", completed: true },
    { id: 2, text: "Master React", completed: false },
    { id: 3, text: "Discover Redux", completed: false },
    { id: 4, text: "Build amazing apps", completed: false },
  ],
  filters: {
    status: "all",
  },
};

const rootReducer = (state = initialState) => {
  return state;
};

export const store = createStore(rootReducer);
```

**Connect Redux to app**

```js
<Provider store={store}>
  <App />
</Provider>
```

**add extension**

```js
@redux-devtools/extension
const enhancer = devToolsEnhancer();
export const store = createStore(rootReducer, enhancer);
```

**useSelector**

/redux/constants.js

```js
export const statusFilters = Object.freeze({
  all: "all",
  active: "active",
  completed: "completed",
});
```

How can improve Button, Button, Button ?

**StatusFilter.jsx**

```jsx
// Імпортуємо хук
import { useSelector } from "react-redux";
// Імпортуємо об'єкт значень фільтра
import { statusFilters } from "../../redux/constants";
export const StatusFilter = () => {
  // Отримуємо значення фільтра із стану Redux
  const filter = useSelector((state) => state.filters.status);
  return (
    <div>
      <Button selected={filter === statusFilters.all}>All</Button>
      <Button selected={filter === statusFilters.active}>Active</Button>
      <Button selected={filter === statusFilters.completed}>Completed</Button>
    </div>
  );
};
```

**TaskList.jsx**

```jsx
const getVisibleTasks = (tasks, statusFilter) => {
  switch (statusFilter) {
    case statusFilters.active:
      return tasks.filter((task) => !task.completed);
    case statusFilters.completed:
      return tasks.filter((task) => task.completed);
    default:
      return tasks;
  }
};

export const TaskList = () => {
  // Отримуємо масив завдань із стану Redux
  const tasks = useSelector((state) => state.tasks);
  // Отримуємо значення фільтра із стану Redux
  const statusFilter = useSelector((state) => state.filters.status);
  // Обчислюємо масив завдань, які необхідно відображати в інтерфейсі
  const visibleTasks = getVisibleTasks(tasks, statusFilter);
  return (
    <ul>
      {visibleTasks.map((task) => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
};
```

**TaskCounter**

```jsx
// Імпортуємо хук
import { useSelector } from "react-redux";
export const TaskCounter = () => {
  // Отримуємо масив завдань із стану Redux
  const tasks = useSelector((state) => state.tasks);
  // На базі стану Redux отримуємо похідні дані
  const count = tasks.reduce(
    (acc, task) => {
      if (task.completed) {
        acc.completed += 1;
      } else {
        acc.active += 1;
      }
      return acc;
    },
    { active: 0, completed: 0 },
  );
  return (
    <div>
      <p>Active: {count.active}</p>
      <p>Completed: {count.completed}</p>
    </div>
  );
};
```

**Selectors**

```js
export const getTasks = (state) => state.tasks;
export const getStatusFilter = (state) => state.filters.status;
```

### Actions

```js
const action = {
  type: "Action type",
  payload: "Payload value",
};

Що не можна передавати в payload (який тип даних?)  - крім функцій та класів
```

**Action creators**

redux/actions.js

```js
import { nanoid } from "nanoid";
export const addTask = (text) => {
  return {
    type: "tasks/addTask",
    payload: {
      id: nanoid() => crypto.randomUUID() ,
      completed: false,
      text,
    },
  };
};
export const deleteTask = (taskId) => {
  return {
    type: "tasks/deleteTask",
    payload: taskId,
  };
};
export const toggleCompleted = (taskId) => {
  return {
    type: "tasks/toggleCompleted",
    payload: taskId,
  };
};

export const setStatusFilter = (value) => {
  return {
    type: "filters/setStatusFilter",
    payload: value,
  };
};
```

#### Send actions

**TaskForm.jsx**

```jsx
// Імпортуємо хук
import { useDispatch } from "react-redux";
// Імпортуємо генератор екшену
import { addTask } from "../../redux/actions";
export const TaskForm = () => {
  // Отримуємо посилання на функцію відправки екшенів
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    // Викликаємо генератор екшену та передаємо текст завдання для поля payload
    // Відправляємо результат – екшен створення завдання
    dispatch(addTask(form.elements.text.value));
    form.reset();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="text" placeholder="Enter task text..." />
      <button type="submit">Add task</button>
    </form>
  );
};
```

**Task**

```jsx
// Імпортуємо хук
import { useDispatch } from "react-redux";
// Імпортуємо генератор екшену
import { deleteTask } from "../../redux/actions";
export const Task = ({ task }) => {
  // Отримуємо посилання на функцію відправки екшенів
  const dispatch = useDispatch();
  // Викликаємо генератор екшену та передаємо ідентифікатор завдання
  // Відправляємо результат - екшен видалення завдання
  const handleDelete = () => dispatch(deleteTask(task.id));
  return (
    <div>
      <input type="checkbox" />
      <p>{task.text}</p>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
```

```jsx
const handleToggle = () => dispatch(toggleCompleted(task.id));
<input type="checkbox" onChange={handleToggle} checked={task.completed} />;
```

**ChangeFilter**
StatusFilter.jsx

```jsx
const dispatch = useDispatch();
const filter = useSelector((state) => state.statusFilter);
const handleFilterChange = (filter) => dispatch(setStatusFilter(filter));

<div>
  <Button
    selected={filter === statusFilters.all}
    onClick={() => handleFilterChange(statusFilters.all)}
  >
    All
  </Button>
  <Button
    selected={filter === statusFilters.active}
    onClick={() => handleFilterChange(statusFilters.active)}
  >
    Active
  </Button>
  <Button
    selected={filter === statusFilters.completed}
    onClick={() => handleFilterChange(statusFilters.completed)}
  >
    Completed
  </Button>
</div>;
```

##### Reducers

**Root reducer**

\*ПОЧАТКОВИЙ СТАН: при ініціалізації стора (екшен @@INIT у Redux DevTools) всім редюсерам у якості значення стану передається undefined. Тому кожному редюсеру необхідно вказати значення за замовчуванням для параметра state, яке стане початковим станом програми.

**Правила редюсерів​**

Редюсери повинні бути чистими функціями та дотримуватися списку правил:

Не можна змінювати аргументи (state та action). Редюсери мають лише обчислювати нове значення стану з урахуванням цих аргументів.
Не можна змінювати стан (state). Натомість редюсери повинні робити оновлення, копіюючи існуючий стан та вносячи зміни до копії.
Редюсери не повинні виконувати жодних «побічних ефектів». Наприклад, запуск таймера, виконання HTTP-запиту, зміна значення поза функцією або її аргументів, генерація випадкових чисел чи рядків тощо.

```js
// Використовуємо initialState як значення стану за умовчанням
export const rootReducer = (state = initialState, action) => {
  // Редюсер розрізняє екшени за значенням властивості type
  switch (action.type) {
    // Залежно від типу екшену виконуватиметься різна логіка
    default:
      // Кожен редюсер отримує всі екшени, відправлені в стор.
      // Якщо редюсер не повинен обробляти якийсь тип екшену,
      // необхідно повернути наявний стан без змін.
      return state;
  }
};
```

```jsx
case "tasks/addTask": {
     // Потрібно повернути новий об'єкт стану
     return {
       // в якому є всі дані існуючого стану
       ...state,
       // та новий масив задач
       tasks: [
         // в якому є всі існуючі завдання
         ...state.tasks,
         // та об'єкт нового завдання
         action.payload,
       ],
     };
   }
```

```jsx
 case "tasks/deleteTask":
     return {
       ...state,
       tasks: state.tasks.filter(task => task.id !== action.payload),
     };
```

```jsx
   tasks: state.tasks.map((task) =>
          task.id !== action.payload
            ? task
            : { ...task, completed: !task.completed },

 case "tasks/toggleCompleted":
     return {
       ...state,
       tasks: state.tasks.map(task => {
         if (task.id !== action.payload) {
           return task;
         }
         return {
           ...task,
           completed: !task.completed,
         };
       }),
     };
```

```jsx
case "filters/setStatusFilter":
     return {
       ...state,
       filters: {
         ...state.filters,
         status: action.payload,
       },
     };
```

**Композиція редюсерів**

```jsx
const tasksInitialState = [
  { id: 0, text: "Learn HTML and CSS", completed: true },
  { id: 1, text: "Get good at JavaScript", completed: true },
  { id: 2, text: "Master React", completed: false },
  { id: 3, text: "Discover Redux", completed: false },
  { id: 4, text: "Build amazing apps", completed: false },
];

const tasksReducer = (state = tasksInitialState, action) => {
  switch (action.type) {
    case "tasks/addTask":
      return [...state, action.payload];
    case "tasks/deleteTask":
      return state.filter((task) => task.id !== action.payload);
    case "tasks/toggleCompleted":
      return state.map((task) => {
        if (task.id !== action.payload) {
          return task;
        }
        return { ...task, completed: !task.completed };
      });
    default:
      return state;
  }
};
```

```js
const filtersInitialState = {
  status: statusFilters.all,
};

const filtersReducer = (state = filtersInitialState, action) => {
  switch (action.type) {
    case "filters/setStatusFilter":
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};
```

```js
export const rootReducer = (state = {}, action) => {
  // Повертаємо об'єкт стану
  return {
    // Обом редюсерам передаємо тільки частину стану, за яку вони відповідають.
    tasks: tasksReducer(state.tasks, action),
    filters: filtersReducer(state.filters, action),
  };
};
```

Щоб не створювати кореневий редюсер вручну, у бібліотеці Redux є функція combineReducers, яка робить те саме, але коротше:

src/redux/reducer.js

```js
export const rootReducer = combineReducers({
  tasks: tasksReducer,
  filters: filtersReducer,
});
```

**Винести редюсери в окремі файли**
**зробити комбінування редюсерів**
**імпортувати в store**
