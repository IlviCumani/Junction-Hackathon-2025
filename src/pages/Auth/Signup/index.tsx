import Form from "@/components/Form";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { Link } from "react-router-dom";
import { SignUpRoute } from "../index.route";

export default function SignupPage() {
	const form = Form.useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});
	function handleSubmit(values: { email: string; password: string }) {
		console.log("Form submitted with values:", values);
	}

	useDocumentTitle(SignUpRoute.getRouteName() || "Login");

	return (
		<>
			<CardHeader className="flex flex-col items-center gap-8">
				<CardTitle>Sign Up</CardTitle>
			</CardHeader>
			<CardContent>
				<Form form={form} onSubmit={handleSubmit}>
					<div className="flex flex-col gap-4">
						<Form.Input name="email" label="Email" type="email" required />
						<Form.Input name="password" label="Password" type="password" required />
						<Form.Select name="role" label="Role" required options={[]} />

						<Button type="submit" className="w-full">
							Sign Up
						</Button>
					</div>
				</Form>
			</CardContent>
			<CardFooter className="flex flex-col items-center gap-4">
				<p className="text-sm text-center">
					Already have an account?
					<Button variant={"link"} className="pl-2">
						<Link to={"/"}>Login</Link>
					</Button>
				</p>
			</CardFooter>
		</>
	);
}
