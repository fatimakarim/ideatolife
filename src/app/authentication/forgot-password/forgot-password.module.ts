import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {FeedForgotPasswordComponent} from "./forgot-password.component";
import {SharedModule} from "../../theme-core/modules/shared.module";

const routes = [
  {
    path: "auth/forgot-password",
    component: FeedForgotPasswordComponent
  }
];

@NgModule({
  declarations: [
    FeedForgotPasswordComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})

export class FeedForgotPasswordModule {

}
