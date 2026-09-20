import { createSlice } from "@reduxjs/toolkit";

const tasksInitState = [
  { id: 0, text: "Learn HTML and CSS", completed: true },
  { id: 1, text: "Get good at JavaScript", completed: true },
  { id: 2, text: "Master React", completed: false },
  { id: 3, text: "Discover Redux", completed: false },
  { id: 4, text: "Build amazing apps", completed: false },
];

export const taskSlice = createSlice({
  name: "tasks",
  initialState: tasksInitState,

  reducers: {
    addTask: {
      reducer(state, action) {
        state.push(action.payload);
      },

      prepare(text) {
        return {
          payload: {
            text,
            id: crypto.randomUUID(),
            completed: false,
          },
        };
      },
    },
    deleteTask(state, action) {
      return state.filter((task) => task.id !== action.payload);
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

export const { addTask, deleteTask, toggleCompleted } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;

//! redux toolkit 1
// export const taskReducer = createReducer(tasksInitState, (builder) => {
//   builder
//     .addCase(addTask, (state, action) => {
//       state.push(action.payload);
//     })
//     .addCase(deleteTask, (state, action) => {
//       // const index = state.findIndex((task) => task.id === action.payload);
//       // state.splice(index, 1);
//       state.filter((task) => task.id !== action.payload);
//     })
//     .addCase(toggleCompleted, (state, action) => {
//       for (const task of state) {
//         if (task.id === action.payload) {
//           task.completed = !task.completed;
//           break;
//         }
//       }
//     });
// });

//! vanilla
// export const taskReducer = (state = tasksInitState, action) => {
//   switch (action.type) {
//     case "tasks/addTask":
//       return [...state, action.payload];

//     case "tasks/deleteTask":
//       return state.filter((item) => item.id !== action.payload);

//     case "tasks/toggleCompleted":
//       return state.map((task) =>
//         task.id !== action.payload
//           ? task
//           : { ...task, completed: !task.completed },
//       );

//     default:
//       return state;
//   }
// };
