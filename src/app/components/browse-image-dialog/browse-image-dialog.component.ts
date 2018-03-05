import { Component, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'browse-image-dialog',
  templateUrl: 'browse-image-dialog.component.html',
})
export class BrowseImageDialogComponent {
  text: string;
  uploadFile : any;
  fileUrl: any = null;
  @ViewChild('pinImage') imageUrlElement;

  constructor(
    public dialogRef: MatDialogRef<BrowseImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  fileChange(event) {
    let fileList: FileList = event.target.files;
    console.log(event);
    let reader = new FileReader();
    console.log(this.imageUrlElement);
    let file: File = fileList[0];
    let formData: FormData = new FormData();
    if (event.target.files && event.target.files[0]) {
      reader.onload = (event:any) => {
        this.fileUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      // this.uploadFile = reader.readAsArrayBuffer(event.target.files[0])
      this.uploadFile = file;
    }

    console.log(fileList)


    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        console.log(file.name);
        let headers = new Headers();
        /** No need to include Content-Type in Angular 4 */
        // headers.append('Content-Type', 'multipart/form-data');
        // headers.append('Accept', 'application/json');
        // let options = new RequestOptions({ headers: headers });
        // this.http.post(`${this.apiEndPoint}`, formData, options)
        //     .map(res => res.json())
        //     .catch(error => Observable.throw(error))
        //     .subscribe(
        //         data => console.log('success'),
        //         error => console.log(error)
        //     )
    }

    this.uploadFile = fileList[0];
  }

  
}