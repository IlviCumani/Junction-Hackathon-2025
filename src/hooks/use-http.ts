import { useState, useCallback } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import StorageManager from "@/models/StorageManager";

type RequestHeaders = Record<string, string>;

const ENDPOINT = "http://127.0.0.1:8001/main/";

console.log("ENDPOINT", ENDPOINT);

type RequestConfigType<T> = {
	endpoint: string;
	method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	headers?: RequestHeaders;
	body?: T;
};

type BackendErrorDetails = {
	errorDetails?: {
		message?: string;
		statusCode?: number;
		error?: string;
	};
};

export type sendRequestType<T> = (
	requestConfig: RequestConfigType<T>,
	applyData?: (data: T) => void,
) => void;

type UseHttpReturnType = {
	isLoading: boolean;
	errorMessage: {
		message: string;
		statusCode: number;
		statusMessage: string;
	} | null;
	sendRequest: <T>(requestConfig: RequestConfigType<T>, applyData?: (data: T) => void) => void;
};

export function useHttp(): UseHttpReturnType {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<{
		message: string;
		statusCode: number;
		statusMessage: string;
	} | null>(null);

	const authToken = StorageManager.getItem("authToken");
	const sendRequest = useCallback(
		<T>(requestConfig: RequestConfigType<T>, applyData?: (data: T) => void): void => {
			const execute = async () => {
				setIsLoading(true);
				setError(null);

				const axiosConfig: AxiosRequestConfig = {
					url: `${ENDPOINT}${requestConfig.endpoint}`,
					method: requestConfig.method || "GET",
					headers: {
						"Content-Type": "application/json",
						...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
						...requestConfig.headers,
					},
					data: requestConfig.body,
				};

				try {
					const response: AxiosResponse = await axios(axiosConfig);

					if (applyData) {
						applyData(response.data);
					}
				} catch (err: unknown) {
					const error = err as AxiosError<BackendErrorDetails>;
					const res = error.response;
					const defaultMessage = "Something went wrong";

					const message = res?.data?.errorDetails?.message || defaultMessage;
					const statusCode = res?.data?.errorDetails?.statusCode || res?.status || 500;
					const statusMessage = res?.data?.errorDetails?.error || error.message;

					setError({ message, statusCode, statusMessage });

					console.error(err);
				} finally {
					setIsLoading(false);
				}
			};

			execute();
		},
		[authToken],
	);

	return {
		isLoading,
		errorMessage: error,
		sendRequest,
	};
}

useHttp.POST = <T>(endpoint: string, body: T, headers?: RequestHeaders) => ({
	endpoint,
	method: "POST" as const,
	body,
	headers,
});

useHttp.POST_FORM = (endpoint: string, body: FormData, headers?: RequestHeaders) => ({
	endpoint,
	method: "POST" as const,
	body,
	headers: {
		"Content-Type": "multipart/form-data",
		...headers,
	},
});

useHttp.POST_FILE = (endpoint: string, body: File, headers?: RequestHeaders) => ({
	endpoint,
	method: "POST" as const,
	body,
	headers: {
		"Content-Type": "application/octet-stream",
		...headers,
	},
});

useHttp.DELETE = (endpoint: string, headers?: RequestHeaders) => ({
	endpoint,
	method: "DELETE" as const,
	headers,
});

useHttp.PATCH = <T>(endpoint: string, body: T, headers?: RequestHeaders) => ({
	endpoint,
	method: "PATCH" as const,
	body,
	headers,
});

useHttp.PUT = <T>(endpoint: string, body: T, headers?: RequestHeaders) => ({
	endpoint,
	method: "PUT" as const,
	body,
	headers,
});

useHttp.GET = (endpoint: string, headers?: RequestHeaders) => ({
	endpoint,
	method: "GET" as const,
	headers: {
		...headers,
	},
});
