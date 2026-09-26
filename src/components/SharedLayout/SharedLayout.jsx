import { Suspense } from "react";
import { Outlet } from "react-router";
import { Container } from "@/Container";
import { Nav } from "../Nav";
import { Spinner } from "../Spinner";

export const SharedLayout = () => {
  return (
    <Container>
      <Nav />

      <main>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
    </Container>
  );
};
