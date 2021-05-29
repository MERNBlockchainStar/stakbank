import HomeIcon from "../assets/icons/home.svg";
import HomeIconActive from "../assets/icons/home-active.svg";
import PoolIcon from "../assets/icons/pie-chart.svg";
import PoolIconActive from "../assets/icons/pie-chart-active.svg";
import FarmIcon from "../assets/icons/farm.svg";
import FarmIconActice from "../assets/icons/farm-active.svg";
import ConversionIcon from "../assets/icons/sliders.svg";
import ConversionIconActive from "../assets/icons/sliders-active.svg";

export const menus = [
  {
    name: "Home",
    icon: HomeIcon,
    active: HomeIconActive,
    className: "menu-home",
    path: "/",
  },
  {
    name: "Pools",
    icon: PoolIcon,
    active: PoolIconActive,
    className: "menu-pools",
    path: "/pools",
  },
  {
    name: "Farms",
    icon: FarmIcon,
    active: FarmIconActice,
    className: "menu-farms",
    path: "/farms",
  },
  {
    name: "Conversion",
    icon: ConversionIcon,
    active: ConversionIconActive,
    className: "menu-conversion",
    path: "/conversion",
  },
];

export default menus;
