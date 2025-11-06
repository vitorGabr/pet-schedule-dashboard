import { ptBR } from "@clerk/localizations";
import { useSignIn } from "@clerk/tanstack-react-start";
import { toast } from "sonner";
import { SignInBody } from "@/schemas/sign-in";

const ptBRErrorMessages = ptBR.unstable__errors;
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
				const errorCode = error.errors?.[0]?.code as string;
				if (errorCode) {
					const message = translateError(errorCode);
					toast.error(message);
				}
			});
	};

	function translateError(errorCode: string) {
		const errorMsg =
			ptBRErrorMessages?.[errorCode as keyof typeof ptBRErrorMessages];
		if (typeof errorMsg === "string") {
			return errorMsg;
		}

		return "Erro desconhecido. Tente novamente.";
	}

	return { make: makeSignIn };
};
