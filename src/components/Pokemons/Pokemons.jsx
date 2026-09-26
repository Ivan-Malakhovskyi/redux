import { Field, Form, Formik } from "formik";

const Pokemons = () => {
  const handleSubmit = (values, { resetForm }) => {
    const { pokemonName } = values;

    resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={{
          pokemonName: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field name="pokemonName" />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Pokemons;
