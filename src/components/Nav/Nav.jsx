import React from "react";
import { NavLink } from "react-router";
import styles from "./Nav.module.css";

const nav = [
  { id: crypto.randomUUID(), text: "Home", path: "" },
  { id: crypto.randomUUID(), text: "Pokemons", path: "pokemons" },
  { id: crypto.randomUUID(), text: "Users", path: "users" },
  { id: crypto.randomUUID(), text: "CreateUser", path: "users/create" },
];

export const Nav = () => {
  return (
    <nav>
      <ul className={styles.nav_list}>
        {nav.map(({ id, text, path }) => (
          <li key={id}>
            <NavLink to={`/${path}`}>{text}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
