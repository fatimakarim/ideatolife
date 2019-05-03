import {Component, HostBinding, Input, OnInit} from "@angular/core";

@Component({
  selector: "feed-nav-vertical-item",
  templateUrl: "./nav-vertical-item.component.html",
  styleUrls: ["./nav-vertical-item.component.scss"]
})
export class FeedNavVerticalItemComponent implements OnInit {
  @HostBinding("class") classes = "nav-item";
  @Input() item: any;

  constructor() {
  }

  ngOnInit() {
  }
}
