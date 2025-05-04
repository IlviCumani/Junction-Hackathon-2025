import { lazy } from "react";
import { ProjectRoutes } from "@/models/ProjectRoutes";

const StaffPages = {
	Layout: lazy(() => import("./Layout")),
	Bartender: lazy(() => import("./Bartender")),
};

const StaffRoot = new ProjectRoutes({
	routePath: "staff",
	routeElement: <StaffPages.Layout />,
});

const BartenderRoute = new ProjectRoutes({
	routeName: "Bartender",
	routePath: "bartender",
	routeElement: <StaffPages.Bartender />,
});

function appendSubRoutes(): void {
	StaffRoot.addChildrenRoute(BartenderRoute);
}

export { StaffRoot, BartenderRoute, appendSubRoutes };
