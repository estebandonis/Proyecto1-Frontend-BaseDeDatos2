import { storeonDevtools } from "storeon/devtools";
import { createStoreon } from "storeon";
// import { persistState } from "@storeon/localstorage";
import router from "./router";
import { routerKey, routerNavigate } from "@storeon/router";

const store = createStoreon([router, storeonDevtools]);

const navigate = (target) => {
  console.log("NAVIGATING TO", target);
  store.dispatch(routerNavigate, target);
};

export { navigate };
export default store;
