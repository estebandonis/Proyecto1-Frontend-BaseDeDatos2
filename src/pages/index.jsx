import { useStoreon } from "storeon/react";
import { default as Home } from "./Home";
import { default as Games } from "./Games";
import { default as Players } from "./Players";
import { default as Teams } from "./Teams";
import { default as AddTeams } from "./AddTeams";
import { default as UpdateTeams } from "./UpdateTeams";
import { routerKey } from "@storeon/router";

const Page = () => {
  const { [routerKey]: route } = useStoreon(routerKey);

  let Component = null;
  switch (route.match.page) {
    case "home":
      Component = <Home />;
      break;
    case "games":
      Component = <Games />;
      break;
    case "players":
      Component = <Players />;
      break;
    case "teams":
      Component = <Teams />;
      break;
    case "addteams":
      Component = <AddTeams />;
      break;
    case "updateteam":
      Component = <UpdateTeams teamId={route.match.id} />;
        break;
    default:
      Component = <h1>404 Error</h1>;
  }

  return <main>{Component}</main>;
};

export default Page;
