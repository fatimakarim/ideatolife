import {Component, Injector} from "@angular/core";
import {locale as english} from "./i18n/en";
import {FeedBaseComponent} from "../../../helpers/components/base.component";

@Component({
  selector: "feed-dashboard",
  templateUrl: "./feed-dashboard.component.html",
  styleUrls: ["./feed-dashboard.component.scss"]
})
export class FeedDashboardComponent extends FeedBaseComponent {

  constructor(private injector: Injector) {
    super(injector);
    this.translationLoader.loadTranslations(english);
  }
  
  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
}
