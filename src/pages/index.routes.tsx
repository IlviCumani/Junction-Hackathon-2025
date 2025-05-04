import { AuthRoot, appendSubRoutes as appendAuthSubroutes } from "./Auth/index.route";
import { CustomerRoot, appendSubRoutes as appendCustomerSubroutes } from "./Customer/index.routes";
import { StaffRoot, appendSubRoutes as appendStaffSubroutes } from "./Staff/index.routes";

import { ProjectRoutes } from "@/models/ProjectRoutes";
import { Outlet } from "react-router-dom";

const Root = new ProjectRoutes({
	routePath: "",
	routeElement: <Outlet></Outlet>,
});

Root.addChildrenRoute(CustomerRoot);
Root.addChildrenRoute(AuthRoot);
Root.addChildrenRoute(StaffRoot);

appendAuthSubroutes();
appendCustomerSubroutes();
appendStaffSubroutes();

export default Root;
