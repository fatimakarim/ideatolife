import {Component, Inject, Injector, ViewChild} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from "@angular/material";
import {AngularCropperjsComponent} from "angular-cropperjs";
import {DomSanitizer} from "@angular/platform-browser";
import * as Cropper from "cropperjs/dist/cropper";
import {FeedBaseComponent} from "../base.component";

@Component({
    templateUrl: "./image-crop-dialog.component.html",
})
export class ImageCropDialogComponent extends FeedBaseComponent {
    /**
     * the following element holds reference to the image cropper
     */
    @ViewChild("angularCropper") public angularCropper: AngularCropperjsComponent;

    imageChangedEvent: any = null;
    aspectRatio: number = 16 / 9;
    subTitle: string = "";
    subTitleTooltip: string = "";
    public mimeType: string = "";

    cropperOptions: any = {
        checkCrossOrigin: false,
        zoomable: true,
        zoomOnWheel: true,
        zoomOnTouch: true,
        movable: true,
        wheelZoomRatio: 0.1,
        aspectRatio: this.aspectRatio
    };

    constructor(
        public dialogRef: MatDialogRef<ImageCropDialogComponent>,
        private sanitizer: DomSanitizer,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any,
        injector: Injector
    ) {
        super(injector);
        this.sanitizer = sanitizer;
        this.aspectRatio = data.aspect_ratio;
        this.subTitle = data.sub_title;
        this.subTitleTooltip = data.sub_title_tooltip;
    }

    /**
     * The following detects the change in file event from the file uploader
     * @param event
     */
    fileChangeEvent(event: any): void {
        if (this.angularCropper && this.angularCropper.cropper) this.angularCropper.cropper.reset();
        // check the file size
        if (event.target.files[0].size > this.data.file_size_limit) {
            this.showSnackBarWithMessage(this.data.file_size_error);
        } else {
            // if image already exists, we need to destroy it before we can update the image
            if (this.imageChangedEvent) {
                this.angularCropper.cropper.destroy();
            }
            const file: File = event.target.files[0];
            this.mimeType = file.type;
            this.imageChangedEvent = this.sanitizer.bypassSecurityTrustResourceUrl(
                URL.createObjectURL(file)
            );
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onCropClick(): void {
        this.angularCropper.cropper.getCroppedCanvas().toBlob(blob => {
            this.dialogRef.close(blob);
        });
    }
}
