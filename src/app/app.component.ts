import {Component} from "@angular/core";
import {FeedSplashScreenService, FeedTranslationLoaderService} from "./theme-core/services";
import {TranslateService} from "@ngx-translate/core";

import {FeedNavigationService} from "./theme-core/components/navigation/navigation.service";
import {FeedNavigationModel} from "./navigation/navigation.model";
import {locale as navigationEnglish} from "./navigation/i18n/en";
import {PermissionService} from "./helpers/services/permission.service";
import {Router} from "@angular/router";

@Component({
    selector: "feed-root",
    template: "<router-outlet></router-outlet>"
})
export class AppComponent {
  constructor(private gpulseNavigationService: FeedNavigationService,
              private gpulseSplashScreen: FeedSplashScreenService,
              private translate: TranslateService,
              private translationLoader: FeedTranslationLoaderService,
              private permissionService: PermissionService,
              private router: Router) {
      // Add languages
      this.translate.addLangs(["en"]);

      // Set the default language
      this.translate.setDefaultLang("en");

      // Use a language
      this.translate.use("en");

      // Set the navigation model
      if (!this.gpulseNavigationService.isNavigationModelAlreadySet()) {
        this.gpulseNavigationService.setNavigationModel(new FeedNavigationModel(permissionService));
      }

      // Set the navigation translations
      this.translationLoader.loadTranslations(navigationEnglish);
  }
}
