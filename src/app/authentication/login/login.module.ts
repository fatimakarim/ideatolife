import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {FeedLoginComponent} from "./login.component";
import {SharedModule} from "../../theme-core/modules/shared.module";

const routes = [
  {
    path: "auth/login",
    component: FeedLoginComponent
  }
];

@NgModule({
  declarations: [
    FeedLoginComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})

export class LoginModule {

}
