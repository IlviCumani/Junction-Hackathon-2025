import { AuthRoot, appendSubRoutes as appendAuthSubroutes } from "./Auth/index.route";
import { ProjectRoutes } from "@/models/ProjectRoutes";
import { Outlet } from "react-router-dom";

const Root = new ProjectRoutes({
	routePath: "",
	routeElement: <Outlet></Outlet>,
});

Root.addChildrenRoute(AuthRoot);

appendAuthSubroutes();

export default Root;
