import { useSignIn } from "@clerk/tanstack-react-start";
import { toast } from "sonner";
import { SignInBody } from "@/schemas/sign-in";

export const useMakeSignIn = () => {
	const { signIn, setActive } = useSignIn();

	const makeSignIn = async (form: SignInBody) => {
		await signIn
			?.create({ identifier: form.email, password: form.password })
			.then(async (result) => {
				if (result.status === "complete") {
					await setActive?.({
						session: result.createdSessionId,
						redirectUrl: "/",
					});
				}
			})
			.catch((error) => {
alert(error)
				console.error("Sign-in error:", error);
				toast.error("Erro ao entrar. Verifique suas credenciais.");
			});
	};

	return { make: makeSignIn };
};
