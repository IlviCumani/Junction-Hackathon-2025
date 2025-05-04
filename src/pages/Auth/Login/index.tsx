import Form from "@/components/Form";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { SignUpRoute } from "../index.route";
import { LoginRoute } from "../index.route";
import { useHttp } from "@/hooks/use-http";
import { useAuthContext } from "@/context/AuthContext";

export default function LoginPage() {
	const form = Form.useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const { isLoading, sendRequest } = useHttp();
	const { login } = useAuthContext();
	const navigate = useNavigate();

	function handleSubmit(values: { email: string; password: string }) {
		sendRequest(useHttp.POST("login/", values), (response: any) => {
			const type: any = login(response);
			console.log(type);

			if (type === "Admin") {
				window.location.href = "https://preview--java-bean-admin-panel.lovable.app/";
				return;
			}
			if (type === "Bartender") {
				navigate("/staff");
				return;
			}
			navigate("/");
		});
	}

	useDocumentTitle(LoginRoute.getRouteName() || "Login");

	return (
		<>
			<CardHeader className="flex flex-col items-center gap-8">
				<CardTitle>Login</CardTitle>
			</CardHeader>
			<CardContent>
				<Form form={form} onSubmit={handleSubmit}>
					<div className="flex flex-col gap-4">
						<Form.Input name="email" label="Email" type="email" required />
						<Form.Input name="password" label="Password" type="password" required />

						<Button type="submit" className="w-full" loading={isLoading}>
							Login
						</Button>
					</div>
				</Form>
			</CardContent>
			<CardFooter className="flex flex-col items-center gap-4">
				<p className="text-sm text-center">
					Don't have an account?
					<Button variant={"link"} className="pl-2">
						<Link to={SignUpRoute.getExactPath()}>Create Account</Link>
					</Button>
				</p>
			</CardFooter>
		</>
	);
}
