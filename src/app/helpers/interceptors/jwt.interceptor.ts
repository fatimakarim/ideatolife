import "rxjs/add/operator/do";
import {
    HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import * as CONST_LIST from "../constants/constant-list";
import * as ROUTE_LIST from "../constants/routes-list";
import * as API_LIST from "../constants/apis-list";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {MatSnackBar} from "@angular/material";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    protected constantList = CONST_LIST;
    protected routeList = ROUTE_LIST;

    protected whiteListAPI = [];

    constructor(public router: Router, public cookieService: CookieService, public snackBar: MatSnackBar) {
        this.whiteListAPI = [
            API_LIST.LOGIN_API,
            API_LIST.FORGOT_PASSWORD,
            API_LIST.RESET_PASSWORD,
            API_LIST.CONTACT_API,
        ];
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.cookieService.get("gpulse_token");
        //const apiPath = request.url.substr(0, request.url.lastIndexOf("/"));
        const apiPath = request.url;
        const matchWhiteList: boolean = this.whiteListAPI.indexOf(apiPath) > -1;
        if (!matchWhiteList) {
            const accessParam = `${request.url.indexOf("?") > -1 ? "&" : "?"}access_token=${token}`;
            request = request.clone({
                url: `${request.url}${accessParam}`,
            });
        }
        
        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // Updating the returned token
                this.cookieService.set("gpulse_x_id", event.headers.get("x-device-id"));
                // if any response says, token not provided
                if (event.body.message === this.constantList.DEFAULT_INVALID_TOKEN_SERVER_RESPONSE ||
                    event.body.message === this.constantList.DEFAULT_INVALID_TOKEN_SIGNATURE_SERVER_RESPONSE ||
                    event.body.status == 401) {
                    this.cookieService.deleteAll();
                    this.router.navigateByUrl(this.routeList.LOGIN).then();
                    // dismiss all snack bars
                    this.snackBar.dismiss();

                }
                // do stuff with response if you want
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status == 401) {
                    this.cookieService.deleteAll();
                    this.router.navigateByUrl(this.routeList.LOGIN).then();
                    // dismiss all snack bars
                    this.snackBar.dismiss();
                }
            }
        });
    }
}
