import React from "react";

const CreateUser = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const userData = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      phone: form.elements.phone.value,
      status: Boolean(form.elements.status.value),
    };

    e.target.reset();
  };

  return (
    <>
      {/* {isSuccess && <Navigate to="/users" />} */}
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

        <button type="submit">"Create"</button>
      </form>
    </>
  );
};

export default CreateUser;
