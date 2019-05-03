import {NgModule} from "@angular/core";
import {LoginModule} from "./login/login.module";
import {RegisterModule} from "./register/register.module";
import {FeedForgotPasswordModule} from "./forgot-password/forgot-password.module";

@NgModule({
  imports: [
    LoginModule,
    RegisterModule,
    FeedForgotPasswordModule
  ],
  declarations: [],
})

export class AuthenticationModule {
}
