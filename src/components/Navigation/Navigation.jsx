import { NavLink } from "react-router";
import styles from "./Navigation.module.css";

const btnLinks = [
  { id: crypto.randomUUID(), href: "", title: "Головна" },
  { id: crypto.randomUUID(), href: "authors", title: "Автори" },
  { id: crypto.randomUUID(), href: "books", title: "Книги" },
  { id: crypto.randomUUID(), href: "table", title: "Таблиця" },
  { id: crypto.randomUUID(), href: "account", title: "Аккаунт" },
  { id: crypto.randomUUID(), href: "counter", title: "Лічильник" },
];

export default function Navigation() {
  return (
    <nav>
      {btnLinks.map(({ href, id, title }) => (
        <NavLink
          key={id}
          to={`/${href}`}
          className={({ isActive }) =>
            isActive ? `${styles.activeLink}` : `${styles.link}`
          }
        >
          {title}
        </NavLink>
      ))}
    </nav>
  );
}
