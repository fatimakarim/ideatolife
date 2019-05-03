import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {SharedModule} from "../../modules/shared.module";
import {FeedSearchBarComponent} from "./search-bar.component";

@NgModule({
  declarations: [
    FeedSearchBarComponent
  ],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    FeedSearchBarComponent
  ]
})
export class FeedSearchBarModule {
}
