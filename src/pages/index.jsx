import { useStoreon } from "storeon/react";
import { default as Home } from "./Home";
import { routerKey } from "@storeon/router";

const Page = () => {
  const { [routerKey]: route } = useStoreon(routerKey);

  let Component = null;
  switch (route.match.page) {
    case "home":
      Component = <Home />;
      break;
    default:
      Component = <h1>404 Error</h1>;
  }

  return <main>{Component}</main>;
};

export default Page;
