import Home from "../containers/Home";
import Pools from "../containers/Pools";
import Farms from "../containers/Farms";
import Conversion from "../containers/Conversion";

export const routes = [
  {
    path: "/pools",
    component: Pools,
    exact: true,
  },
  {
    path: "/farms",
    component: Farms,
    exact: true,
  },
  {
    path: "/conversion",
    component: Conversion,
    exact: true,
  },
  {
    path: "/",
    component: Home,
    exact: true,
  },
];

export default routes;
