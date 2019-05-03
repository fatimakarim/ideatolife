import {Component, Injector, OnInit} from "@angular/core";
import {FormBuilder, ValidatorFn, Validators} from "@angular/forms";
import {FeedAnimations} from "../../theme-core/animations";
import {FeedConfigService} from "../../theme-core/services/config.service";
import {FormInterface} from "../../helpers/interfaces/form.interface";
import {FeedFormBaseComponent} from "../../helpers/components/form-base.component";
import {locale as english} from "./i18n/en";

@Component({
  selector: "feed-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: FeedAnimations
})
export class FeedLoginComponent extends FeedFormBaseComponent implements OnInit, FormInterface {

  constructor(private fuseConfig: FeedConfigService,
              private formBuilder: FormBuilder,
              injector: Injector) {
    super(injector);
    this.translationLoader.loadTranslations(english);
    this.fuseConfig.setSettings({
      layout: {
        navigation: "none",
        toolbar: "none",
        footer: "none"
      }
    });
  }

  ngOnInit() {
    this.addFormValidations();
  }


  /**
   * The following method is used to add the form validations
   */
  addFormValidations(): void {
    const emailValidations: ValidatorFn[] = [Validators.required, Validators.email];
    const password: ValidatorFn[] = [Validators.required, Validators.minLength(this.constantList.PASSWORD_MIN_LENGTH)];

    this.addFormControlWithValidations("email", emailValidations);
    this.addFormControlWithValidations("password", password);
  }

  /**
   * The following method is used to handle the submit action for the respective form
   */
  onSubmit(): void {

    if (this.formGroup.status === "VALID") {
      this.router.navigate(["dashboard"]).then();
    }
  }

  /**
   * The following method is used
   * @param {string} formElement
   * @returns {string}
   */
  getErrorMessage(formElement: string): string {
    // detect the minLength validation being passed on the respective form control
    if (this.formGroup.get(formElement).errors.minlength) {
      return english.data.INPUT.PASSWORD.REQUIRED_ERROR + this.formGroup.get(formElement).errors.minlength.requiredLength;
    }
    // detect the required & email validation being passed on the respective form control
    else if (this.formGroup.get(formElement).errors.email && this.formGroup.get(formElement).errors.required) {
      return english.data.INPUT.EMAIL.REQUIRED_ERROR;
    }
  }
}
