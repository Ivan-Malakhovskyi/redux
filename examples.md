```jsx
export const increment = () => ({ type: "INCREMENT" });
export const decrement = () => ({ type: "DECREMENT" });
```

```jsx
const initialState = 0;

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};
export default counterReducer;
```

```jsx
const changeValue = (value) => {
  return {
    type: "filters/changeValue",
    payload: value,
  };
};

const filterReducer = (state = { filters: "" }, action) => {
  switch (action.type) {
    case "filters/changeValue":
      return state.filters;

    default:
      return state;
  }
};
```
