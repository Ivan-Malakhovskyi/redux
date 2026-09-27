import React from "react";
import { useDeleteUserMutation } from "@/redux/usersApi";
import { Spinner } from "../Spinner";

const UsersListItem = ({ name, phone, status, email, id }) => {
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

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

      <button
        type="button"
        disabled={isDeleting}
        onClick={() => deleteUser(id)}
      >
        {isDeleting ? <Spinner /> : "Delete"}
      </button>
    </li>
  );
};

export default UsersListItem;
