import { lazy } from "react";
import { ProjectRoutes } from "@/models/ProjectRoutes";

const CustomerPages = {
  Layout: lazy(() => import("./Layout")),
  Home: lazy(() => import("./Home")),
  Menu: lazy(() => import("./Menu")),
  Gift: lazy(() => import("./Gift")),
  Loyalty: lazy(() => import("./Loyalty")),
};

const CustomerRoot = new ProjectRoutes({
  routePath: "",
  routeElement: <CustomerPages.Layout />,
});

const HomeRoute = new ProjectRoutes({
  routeName: "Home",
  routePath: "",
  routeElement: <CustomerPages.Home />,
});

const MenuRoute = new ProjectRoutes({
  routeName: "Menu",
  routePath: "menu",
  routeElement: <CustomerPages.Menu />,
});

const GiftRoute = new ProjectRoutes({
  routeName: "Gift",
  routePath: "gift",
  routeElement: <CustomerPages.Gift />,
});

const LoyaltyRoute = new ProjectRoutes({
  routeName: "Loyalty",
  routePath: "loyalty",
  routeElement: <CustomerPages.Loyalty />,
});

function appendSubRoutes(): void {
  CustomerRoot.addChildrenRoute(HomeRoute);
  CustomerRoot.addChildrenRoute(MenuRoute);
  CustomerRoot.addChildrenRoute(GiftRoute);
  CustomerRoot.addChildrenRoute(LoyaltyRoute);
}

export { CustomerRoot, HomeRoute, appendSubRoutes };
