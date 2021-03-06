import {Component, ElementRef, HostBinding, Inject, OnDestroy, OnInit, Renderer2, ViewEncapsulation} from "@angular/core";
import {Subscription} from "rxjs";
import {FeedConfigService} from "../theme-core/services/config.service";
import {Platform} from "@angular/cdk/platform";
import {DOCUMENT} from "@angular/common";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import {FeedAnimations} from "../theme-core/animations";

@Component({
  selector: "feed-main",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: FeedAnimations

})
export class FeedMainComponent implements OnInit, OnDestroy {
  onSettingsChanged: Subscription;
  feedSettings: any;
  @HostBinding("attr.feed-layout-mode") layoutMode;
  @HostBinding("@routerTransitionUp") routeAnimationUp = false;
  @HostBinding("@routerTransitionDown") routeAnimationDown = false;
  @HostBinding("@routerTransitionRight") routeAnimationRight = false;
  @HostBinding("@routerTransitionLeft") routeAnimationLeft = false;
  @HostBinding("@routerTransitionFade") routeAnimationFade = false;

  constructor(private _renderer: Renderer2,
              private _elementRef: ElementRef,
              private feedConfig: FeedConfigService,
              private platform: Platform,
              @Inject(DOCUMENT) private document: any,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .subscribe((event) => {
        switch (this.feedSettings.routerAnimation) {
          case "fadeIn":
            this.routeAnimationFade = !this.routeAnimationFade;
            break;
          case "slideUp":
            this.routeAnimationUp = !this.routeAnimationUp;
            break;
          case "slideDown":
            this.routeAnimationDown = !this.routeAnimationDown;
            break;
          case "slideRight":
            this.routeAnimationRight = !this.routeAnimationRight;
            break;
          case "slideLeft":
            this.routeAnimationLeft = !this.routeAnimationLeft;
            break;
        }
      });
    this.onSettingsChanged =
      this.feedConfig.onSettingsChanged
        .subscribe(
          (newSettings) => {
            this.feedSettings = newSettings;
            this.layoutMode = this.feedSettings.layout.mode;
          }
        );

    if (this.platform.ANDROID || this.platform.IOS) {
      this.document.body.className += " is-mobile";
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.onSettingsChanged.unsubscribe();
  }

  addClass(className: string) {
    this._renderer.addClass(this._elementRef.nativeElement, className);
  }

  removeClass(className: string) {
    this._renderer.removeClass(this._elementRef.nativeElement, className);
  }
}
