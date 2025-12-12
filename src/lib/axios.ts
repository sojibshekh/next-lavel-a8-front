
import axios, { AxiosRequestConfig } from "axios"

const baseURL = process.env.NEXT_PUBLIC_API_URL
if (!baseURL) {
    throw new Error("NEXT_PUBLIC_API_URL environment variable is not set")
}



const axiosInterceptor = axios.create({
    baseURL,
    withCredentials: true,
})

// Add token automatically if stored in localStorage
axiosInterceptor.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
)




let isRefreshing = false;

let pendingQueue: {
    resolve: (value: unknown) => void;
    reject: (value: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
    pendingQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(null);
        }
    });

    pendingQueue = [];
};

// Response interceptor for token refresh and error handling
axiosInterceptor.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        // console.log("Request failed", error.response.data.message);

        const originalRequest = error.config as AxiosRequestConfig & {
            _retry: boolean;
        };

        if (
            error.response.status === 500 &&
            error.response.data.message === "jwt expired" &&
            !originalRequest._retry
        ) {
            console.log("Your token is expired");

            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    pendingQueue.push({ resolve, reject });
                })
                    .then(() => axiosInterceptor(originalRequest))
                    .catch((error) => Promise.reject(error));
            }

            isRefreshing = true;
            try {
                const res = await axiosInterceptor.post("/auth/refresh-token");
                console.log("New Token arrived", res);

                processQueue(null);

                return axiosInterceptor(originalRequest);
            } catch (error) {
                processQueue(error);
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        }

        //* For Everything
        return Promise.reject(error);
    }
);

// ==================== HEALTH CHECK ====================


export default axiosInterceptor;