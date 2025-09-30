import axios from "axios";

const postData = async (
    url: string,
    data: never,
    token: string,
    bearier_token?: string | null,
    setAuthenticated?: (isAuthenticated: boolean) => void,
    setToken?: (token: string) => void,
    setBearierToken?: (token: string) => void
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

        if (bearier_token) {
            headers["Authorization"] = `Bearer ${bearier_token}`;
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
            responseData?.access && setBearierToken?.(responseData.access);
            setAuthenticated?.(true);
        }

        return { status: true, response: responseData };
    } catch (error: any) {
        if (error.response.status === 403 || error.response.status === 401) {
            try {
                const refreshResponse = await axios.post(
                    `${window.location.protocol}//api.kanban.beytech.co.tz/api/token/refresh`,
                    {},
                    { withCredentials: true }
                );

                const { access_token: newAccessToken, csrf_token: newCsrfToken } =
                    refreshResponse.data as {
                        access_token?: string;
                        csrf_token?: string;
                    };

                if (setToken && setBearierToken && newAccessToken && newCsrfToken) {
                    setToken(newCsrfToken);
                    setBearierToken(newAccessToken);
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
