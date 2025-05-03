import { lazy } from "react";
import { ProjectRoutes } from "@/models/ProjectRoutes";

const CustomerPages = {
	Layout: lazy(() => import("./Layout")),
	Home: lazy(() => import("./Home")),
	Menu: lazy(() => import("./Menu")),
	Delivery: lazy(() => import("./Delivery")),
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
	routeElement: <CustomerPages.Delivery />,
});

function appendSubRoutes(): void {
	CustomerRoot.addChildrenRoute(HomeRoute);
	CustomerRoot.addChildrenRoute(MenuRoute);
	CustomerRoot.addChildrenRoute(GiftRoute);
	CustomerRoot.addChildrenRoute(LoyaltyRoute);
	CustomerRoot.addChildrenRoute(DeliveryRoute);
	CustomerRoot.addChildrenRoute(ProfileRoute);
}

export { CustomerRoot, HomeRoute, DeliveryRoute, MenuRoute, ProfileRoute, appendSubRoutes };
