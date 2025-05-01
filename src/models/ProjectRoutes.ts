import { ReactNode } from "react";

interface ProjectRoutesProps {
	routeName?: string;
	routePath: string;
	routeElement: ReactNode;
	icon?: ReactNode;
}

export class ProjectRoutes {
	private routeName?: string;
	private routePath: string;
	private routeElement: ReactNode;
	private exactPath: string;
	private icon?: ReactNode;
	private subRoutes: ProjectRoutes[] = [];
	private isIndex: boolean;

	constructor({ routeName, routePath, routeElement, icon }: ProjectRoutesProps) {
		this.routeName = routeName;
		this.routePath = routePath;
		this.routeElement = routeElement;
		this.exactPath = routePath;
		this.icon = icon;
		this.isIndex = false;
	}

	getRouteName(): string | undefined {
		return this.routeName;
	}

	getRoutePath(): string {
		return this.routePath;
	}

	getRouteElement(): ReactNode {
		return this.routeElement;
	}

	getExactPath(): string {
		return this.exactPath;
	}

	getIcon(): ReactNode {
		return this.icon;
	}

	getSubRoutes(): ProjectRoutes[] {
		return this.subRoutes;
	}

	getSubRoutesElement(): ProjectRoutes[] {
		return this.subRoutes.slice(1);
	}

	getIsIndex(): boolean {
		return this.isIndex;
	}

	setExactPath(exactPath: string): void {
		this.exactPath = exactPath;
	}

	setIsIndex(isIndex: boolean): void {
		this.isIndex = isIndex;
	}

	addChildrenRoute(route: ProjectRoutes): void {
		if (route.getSubRoutes().length > 0) {
			throw new Error(
				`${route.getRouteName()} has children routes. Append ${route.getRouteName()} as a child of another path before assigning children to it.`,
			);
		}

		if (this.subRoutes.length === 0) {
			//? If the parent route has no children, then the first child route is the index route
			route.setIsIndex(true);
			route.setExactPath(this.getExactPath());
			this.subRoutes.push(route);
			return;
		}

		this.subRoutes.push(route);

		if (route.getRoutePath() === "") {
			return;
		}

		route.setExactPath(`${this.getExactPath()}/${route.getRoutePath()}`);
	}

	findActiveRouteChild(path: string): ProjectRoutes | undefined {
		for (const route of this.subRoutes) {
			if (route.getExactPath() === path) {
				return route;
			}

			const activeChild = route.findActiveRouteChild(path);
			if (activeChild) {
				return activeChild;
			}
		}

		return undefined;
	}
}
