/**
 * Opções para configuração de cookies
 */
export interface CookieOptions {
	/** Número de dias até a expiração do cookie (padrão: 7) */
	days?: number;
	/** Data específica de expiração do cookie */
	expires?: Date;
	/** Caminho onde o cookie é válido (padrão: '/') */
	path?: string;
	/** Domínio onde o cookie é válido */
	domain?: string;
	/** Se o cookie deve ser enviado apenas via HTTPS */
	secure?: boolean;
	/** Política SameSite para o cookie */
	sameSite?: "Strict" | "Lax" | "None";
}

/**
 * Resultado de operações de cookie que podem falhar
 */
export type CookieResult<T> =
	| { success: true; data: T }
	| { success: false; error: string };

function isBrowserEnvironment(): boolean {
	return typeof document !== "undefined" && typeof document.cookie === "string";
}

function validateCookieName(name: string): void {
	if (!name || typeof name !== "string") {
		throw new Error("Nome do cookie deve ser uma string não vazia");
	}

	// Caracteres não permitidos em nomes de cookie
	const invalidChars = /[=;,\s]/;
	if (invalidChars.test(name)) {
		throw new Error(
			"Nome do cookie contém caracteres inválidos (=;, ou espaços)",
		);
	}
}

export function getCookie(name: string): string | null {
	try {
		validateCookieName(name);

		if (!isBrowserEnvironment()) {
			return null;
		}

		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);

		if (parts.length === 2) {
			const cookieValue = parts.pop()?.split(";").shift();
			return cookieValue ? decodeURIComponent(cookieValue) : null;
		}

		return null;
	} catch (error) {
		console.error("Erro ao recuperar cookie:", error);
		return null;
	}
}

export function setCookie(
	name: string,
	value: string,
	options: CookieOptions = {},
): CookieResult<void> {
	try {
		validateCookieName(name);

		if (!isBrowserEnvironment()) {
			return {
				success: false,
				error: "Cookies não são suportados neste ambiente",
			};
		}

		if (typeof value !== "string") {
			return { success: false, error: "Valor do cookie deve ser uma string" };
		}

		const {
			days = 7,
			expires,
			path = "/",
			domain,
			secure = false,
			sameSite = "Lax",
		} = options;

		let cookieString = `${name}=${encodeURIComponent(value)}`;

		// Definir expiração
		if (expires) {
			cookieString += `; expires=${expires.toUTCString()}`;
		} else if (days > 0) {
			const expirationDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
			cookieString += `; expires=${expirationDate.toUTCString()}`;
		}

		// Adicionar outras opções
		if (path) cookieString += `; path=${path}`;
		if (domain) cookieString += `; domain=${domain}`;
		if (secure) cookieString += "; secure";
		cookieString += `; samesite=${sameSite}`;

		// biome-ignore lint/suspicious/noDocumentCookie: <desabilitado>
		document.cookie = cookieString;

		return { success: true, data: undefined };
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Erro desconhecido";
		return { success: false, error: `Erro ao definir cookie: ${errorMessage}` };
	}
}

export function deleteCookie(
	name: string,
	path: string = "/",
	domain?: string,
): CookieResult<void> {
	return setCookie(name, "", { days: -1, path, domain });
}

export function cookieExists(name: string): boolean {
	return getCookie(name) !== null;
}

export function getAllCookies(): Record<string, string> {
	if (!isBrowserEnvironment()) {
		return {};
	}

	const cookies: Record<string, string> = {};

	document.cookie.split(";").forEach((cookie) => {
		const [name, value] = cookie.trim().split("=");
		if (name && value) {
			cookies[name] = decodeURIComponent(value);
		}
	});

	return cookies;
}

/**
 * Utilitário para trabalhar com cookies JSON
 */
export const jsonCookie = {
	/**
	 * Define um cookie com valor JSON
	 */
	set<T>(name: string, value: T, options?: CookieOptions): CookieResult<void> {
		try {
			const jsonString = JSON.stringify(value);
			return setCookie(name, jsonString, options);
		} catch {
			return { success: false, error: "Erro ao serializar valor para JSON" };
		}
	},

	/**
	 * Recupera um cookie e faz parse para JSON
	 */
	get<T>(name: string): T | null {
		const value = getCookie(name);
		if (!value) return null;

		try {
			return JSON.parse(value) as T;
		} catch (error) {
			console.error("Erro ao fazer parse do cookie JSON:", error);
			return null;
		}
	},
};
