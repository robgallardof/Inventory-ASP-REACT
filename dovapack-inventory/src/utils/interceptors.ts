import axios from "axios";
import { obtainToken } from "../auth/manageJWT";

export function configurateInterceptor(){
    axios.interceptors.request.use(
        function (config){
            const token = obtainToken();
            if (token){
                config.headers!.Authorization  = `Bearer ${token}`;
            }

            return config;
        },
        function (error){
            return Promise.reject(error);
        }
    )
}