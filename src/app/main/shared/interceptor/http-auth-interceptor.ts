import { HttpInterceptorFn } from "@angular/common/http";
import { AuthStoreService } from "../services/auth-store-service";
import { inject } from "@angular/core";

export const HttpAuthInterceptor : HttpInterceptorFn = (req,next) => {
    const authStoreService = inject(AuthStoreService);

    const token = authStoreService.getToken();

    if(!token || req.url.includes("/login")) {
        return next(req);
    } else {
        const cloneRequest = req.clone({
            setHeaders : {
                Authorization : `Bearer ${token}`
            }
        })

        return next(cloneRequest);
    }
}