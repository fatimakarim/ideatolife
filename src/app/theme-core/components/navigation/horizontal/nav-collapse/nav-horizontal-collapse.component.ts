import { Component, HostBinding, HostListener, Input, OnDestroy } from '@angular/core';
import { FeedAnimations } from '../../../../animations';
import { FeedConfigService } from '../../../../services';
import { Subscription } from 'rxjs';

@Component({
  selector   : 'feed-nav-horizontal-collapse',
  templateUrl: './nav-horizontal-collapse.component.html',
  styleUrls  : ['./nav-horizontal-collapse.component.scss'],
  animations : FeedAnimations
})
export class FeedNavHorizontalCollapseComponent implements OnDestroy {
  onSettingsChanged: Subscription;
  gpulseSettings: any;
  isOpen = false;

  @HostBinding('class') classes = 'nav-item nav-collapse';
  @Input() item: any;

  @HostListener('mouseenter')
  open() {
    this.isOpen = true;
  }

  @HostListener('mouseleave')
  close() {
    this.isOpen = false;
  }

  constructor(
    private gpulseConfig: FeedConfigService
  ) {
    this.onSettingsChanged =
      this.gpulseConfig.onSettingsChanged
        .subscribe(
          (newSettings) => {
            this.gpulseSettings = newSettings;
          }
        );
  }

  ngOnDestroy() {
    this.onSettingsChanged.unsubscribe();
  }
}
