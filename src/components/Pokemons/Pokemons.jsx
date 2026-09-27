import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useGetPokemonByNameQuery } from "@/redux/pokemons";
import { Spinner } from "../Spinner";

const Pokemons = () => {
  const [pokemonName, setPokemonName] = useState("");

  const {
    isFetching,
    error,
    data: pokemon,
  } = useGetPokemonByNameQuery(pokemonName, {
    skip: pokemonName === "",
    // refetchOnFocus: true,
    // pollingInterval: 3000,
  });

  const handleSubmit = (values, { resetForm }) => {
    const { name } = values;

    setPokemonName(name);

    resetForm();
  };

  const showData = pokemon && !isFetching && !error;
  const showError = error && error.status === 404;

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field name="name" />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      {showData && <h1>{pokemon.name} </h1>}

      {showError && (
        <p>Sorry, such pokemon with name {pokemonName} not founded (</p>
      )}

      {isFetching && <Spinner />}
    </div>
  );
};

export default Pokemons;
