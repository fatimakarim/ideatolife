import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../theme-core/modules/shared.module";
import {FeedOfferComponent} from "./feed-offer.component";

const routes = [
  {
    path: "",
    component: FeedOfferComponent
  }
];

@NgModule({
  declarations: [
    FeedOfferComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    FeedOfferComponent
  ]
})

export class FeedOfferModule {
}
