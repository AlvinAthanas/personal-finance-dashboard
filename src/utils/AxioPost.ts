import axios from "axios";
import {BASE_URL} from "./BaseUrl.ts";

const postData = async (
    url: string,
    data: any,
    token: string,
    bearer_token?: string | null,
    setAuthenticated?: (isAuthenticated: boolean) => void,
    setToken?: (token: string) => void,
    setBearerToken?: (token: string) => void
) => {
    try {
        const headers: Record<string, string> = {
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": token,
            Accept: "application/json",
        };

        if (!(data instanceof FormData)) {
            headers["Content-Type"] = "application/json";
        }

        if (bearer_token) {
            headers["Authorization"] = `Bearer ${bearer_token}`;
        }

        const response = await axios.post(url, data, {
            headers: headers,
            withCredentials: true,
        });

        const responseData = response.data as {
            access?: string;
            csrf_token?: string;
        };
        if (responseData.access) {
            responseData?.access && setBearerToken?.(responseData.access);
            setAuthenticated?.(true);
        }

        return { status: true, response: responseData };
    } catch (error: any) {
        if (error.response.status === 403 || error.response.status === 401) {
            try {
                const refreshResponse = await axios.post(
                    `${BASE_URL}/token-refresh`,
                    {},
                    { withCredentials: true }
                );

                const { access_token: newAccessToken, csrf_token: newCsrfToken } =
                    refreshResponse.data as {
                        access_token?: string;
                        csrf_token?: string;
                    };

                if (setToken && setBearerToken && newAccessToken && newCsrfToken) {
                    setToken(newCsrfToken);
                    setBearerToken(newAccessToken);
                    const retryResponse = await axios.post(url, data, {
                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                            "X-CSRFToken": newCsrfToken,
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: `Bearer ${newAccessToken}`,
                        },
                        withCredentials: true,
                    });
                    return { status: true, response: retryResponse.data };
                }
            } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
            }
        }

        if (error.response) {
            return {
                status: false,
                error:
                    error.response.data.detail ||
                    error.response.data.message ||
                    error.response.data.error,
            };
        }
        return { status: false, error: error.message };
    }
};

export default postData;