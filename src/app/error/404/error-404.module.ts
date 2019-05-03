import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {FeedError404Component} from "./error-404.component";
import {SharedModule} from "../../theme-core/modules/shared.module";

const routes = [
  {
    path: "errors/error-404",
    component: FeedError404Component
  }
];

@NgModule({
  declarations: [
    FeedError404Component
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})

export class Error404Module {

}
