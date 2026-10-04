import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { TaskList } from "@/components/TaskList/TaskList";
import { fetchTasks } from "@/redux/tasks/tasksOperations";
import { selectLoading } from "@/redux/tasks/selectors";
import { AppBar } from "@/components/AppBar/AppBar";
import { TaskForm } from "@/components/TaskForm/TaskForm";

const TasksPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Your tasks</title>
      </Helmet>
      <AppBar />
      <TaskForm />
      <TaskList />
      {isLoading && !error && <b>Request in progress...</b>}
    </>
  );
};

export default TasksPage;
