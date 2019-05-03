import {Component, OnInit} from "@angular/core";
import {FeedConfigService} from "../../theme-core/services/config.service";

@Component({
  selector: "feed-error-404",
  templateUrl: "./error-404.component.html",
  styleUrls: ["./error-404.component.scss"]
})
export class FeedError404Component implements OnInit {
  constructor(private fuseConfig: FeedConfigService) {
    this.fuseConfig.setSettings({
      layout: {
        navigation: "none",
        toolbar: "none",
        footer: "none"
      }
    });
  }

  ngOnInit() {
  }
}
