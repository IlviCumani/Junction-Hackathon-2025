import { lazy } from "react";
import { ProjectRoutes } from "@/models/ProjectRoutes";

const AuthPages = {
	Layout: lazy(() => import("./Layout/index")),
	Login: lazy(() => import("./Login/index")),
	Register: lazy(() => import("./Signup")),
	ForgotPassword: lazy(() => import("./ForgetPassword")),
};

const AuthRoot = new ProjectRoutes({
	routePath: "auth",
	routeElement: <AuthPages.Layout />,
});

const LoginRoute = new ProjectRoutes({
	routeName: "Login",
	routePath: "login",
	routeElement: <AuthPages.Login />,
});

const SignUpRoute = new ProjectRoutes({
	routeName: "Sign Up",
	routePath: "sign-up",
	routeElement: <AuthPages.Register />,
});

const ForgetPasswordRoute = new ProjectRoutes({
	routeName: "Forget Password",
	routePath: "forget-password",
	routeElement: <AuthPages.ForgotPassword />,
});

function appendSubRoutes(): void {
	AuthRoot.addChildrenRoute(LoginRoute);
	AuthRoot.addChildrenRoute(SignUpRoute);
	AuthRoot.addChildrenRoute(ForgetPasswordRoute);
}

export { AuthRoot, LoginRoute, SignUpRoute, ForgetPasswordRoute, appendSubRoutes };
