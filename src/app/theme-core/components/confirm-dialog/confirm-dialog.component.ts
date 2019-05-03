import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
    selector   : "feed-confirm-dialog",
    templateUrl: "./confirm-dialog.component.html",
    styleUrls  : ["./confirm-dialog.component.scss"]
})
export class FeedConfirmDialogComponent implements OnInit
{
    public confirmMessage: string;

    constructor(public dialogRef: MatDialogRef<FeedConfirmDialogComponent>)
    {
    }

    ngOnInit()
    {
    }

}
