import React from "react";
import { Navigate } from "react-router";
import { useCreateUserMutation } from "@/redux/usersApi";
import { Spinner } from "../Spinner";

const CreateUser = () => {
  const [createUser, { isSuccess, isLoading: isCreating }] =
    useCreateUserMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const userData = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      phone: form.elements.phone.value,
      status: Boolean(form.elements.status.value),
    };

    createUser(userData);

    e.target.reset();
  };

  return (
    <>
      {isSuccess && <Navigate to="/users" />}
      <form
        autoComplete="off"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">
          Name:
          <input type="text" name="name" />
        </label>
        <label htmlFor="phone">
          Phone:
          <input type="number" name="phone" />
        </label>

        <label htmlFor="email">
          Email
          <input type="email" name="email" />
        </label>

        <label htmlFor="status">
          Status:
          <input type="checkbox" name="status" defaultValue={false} />
        </label>

        <button type="submit" disabled={isCreating}>
          {isCreating ? <Spinner /> : "Create"}
        </button>
      </form>
    </>
  );
};

export default CreateUser;
