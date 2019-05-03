import { Injectable, Injector } from "@angular/core";
import { User } from "../models/User";
import { BaseNetworkService } from "./base-network.service";
import "rxjs/add/observable/of";
import * as API_LIST from "../constants/apis-list";
import * as CryptoJS from "crypto-js";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class UserService extends BaseNetworkService {
  private loggedIn = false;

  constructor(injector: Injector) {
    super(injector);
    if (!this.user) {
      this.user = new User();
    }
    if (this.isLoggedIn()) {
      this.loggedIn = true;
    }
  }

  get(id: number | string): Promise<any> {
    let body = `business_reference_id=${id}`;

    return new Promise((resolve, reject) => {
      return this.http
      .post(`${this.apiList.GET_USER}`,
        body, {
          headers: this.headers
        })
      .subscribe(json => {
        let jsonData: any = this.parseResponse(json);
        if (jsonData.status === this.constantList.SUCCESS_STATUS) {
          resolve(jsonData.data);
        } else {
          this.getErrorMessages(jsonData).then((errorsArray) => {
            if (errorsArray) {
              reject(errorsArray);
            } else {
              reject([]);
            }
          });
        }
      }, error => {
        if (error.error.data && error.error.data.errors) {
          this.getErrorMessages(error.error).then((errorsArray) => {
            // if errorsArray returned, give it back to the component
            if (errorsArray) {
              reject(errorsArray);
            }
          });
        } else {
          reject(error);
        }
      });
    });
  }

  getRoles(): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http
      .post(`${this.apiList.GET_ROLES}?sort_key=${this.constantList.DEFAULT_SORT_KEY}&sort_order=${this.constantList.DEFAULT_SORT_ORDER}`,
        {}, {
          headers: this.headers
        })
      .subscribe(json => {
        let jsonData: any = this.parseResponse(json);
        if (jsonData.status === this.constantList.SUCCESS_STATUS) {
          resolve(jsonData.data);
        } else {
          this.getErrorMessages(jsonData).then((errorsArray) => {
            if (errorsArray) {
              reject(errorsArray);
            } else {
              reject([]);
            }
          });
        }
      }, error => {
        if (error.error.data && error.error.data.errors) {
          this.getErrorMessages(error.error).then((errorsArray) => {
              // if errorsArray returned, give it back to the component
              if (errorsArray) {
                reject(errorsArray);
              }
            });
        } else {
          reject(error);
        }
      });
    });
  }

  fetchUserData() {
    return this.user;
  }

    /**
     * The following method is used to login the user
     * @returns {Promise<any>}
     */
     loginUser(): Promise<any> {
       return new Promise((resolve, reject) => {
         this.isLoggedIn();

         const body: string = `email=${this.user.email}&password=${this.user.password}`;

         this.headers.delete("x-device-id");
         this.headers.delete("Authorization");
         this.headers.set("Content-Type", "application/json");

         return this.http
         .post(API_LIST.LOGIN_API,
           body, {
             headers: this.headers
           })
         .subscribe(json => {
           const jsonData: any = this.parseResponse(json);
           if (jsonData.response === this.constantList.SUCCESS_RESPONSE) {
             this.user = jsonData.data.user;
             this.user.id = this.user.businessReferenceId;
             this.user.role_id = this.user.roleId;
             this.user.access_token = jsonData.data.id;
             this.updateToken();
             this.setUserCookies(this.user);
             resolve(jsonData);
           } else {
             this.getErrorMessages(jsonData).then((errorsArray) => {
                // if errorsArray returned, give it back to the component
                if (errorsArray) {
                  this.loggedIn = false;
                  reject(errorsArray);
                }
              });
           }
         }, error => {
           this.rejectErrorMessages(error, reject);
         });
       });
     }

    /**
     *  The following method is used to register user
     * @returns {Promise<any>}
     */
     registerUser(): Promise<any> {
       return new Promise((resolve, reject) => {
         let body = "email=" + this.user.email;
         body += "&password=" + this.user.password;
         body += "&first_name=" + this.user.first_name;
         body += "&last_name=" + this.user.last_name;
         body += "&country_code=" + this.user.country_code;
         body += "&phone_number=" + this.user.phone_number;
         body += "&role_id=" + this.user.role_id;
         body += "&active=" + this.user.active ? "1" : "0";

         return this.http
         .post(API_LIST.REGISTER_API,
           body, {
             headers: this.headers
           })
         .subscribe(json => {
           const jsonData = this.parseResponse(json);
           if (jsonData.response === this.constantList.SUCCESS_RESPONSE) {
             const user = jsonData.data.user;
             this.user.password = "";
             this.user.userType = user.userType;
             this.user.active = user.active;
             this.user.createdAt = user.createdAt;
             this.user.id = user.businessReferenceId;
             this.user.businessReferenceId = user.businessReferenceId;
             resolve(jsonData);
           } else {
            this.getErrorMessages(jsonData).then((errorsArray) => {
                // if errorsArray returned, give it back to the component
                if (errorsArray) {
                  reject(errorsArray);
                }
              });
           }
         }, error => {
           this.rejectErrorMessages(error, reject);
         });
       });
     }

    /**
     *  The following method is used to register user
     * @returns {Promise<any>}
     */
     addUser(user: User): Promise<any> {
       return new Promise((resolve, reject) => {
          let body = "email=" + user.email;
          if (user.password) {
            body += "&password=" + user.password;
          }

          if (user.businessReferenceId) {
            body += "&business_reference_id=" + user.businessReferenceId;
          }

          body += "&first_name=" + user.first_name;
          body += "&last_name=" + user.last_name;
          //body += "&country_code=" + user.country_code;
          body += "&phone_number=" + user.phone_number;


          body += `&active=${user.active ? "1" : "0"}`;
          body += "&role_id=" + user.role.id;

          return this.http
          .post(user.businessReferenceId ? this.apiList.EDIT_USER : this.apiList.ADD_USER,
            body, {
              headers: this.headers
            })
          .subscribe(json => {
            const jsonData = this.parseResponse(json);
            if (jsonData.response === this.constantList.SUCCESS_RESPONSE) {
              resolve(jsonData);
            } else {
              this.getErrorMessages(jsonData).then((errorsArray) => {
                  // if errorsArray returned, give it back to the component
                  if (errorsArray) {
                    reject(errorsArray);
                  }
                });
            }
          }, error => {
            this.rejectErrorMessages(error, reject);
          });
        });
     }

    /**
     *  The following method is used to contact form
     * @returns {Promise<any>}
     */
     submitContactForm({ email, name, mobile_number }: { email: string, name: string, mobile_number: string }): Promise<any> {
       return new Promise((resolve, reject) => {
         let body = "email=" + email;
         body += "&name=" + name;
         body += "&mobile_number=" + mobile_number;

         return this.http
         .post(API_LIST.CONTACT_API,
           body, {
             headers: this.headers
           })
         .subscribe(json => {
           const jsonData = this.parseResponse(json);
           if (jsonData.response === this.constantList.SUCCESS_RESPONSE) {
             resolve(jsonData);
           } else {
             this.getErrorMessages(jsonData).then((errorsArray) => {
                  // if errorsArray returned, give it back to the component
                  if (errorsArray) {
                    reject(errorsArray);
                  }
                });
           }
         }, error => {
           this.rejectErrorMessages(error, reject);
         });
       });
     }

    /**
     * The following method is used to recover the password for the respective user
     * @param email
     */
     postForgotPasswordRequest(email: string): Promise<any> {
       return new Promise((resolve, reject) => {
         const body = "email=" + email;
         return this.http
         .post(API_LIST.FORGOT_PASSWORD,
           body, {
             headers: this.headers
           })
         .subscribe(json => {
           const jsonData = this.parseResponse(json);
           if (jsonData.response === this.constantList.SUCCESS_RESPONSE) {
             resolve(jsonData);
           } else {
             this.getErrorMessages(jsonData).then((errorsArray) => {
                  // if errorsArray returned, give it back to the component
                  if (errorsArray) {
                    reject(errorsArray);
                  }
                });
           }
         }, error => {
           this.rejectErrorMessages(error, reject);
         });
       });
     }

    /**
     * The following method is used to update password for the respective code owner
     * @param {email, code, password}
     */
     resetPassword({ email, code, password }: { email: string, code: string, password: string }): Promise<any> {
       return new Promise((resolve, reject) => {
         let body = "code=" + code;
         body += "&password=" + password;
         body += "&email=" + email;
         return this.http
         .post(API_LIST.RESET_PASSWORD, body, {
           headers: this.headers
         })
         .subscribe(json => {
           const jsonData = this.parseResponse(json);
           if (jsonData.response === this.constantList.SUCCESS_RESPONSE) {
             resolve(jsonData);
           } else {
             this.getErrorMessages(jsonData).then(errorsArray => {
                  // if errorsArray returned, give it back to the component
                  if (errorsArray) {
                    reject(errorsArray);
                  } else {
                    reject([]);
                  }
                });
           }
         }, error => {
           this.rejectErrorMessages(error, reject);
         });
       });
     }

    /**
     * the following method is used for logout
    */
    logout() {
      this.cookieService.deleteAll("/");
      this.loggedIn = false;
      return true;
    }

    /**
     * The following method setups up the basic user attr. based on whether user is signed IN or NOT
     * @returns {boolean}
     */
    isLoggedIn() {
       this.loggedIn = false;
       if (this.cookieService.get("gpulse_token")) {
         this.user.access_token = this.cookieService.get("gpulse_token");
         this.user.id = this.cookieService.get("gpulse_id");
         this.user.role_id = CryptoJS.AES.decrypt(
           this.cookieService.get("role_id").toString(),
           this.constantList.DEFAULT_COOKIE_ENCRYPTION_KEY
           ).toString(CryptoJS.enc.Utf8);

         this.user.businessReferenceId = CryptoJS.AES.decrypt(
           this.cookieService.get("business_reference_id").toString(),
           this.constantList.DEFAULT_COOKIE_ENCRYPTION_KEY
           ).toString(CryptoJS.enc.Utf8);

         this.user.first_name = CryptoJS.AES.decrypt(
           this.cookieService.get("first_name").toString(),
           this.constantList.DEFAULT_COOKIE_ENCRYPTION_KEY
           ).toString(CryptoJS.enc.Utf8);

         this.user.last_name = CryptoJS.AES.decrypt(
           this.cookieService.get("last_name"),
           this.constantList.DEFAULT_COOKIE_ENCRYPTION_KEY
           ).toString(CryptoJS.enc.Utf8);

         this.user.email = CryptoJS.AES.decrypt(
           this.cookieService.get("email"),
           this.constantList.DEFAULT_COOKIE_ENCRYPTION_KEY
           ).toString(CryptoJS.enc.Utf8);

         this.user.phone_number = CryptoJS.AES.decrypt(
           this.cookieService.get("phone_number"),
           this.constantList.DEFAULT_COOKIE_ENCRYPTION_KEY
           ).toString(CryptoJS.enc.Utf8);

         if (!this.user.role) {
           this.user["role"] = {
             id: null,
             name: null,
             permissions: [],
             active: 1,
             created: "",
             modified: ""
           };
         }

         this.user.role_id = CryptoJS.AES.decrypt(
           this.cookieService.get("role_id"),
           this.constantList.DEFAULT_COOKIE_ENCRYPTION_KEY
           ).toString(CryptoJS.enc.Utf8);

         this.user.role.id = this.user.role_id;
         this.user.role.name = CryptoJS.AES.decrypt(
           this.cookieService.get("role_name"),
           this.constantList.DEFAULT_COOKIE_ENCRYPTION_KEY
           ).toString(CryptoJS.enc.Utf8);

         this.loggedIn = true;
       }

       return this.loggedIn;
     }

    /**
     * The following method is used to set the user detail to the cookies
     * @param {User} user
     * @param {boolean} setToken
     */
     public setUserCookies(user: User, setToken: boolean = true) {
        // only manipulate if the setToken is true
        const currentDate = new Date();
        let expiryDate = new Date(currentDate.setHours(currentDate.getHours() + this.constantList.DEFAULT_SESSION_HOURS));

        // if remember me selected, set the expiration time for all cookies
        if (this.user.remember_me || user.remember_me) {
          expiryDate = new Date(currentDate.setMonth(currentDate.getMonth() + this.constantList.DEFAULT_REMEMBER_ME_MONTHS));
        }

        // only set token if provided, else ignore i.e. old token will still reside in cookies
        if (setToken) {
          this.cookieService.set("gpulse_id", user.id.toString(), expiryDate, "/");
          this.cookieService.set("gpulse_token", user.access_token, expiryDate, "/");
        }

        this.cookieService.set("business_reference_id", CryptoJS.AES.encrypt(
          user.businessReferenceId, this.constantList.DEFAULT_COOKIE_ENCRYPTION_KEY
          ).toString(), expiryDate, "/");

        this.cookieService.set("first_name", CryptoJS.AES.encrypt(user.firstName, this.constantList.DEFAULT_COOKIE_ENCRYPTION_KEY).toString(), expiryDate, "/");
        this.cookieService.set("last_name", CryptoJS.AES.encrypt(user.lastName, this.constantList.DEFAULT_COOKIE_ENCRYPTION_KEY).toString(), expiryDate, "/");
        this.cookieService.set("email", CryptoJS.AES.encrypt(user.email, this.constantList.DEFAULT_COOKIE_ENCRYPTION_KEY).toString(), expiryDate, "/");
        this.cookieService.set("phone_number", CryptoJS.AES.encrypt(user.phoneNumber.toString(), this.constantList.DEFAULT_COOKIE_ENCRYPTION_KEY).toString(), expiryDate, "/");
        this.cookieService.set("role_id", CryptoJS.AES.encrypt(user.role_id.toString(), this.constantList.DEFAULT_COOKIE_ENCRYPTION_KEY).toString(), expiryDate, "/");
        this.cookieService.set("role_name", CryptoJS.AES.encrypt(user.role.name, this.constantList.DEFAULT_COOKIE_ENCRYPTION_KEY).toString(), expiryDate, "/");
      }

      updateProfile(user: User): Promise<any> {
        return new Promise((resolve, reject) => {
          let body = `first_name=${user.first_name}&last_name=${user.last_name}&email=${user.email}`;
          body += `&phone_number=${user.phone_number}&business_reference_id=${user.businessReferenceId}`;
          body += `&role_id=${user.role_id}`;

          return this.http
          .post(API_LIST.PROFILE_UPDATE,
            body, {
              headers: this.headers
            })
          .subscribe(json => {
            const jsonData = this.parseResponse(json);
            if (jsonData.response === this.constantList.SUCCESS_RESPONSE) {
              this.setUserCookies(user, false);
              resolve(jsonData);
            } else {
              this.getErrorMessages(jsonData).then((errorsArray) => {
                  // if errorsArray returned, give it back to the component
                  if (errorsArray) {
                    reject(errorsArray);
                  }
                });
            }
          }, error => {
            this.rejectErrorMessages(error, reject);
          });
        });
      }

      changePassword(user: User, {oldPassword, newPassword}: {oldPassword: string, newPassword: string}): Promise<any> {
        return new Promise((resolve, reject) => {
          let body = `business_reference_id=${user.businessReferenceId}&email=${user.email}`;
          body += `&new_password=${newPassword}&old_password=${oldPassword}`;
          return this.http
          .post(API_LIST.PROFILE_UPDATE_PASSWORD,
            body, {
              headers: this.headers
            })
          .subscribe(json => {
            const jsonData = this.parseResponse(json);
            if (jsonData.response === this.constantList.SUCCESS_RESPONSE) {
              this.user = jsonData.data.user;
              this.user.id = this.user.businessReferenceId;
              this.user.role_id = this.user.roleId;

              this.user.access_token = jsonData.data.id;
              this.updateToken();
              this.setUserCookies(this.user);
              resolve(jsonData);
            } else {
              this.getErrorMessages(jsonData).then((errorsArray) => {
                  // if errorsArray returned, give it back to the component
                  if (errorsArray) {
                    reject(errorsArray);
                  }
                });
            }
          }, error => {
            this.rejectErrorMessages(error, reject);
          });
        });
      }
    }
