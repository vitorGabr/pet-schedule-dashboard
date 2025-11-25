import Axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { getServerCookie } from "@/utils/get-server-cookie";
import { signOut } from "@/utils/sign-out";

export const AXIOS_INSTANCE = Axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
});

AXIOS_INSTANCE.interceptors.request.use(async (config) => {
	const token = await getServerCookie();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

AXIOS_INSTANCE.interceptors.response.use(
	(response) => response,
	async (error) => {
		const status = error.response?.status;
		if ([401, 403].includes(status)) {
			await signOut();
			history.replaceState(null, "", "/sign-in");
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
