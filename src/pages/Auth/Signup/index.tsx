import Form from "@/components/Form";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { Link, useNavigate } from "react-router-dom";
import { SignUpRoute, LoginRoute } from "../index.route";
import { useAuthContext } from "@/context/AuthContext";
import { useHttp } from "@/hooks/use-http";
import moment from "moment";

export default function SignupPage() {
	const form = Form.useForm({
		defaultValues: {
			email: "",
			password: "",
			first_name: "",
			last_name: "",
			phone_number: "",
			birthday: new Date(),
		},
	});
	const { login } = useAuthContext();
	const { isLoading, sendRequest } = useHttp();
	const navigate = useNavigate();

	function handleSubmit(values: {
		email: string;
		password: string;
		first_name: string;
		last_name: string;
		phone_number: string;
		birthday: Date;
	}) {
		const { birthday, ...rest } = values;
		const formattedBirthday = moment(birthday).format("YYYY-MM-DD");

		sendRequest(
			useHttp.POST("create/user/", {
				...rest,
				birthday: formattedBirthday,
			}),
			() => {
				navigate(LoginRoute.getExactPath());
			},
		);
	}

	useDocumentTitle(SignUpRoute.getRouteName() || "Sign Up");

	return (
		<>
			<CardHeader className="flex flex-col items-center gap-8">
				<CardTitle>Sign Up</CardTitle>
			</CardHeader>
			<CardContent>
				<Form form={form} onSubmit={handleSubmit}>
					<div className="flex flex-col gap-4">
						<Form.Input name="first_name" label="First Name" required />
						<Form.Input name="last_name" label="Last Name" required />
						<Form.Input name="email" label="Email" type="email" required />
						<Form.Phone name="phone_number" label="Phone" />
						<Form.Input name="password" label="Password" type="password" required />
						<Form.DatePicker name="birthday" label="Birthday" required />
						<Button type="submit" className="w-full" loading={isLoading}>
							Sign Up
						</Button>
					</div>
				</Form>
			</CardContent>
			<CardFooter className="flex flex-col items-center gap-4">
				<p className="text-sm text-center">
					Already have an account?
					<Button variant={"link"} className="pl-2">
						<Link to={LoginRoute.getExactPath()}>Login</Link>
					</Button>
				</p>
			</CardFooter>
		</>
	);
}
