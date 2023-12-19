import { Outlet } from "react-router-dom";
import Nav from "./section/nav";

export default function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
