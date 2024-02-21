import { createRouter } from "@storeon/router";

export default createRouter([
  ["/", () => ({ page: "home" })],
  ["/games", () => ({ page: "games" })],
  ["/players", () => ({ page: "players" })],
  ["/teams", () => ({ page: "teams" })],
  ["/addteams", () => ({ page: "addteams" })], 
]);
