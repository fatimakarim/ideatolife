import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedOfferComponent } from './feed-offer.component';

describe('FeedOfferComponent', () => {
  let component: FeedOfferComponent;
  let fixture: ComponentFixture<FeedOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
