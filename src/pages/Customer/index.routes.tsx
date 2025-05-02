import { lazy } from "react";
import { ProjectRoutes } from "@/models/ProjectRoutes";

const CustomerPages = {
	Layout: lazy(() => import("./Layout")),
	Home: lazy(() => import("./Home")),
	Menu: lazy(() => import("./Menu")),
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



function appendSubRoutes(): void {
	CustomerRoot.addChildrenRoute(HomeRoute);
	CustomerRoot.addChildrenRoute(MenuRoute);
}

export { CustomerRoot, HomeRoute, appendSubRoutes };
