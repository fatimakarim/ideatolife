// tslint:disable-next-line:quotemark
import { Component, Injector } from '@angular/core';
import {locale as english} from "./i18n/en";
import {FeedBaseComponent} from "../../../helpers/components/base.component";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "app-feed-offer",
  // tslint:disable-next-line:quotemark
  templateUrl: './feed-offer.component.html',
  // tslint:disable-next-line:quotemark
  styleUrls: ['./feed-offer.component.scss']
})
export class FeedOfferComponent extends FeedBaseComponent {

  constructor(private injector: Injector) {
    super(injector);
    this.translationLoader.loadTranslations(english);
  }
  

}
