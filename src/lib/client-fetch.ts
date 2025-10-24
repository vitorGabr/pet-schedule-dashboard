import { redirect } from "@tanstack/react-router";
import Axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { toast } from "sonner";
import { getCookie } from "@/utils/cookie";
import { getServerCookie } from "@/utils/get-server-cookie";

export const AXIOS_INSTANCE = Axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

AXIOS_INSTANCE.interceptors.request.use(async (config) => {
	const token =
		typeof window === "undefined"
			? await getServerCookie()
			: getCookie("__session");

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

AXIOS_INSTANCE.interceptors.response.use(
	(response) => response,
	(error) => {
		const status = error.response?.status;

		if ([401, 403].includes(status)) {
			throw redirect({ to: "/sign-in/$" });
		}
		if (error instanceof AxiosError) {
			if (error.code !== "ERR_CANCELED") {
				toast.error(
					error.response?.data?.message ??
						"Ocorreu um erro ao fazer a requisição",
				);
			}
		}
		return Promise.reject(error);
	},
);

export const customFetch = <T>(
	config: AxiosRequestConfig,
	options?: AxiosRequestConfig,
): Promise<T> => {
	const source = Axios.CancelToken.source();
	const promise = AXIOS_INSTANCE({
		...config,
		...options,
		cancelToken: source.token,
	}).then(({ data }) => data);

	// @ts-expect-error
	promise.cancel = () => {
		source.cancel("Query was cancelled");
	};

	return promise;
};

export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;
