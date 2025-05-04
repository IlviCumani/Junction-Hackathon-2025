import { lazy } from "react";
import { ProjectRoutes } from "@/models/ProjectRoutes";

const CustomerPages = {
	Layout: lazy(() => import("./Layout")),
	Home: lazy(() => import("./Home")),
	Menu: lazy(() => import("./Menu")),
	Delivery: lazy(() => import("./Delivery")),
	Gift: lazy(() => import("./Gift")),
	Loyalty: lazy(() => import("./Loyalty")),
	Profile: lazy(() => import("./Profile")),
	Bartender: lazy(() => import("./Bartender")),
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

const DeliveryRoute = new ProjectRoutes({
	routeName: "Delivery",
	routePath: "delivery",
	routeElement: <CustomerPages.Delivery />,
	needsAuthentication: true,
});

const ProfileRoute = new ProjectRoutes({
	routeName: "Profile",
	routePath: "profile",
	needsAuthentication: true,
	routeElement: <CustomerPages.Profile />,
});

const BartenderRoute = new ProjectRoutes({
	routeName: "Bartender",
	routePath: "bartender",
	routeElement: <CustomerPages.Bartender />,
	needsAuthentication: false,
});

function appendSubRoutes(): void {
	CustomerRoot.addChildrenRoute(HomeRoute);
	CustomerRoot.addChildrenRoute(MenuRoute);
	CustomerRoot.addChildrenRoute(GiftRoute);
	CustomerRoot.addChildrenRoute(LoyaltyRoute);
	CustomerRoot.addChildrenRoute(DeliveryRoute);
	CustomerRoot.addChildrenRoute(ProfileRoute);
	CustomerRoot.addChildrenRoute(BartenderRoute);
}

export { CustomerRoot, HomeRoute, DeliveryRoute, MenuRoute, ProfileRoute, appendSubRoutes };
