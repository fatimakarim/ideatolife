import { Injectable, Injector } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import * as API_LIST from "../constants/apis-list";
import * as CONSTANT_LIST from "../constants/constant-list";
import * as ROUTE_LIST from "../constants/routes-list";
import { Observable } from "rxjs/Rx";
import "rxjs/add/observable/of";
import { User } from "../models/User";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DataService } from "../../theme-core/services";
import { SharedDataService } from "./shared-data.service";

declare let Fingerprint2: any;


@Injectable()
export class BaseNetworkService {

    protected cookieService: CookieService;
    protected dataService: DataService;
    protected router: Router;
    protected http: HttpClient;
    protected constantList = CONSTANT_LIST;
    protected apiList = API_LIST;
    protected routeList = ROUTE_LIST;
    public user: User;
    private _headers: HttpHeaders;
    private _formDataHeaders: HttpHeaders;

    constructor(injector: Injector) {

        this.cookieService = injector.get(CookieService);
        this.dataService = injector.get(DataService);
        this.router = injector.get(Router);
        this.http = injector.get(HttpClient);
        // First generating the unique fingerprint of the current device
        new Fingerprint2().get((result, components) => {
            this.initHeaders(result);
            this.initFormDataHeaders(result);
            this.cookieService.set("gpulse_x_uuid", result, null, "/");
            this._headers = this._headers.set("x-device-uuid", result);
            this._formDataHeaders = this._formDataHeaders.set("x-device-uuid", result);
            if (this.cookieService.get("gpulse_token")) {
                this._headers = this._headers.set("Authorization", `Bearer ${this.cookieService.get("gpulse_token")}`);
                this._headers = this._headers.set("access-token", this.cookieService.get("gpulse_token"));
                this._headers = this._headers.set("x-device-id", this.cookieService.get("gpulse_x_id"));
                this._headers = this._headers.set("x-device-uuid", this.cookieService.get("gpulse_x_uuid"));

                this._formDataHeaders = this._formDataHeaders.set("Authorization", `Bearer ${this.cookieService.get("gpulse_token")}`);
                this._formDataHeaders = this._formDataHeaders.set("access-token", this.cookieService.get("gpulse_token"));
                this._formDataHeaders = this._formDataHeaders.set("x-device-id", this.cookieService.get("gpulse_x_id"));
                this._formDataHeaders = this._formDataHeaders.set("x-device-uuid", this.cookieService.get("gpulse_x_uuid"));
            }
        });
    }

    /**
     * the following method is used to initialize headers for users
     */
    initHeaders(result): void {
        // HttpHeader class are immutable objects.
        this._headers = new HttpHeaders()
            .set("Content-Type", "application/x-www-form-urlencoded")
            .set("Accept", "*/*")
            .set("Authorization", `Bearer ${this.cookieService.get("gpulse_token")}`)
            .set("access-token", this.cookieService.get("gpulse_token"))
            .set("x-device-id", this.cookieService.get("gpulse_x_id"))
            .set("x-device-uuid", result ? result : this.cookieService.get("gpulse_x_uuid"));
    }

    /**
     * the following method is used to initialize headers for form render
     */
    initFormDataHeaders(result): void {
        // HttpHeader class are immutable objects.
        this._formDataHeaders = new HttpHeaders()
            .set("Accept", "*/*")
            .set("Authorization", `Bearer ${this.cookieService.get("gpulse_token")}`)
            .set("access-token", this.cookieService.get("gpulse_token"))
            .set("x-device-id", this.cookieService.get("gpulse_x_id"))
            .set("x-device-uuid", result ? result : this.cookieService.get("gpulse_x_uuid"));
    }

    /**
     * the following method is used to get the updated token
     */
    updateToken(): void {
        const token = this.cookieService.get("gpulse_token");
        if (token) {
            this._headers = this._headers.set("Authorization", `Bearer ${token}`)
                .set("access-token", this.cookieService.get("gpulse_token"));
            this._formDataHeaders = this._formDataHeaders.set("Authorization", `Bearer ${token}`)
                .set("access-token", this.cookieService.get("gpulse_token"));
        }
    }

    /**
     * The following method is used to update the headers
     */
    get headers(): HttpHeaders {
        if (!this._headers) {
            this.initHeaders(null);
        }

        const token = this.cookieService.get("gpulse_token");
        if (token && !this._headers.get("Authorization")) {
            this._headers = this._headers.set("Authorization", `Bearer ${token}`)
                .set("access-token", this.cookieService.get("gpulse_token"));
        }

        return this._headers;
    }

    set headers(value: HttpHeaders) {
        this._headers = value;
    }

    get formDataHeaders(): HttpHeaders {
        if (!this._formDataHeaders) {
            this.initFormDataHeaders(null);
        }

        const token = this.cookieService.get("gpulse_token");
        if (token && !this._formDataHeaders.get("Authorization")) {
            this._formDataHeaders = this._formDataHeaders.set("Authorization", `Bearer ${token}`)
                .set("access-token", this.cookieService.get("gpulse_token"));
        }

        return this._formDataHeaders;
    }

    set formDataHeaders(value: HttpHeaders) {
        this._formDataHeaders = value;
    }

    /**
     * The following method converts
     * @param json
     * @returns {any}
     */
    parseResponse(json: any): any {
        // just type casting the response object into type of any so that we dont get any error or warning in IDE for accessing properties statically
        return <any>json;
    }

    /**
     * The following method is used to check whether the request was unauthorised or not
     * @param error
     */
    isRequestUnauthorized(error) {
        if (error.status === 401) {
            this.router.navigateByUrl("/auth/login").then(() => {
                this.cookieService.deleteAll();
            });
        }
    }

    /**
     * The following method is used to get the error messages from the response
     * @param json
     * @returns {Promise<any>}
     */
    getErrorMessages(json) {
        return new Promise((resolve, reject) => {
            const errors = [];
            Observable.range(0, Object.keys(json.data.errors).length).subscribe(
                (index) => {
                    // the following first gets the all the Keys in the errors,
                    // then based on the current index of iteration gets the respective error key value pair
                    errors.push(json.data.errors[Object.keys(json.data.errors)[index]]);
                },
                (err) => {
                    reject(err);
                },
                () => {
                    resolve(errors);
                });
        });
    }

    rejectErrorMessages(errorData, reject) {
        this.getErrorMessages(errorData.error).then((errorsArray) => {
            // if errorsArray returned, give it back to the component
            if (errorsArray) {
                reject(errorsArray);
            }
        });
    }

}
