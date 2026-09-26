import React from "react";
import { Spinner } from "../Spinner";

const UsersListItem = ({ name, phone, status, email, id }) => {
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

      <button type="button">"Delete"</button>
    </li>
  );
};

export default UsersListItem;
