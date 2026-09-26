import React from "react";
import UsersListItem from "./UsersListItem";
import { Spinner } from "../Spinner";

const UsersList = () => {
  return (
    <section>
      <h1>Users</h1>

      {/* {isFetching && <Spinner />} */}

      <ul>
        {/* {users &&
          users.map((item) => <UsersListItem key={item.id} {...item} />)} */}
      </ul>
    </section>
  );
};

export default UsersList;
