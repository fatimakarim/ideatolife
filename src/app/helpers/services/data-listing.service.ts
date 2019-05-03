import {Injectable, Injector} from "@angular/core";
import {User} from "../models/User";
import {BaseNetworkService} from "./base-network.service";
import {UserService} from "./user.service";
import "rxjs/add/observable/of";
import {ApiResponseInterface} from "../interfaces/api-response.interface";

@Injectable()
export class DataListingService extends BaseNetworkService {

  loggedInUser: User = new User();

  constructor(private injector: Injector, private userService: UserService) {
    super(injector);
    this.loggedInUser = this.userService.user;
  }

  /**
   * The following method is used to get the listing data for all the listing with pagination
   * @param {string} apiLink
   * @param {number} pageNo
   * @param extraParams
   * @returns {Observable<Object>}
   */
  public getDataListing(apiLink: string, pageNo?: number, extraParams?: any) {
      let body = "?page=0";
      // if pageNo is set then only set , else ignore setting it to the body
      if (pageNo) {
          body = "?page=" + pageNo;
      }
      // if extra param is set then iterate over it and set all the incoming searchParams with the respective data listing API
      // it also makes sure no undefined or null values are sent with the input searchParams
      if (extraParams) {
          for (const extraParam of extraParams) {
              if (extraParam.value) {
                  body += "&" + extraParam.key + "=" + extraParam.value;
              }
          }
      }

      return this.http
          .post<ApiResponseInterface>(apiLink,
              body, {
              headers: this.headers
          });
  }
}
