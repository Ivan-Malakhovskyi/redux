import { useDispatch, useSelector } from "react-redux";
import { Button } from "../Button/";
import css from "./StatusFilter.module.css";
import { statusFilters } from "../constants";
import { setStatusFilter } from "@/redux/filtersSlice";
import { getStatusFilter } from "@/redux/selectors";

const btnList = [
  {
    id: crypto.randomUUID(),
    status: statusFilters.all,
    text: "All",
  },
  {
    id: crypto.randomUUID(),
    status: statusFilters.active,
    text: "Active",
  },
  {
    id: crypto.randomUUID(),
    status: statusFilters.completed,
    text: "Completed",
  },
];

export const StatusFilter = () => {
  const filter = useSelector(getStatusFilter);
  const dispatch = useDispatch();

  const handleChangeFilter = (status) => dispatch(setStatusFilter(status));

  return (
    <div className={css.wrapper}>
      {btnList.map(({ id, text, status }) => (
        <Button
          key={id}
          selected={status === filter}
          onClick={() => handleChangeFilter(status)}
        >
          {text}
        </Button>
      ))}
    </div>
  );
};
