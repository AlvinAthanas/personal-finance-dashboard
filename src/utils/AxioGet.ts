import axios from "axios";

const fetchData = async (
    url: string,
    bearer_token?: string | null,
    params?: Record<string, never>,
    setToken?: (token: string) => void,
    setBearerToken?: (token: string) => void
) => {
    try {
        const headers: Record<string, string> = {
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
        };

        if (bearer_token) {
            headers["Authorization"] = `Bearer ${bearer_token}`;
        }

        const response = await axios.get(url, {
            withCredentials: true,
            headers: headers,
            params: params ? JSON.parse(JSON.stringify(params)) : undefined,
        });

        return { status: true, response: response.data };
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 403 || error.response.status === 401) {
                try {
                    const refreshResponse = await axios.post(
                        `${window.location.protocol}//api.kanban.beytech.co.tz/api/token/refresh`,
                        {},
                        { withCredentials: true }
                    );

                    const data = refreshResponse.data as {
                        access_token: string;
                        csrf_token: string;
                    };
                    const newAccessToken = data.access_token;
                    const newCsrfToken = data.csrf_token;

                    if (setToken && setBearerToken && newAccessToken) {
                        setToken(newCsrfToken);
                        setBearerToken(newAccessToken);

                        const retryResponse = await axios.get(url, {
                            headers: {
                                "X-Requested-With": "XMLHttpRequest",
                                Accept: "application/json",
                                Authorization: `Bearer ${newAccessToken}`,
                            },
                            withCredentials: true,
                            params: params ? JSON.parse(JSON.stringify(params)) : undefined,
                        });

                        return { status: true, response: retryResponse.data };
                    }
                } catch (refreshError) {
                    console.error("Error refreshing token:", refreshError);
                }
            }

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

export default fetchData;
