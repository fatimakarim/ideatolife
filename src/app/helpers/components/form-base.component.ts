import { Component, ViewEncapsulation, Injector, HostBinding, OnDestroy } from "@angular/core";

import { FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import { FeedBaseComponent } from "./base.component";

/*
 * Base Component
 * Top Level Component
 */
@Component({
    selector: "feed-form-base-component",
    encapsulation: ViewEncapsulation.None,
    template: ""
})
export class FeedFormBaseComponent extends FeedBaseComponent implements OnDestroy {

    /**
     * The following is the baseModel instance to the rendered form on the UI
     * @type {FormGroup}
     */
    public formGroup: FormGroup = new FormGroup({});
    public formData: FormData = new FormData();
    /**
     * the following is used to keep the page title based on whether its add or edit form
     */
    public pageTitle: string;

    private formSubmitSubscription: any;

    @HostBinding("class.h-100-p") fullHeightClass: Boolean = true;
    @HostBinding("class.overflow-scroll") overFlowScrollClass: Boolean = true;

    constructor(injector: Injector) {
        super(injector);
        /**
         * the following method is used to monitor the status for toggle submit button
         */
        this.formSubmitSubscription = this.sharedDataService.loadingBarStatus.subscribe(bool => {
          if (bool != this.isFormSubmitted && typeof bool !== null) {
            setTimeout(() => {
              this.isFormSubmitted = bool;
              this.cd.detectChanges();
            }, 500);
          }
        });
    }

    ngOnDestroy() {
        this.cd.detach();
        if (this.formSubmitSubscription) {
            this.formSubmitSubscription.unsubscribe();
        }
    }

    /**
     * The following adds the respective control with its respective form validation
     * @param formElement
     * @param validations
     * @param disabled
     * @param formGroup
     */
    protected addFormControlWithValidations(formElement: string, validations: ValidatorFn[] = [], disabled = false, formGroup?: FormGroup): void {
        if (formGroup) formGroup.addControl(formElement, new FormControl({ value: "", disabled: disabled }, validations));
        else this.formGroup.addControl(formElement, new FormControl({ value: "", disabled: disabled }, validations));
    }

    /**
     * The following sets the page title
     */
    protected setPageTitle(): void {
        this.route.params.subscribe(params => {
            // in EDIT Mode
            if (params["id"]) {
                this.translate.get("TEXT.EDIT_TITLE").subscribe((res: string) => {
                    this.pageTitle = res;
                });
            } else {
                this.translate.get("TEXT.ADD_TITLE").subscribe((res: string) => {
                    this.pageTitle = res;
                });
            }
        });
    }

    /**
     * The following method is used to disable the respective form groups
     * @param {FormGroup[]} formGroupArray
     */
    protected disableForm(formGroupArray: FormGroup[]): void {
        // stopping emitting event
        for (const formGroup of formGroupArray) {
            formGroup.disable({ onlySelf: true, emitEvent: false });
        }
    }

    /**
     * The following method is used to enable the respective form group
     * @param {FormGroup[]} formGroupArray
     */
    protected enableForm(formGroupArray: FormGroup[]): void {
        // stopping emitting event
        for (const formGroup of formGroupArray) {
            formGroup.enable({ onlySelf: true, emitEvent: false });
        }
    }

    /**
     * The following method is used to disable the respective form control
     * @param {FormGroup} formGroup
     */
    protected disableFormControl(formGroup: FormGroup, controlName: string = ""): void {
        if (controlName && formGroup.controls[controlName]) {
            // stopping emitting event
            formGroup.controls[controlName].disable({ onlySelf: true, emitEvent: false });
        }
    }

    /**
     * The following method is used to enable the respective form control
     * @param {FormGroup} formGroup
     */
    protected enableFormControl(formGroup: FormGroup, controlName: string = "" ): void {
        // stopping emitting event
        if (controlName && formGroup.controls[controlName]) {
            // stopping emitting event
            formGroup.controls[controlName].enable({ onlySelf: true, emitEvent: false });
        }
    }
}
