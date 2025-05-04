import { ProjectRoutes } from "@/models/ProjectRoutes";
import { Suspense } from "react";
import Loader from "./components/Shared/Loader/Loader";
import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";

import Root from "./pages/index.routes";

function iterateRoutes(root: ProjectRoutes): RouteObject {
	const isIndex = root.getIsIndex() && root.getSubRoutes().length === 0;

	if (isIndex) {
		return {
			index: true,
			element: (
				<Suspense fallback={<Loader className="h-screen" />}>
					{root.getRouteElement()}
				</Suspense>
			),
		};
	}

	return {
		path: root.getRoutePath(),
		element: (
			<Suspense fallback={<Loader className="h-screen" />}>{root.getRouteElement()}</Suspense>
		),
		children: root.getSubRoutes().map((child: ProjectRoutes) => iterateRoutes(child)),
	};
}

console.log(Root.getSubRoutes());

function App() {
	const routes = [iterateRoutes(Root)];

	const BrowserRouter = createBrowserRouter(routes);

	return <RouterProvider router={BrowserRouter} />;
}

export default App;
