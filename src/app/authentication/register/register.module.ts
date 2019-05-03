import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {FeedRegisterComponent} from "./register.component";
import {SharedModule} from "../../theme-core/modules/shared.module";

const routes = [
  {
    path: "auth/register",
    component: FeedRegisterComponent
  }
];

@NgModule({
  declarations: [
    FeedRegisterComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})

export class RegisterModule {

}
