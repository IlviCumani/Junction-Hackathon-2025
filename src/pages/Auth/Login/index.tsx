import Form from "@/components/Form";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { SignUpRoute } from "../index.route";
import { LoginRoute } from "../index.route";
import { useHttp } from "@/hooks/use-http";
export default function LoginPage() {
	const form = Form.useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const { isLoading, sendRequest } = useHttp();

	function handleSubmit(values: { email: string; password: string }) {
		console.log("Form submitted with values:", values);

		sendRequest(useHttp.POST("login/", values), () => {
			console.log("Login successful");
			// Handle successful login (e.g., redirect to dashboard)
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

						<Button type="submit" className="w-full">
							Login
						</Button>
					</div>
				</Form>
			</CardContent>
			<CardFooter className="flex flex-col items-center gap-4">
				<p className="text-sm text-center">
					Don't have an account?
					<Button variant={"link"} className="pl-2" loading={isLoading}>
						<Link to={SignUpRoute.getExactPath()}>Create Account</Link>
					</Button>
				</p>
			</CardFooter>
		</>
	);
}
