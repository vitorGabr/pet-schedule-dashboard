import { deleteCookie, getCookie } from "@/utils/cookie";
import Axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { toast } from "sonner";

export const AXIOS_INSTANCE = Axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

AXIOS_INSTANCE.interceptors.request.use((config) => {
	const cookie = getCookie("token");
	if (cookie) {
		config.headers.Authorization = `Bearer ${cookie}`;
	}
	return config;
});

AXIOS_INSTANCE.interceptors.response.use(
	(response) => response,
	(error) => {
		const url = error.config?.url;
		const status = error.response?.status;

		if (
			(status === 401 || status === 403) &&
			url &&
			!url.includes("/auth/sign-in")
		) {
			deleteCookie("token");
			window.location.href = "/sign-in";
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
