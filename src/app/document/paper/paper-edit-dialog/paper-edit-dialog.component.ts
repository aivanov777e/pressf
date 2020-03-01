import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HandBookService } from 'src/app/core/services/handbook.service';
import { ActivatedRoute } from '@angular/router';
import { PaperService } from 'src/app/core/services/paper.service';
import { Observable } from 'rxjs';
import { Material } from 'src/app/models/material';
import { Paper } from 'src/app/models/paper';
import { Format } from 'src/app/models/format';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';

@Component({
  selector: 'app-paper-edit-dialog',
  templateUrl: './paper-edit-dialog.component.html',
  styleUrls: ['./paper-edit-dialog.component.scss']
})
export class PaperEditDialogComponent implements OnInit {
  format$: Observable<Format[]> = this.handbookSrv.getFormatList();
  material$: Observable<Material[]> = this.handbookSrv.getMaterialList(null);

  //paper: Paper;

  fg = this.fb.group({
    id: null,
    formatId: [null, Validators.required],
    materialId: [null, Validators.required],
    density: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
    price: [null, Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<PaperEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    //private location: Location,
    private fb: FormBuilder,
    private handbookSrv: HandBookService,
    //private route: ActivatedRoute,
    private paperService: PaperService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fg.patchValue(this.data);
    if (this.data.id && this.data.id !== '-1') {
      this.fg.get('formatId').disable();
      this.fg.get('materialId').disable();
      this.fg.get('density').disable();
    } //else { this.fg.enable(); }
  }

  save() {
    const paper = this.fg.value;
    //paper = {...paper, contactId: paper.contact.id, workId: paper.work.id};
    paper.id = paper.id || undefined;
    if (paper.id) {
      this.paperService.update(paper).subscribe((resp) => this.dialogRef.close(resp));
    } else {
      this.paperService.create(paper).subscribe((resp) => this.dialogRef.close(resp));
    }
  }

}

// export class PapersDataSource implements DataSource<Paper> {
//   connect(collectionViewer: CollectionViewer): Observable<Paper[] | readonly Paper[]> {
//     throw new Error("Method not implemented.");
//   }
//   disconnect(collectionViewer: CollectionViewer): void {
//     throw new Error("Method not implemented.");
//   }
// }
