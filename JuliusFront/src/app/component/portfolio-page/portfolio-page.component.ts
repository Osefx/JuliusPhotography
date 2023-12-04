import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import { AuthService } from 'src/app/service/auth.service';
import { PhotoService } from 'src/app/service/photo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css']
})
export class PortfolioPageComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  photos: Photo[] = [];
  isLoggedIn = false; // Set this to true when the user logs in and to false when the user logs out
  selectedFile!: File;
  photoToEdit!: Photo | null;

  constructor(private photoService: PhotoService, private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getPhotos();
  }

  getPhotos(): void {
    this.photoService.getPhotos().subscribe(
      photos => {
        this.photos = photos;
      },
      error => {
        console.error(error);
      }
    );
  }

  addPhoto() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const formData = new FormData();
      formData.append('image', file);


      if (this.photoToEdit) {
        // If a photo is being edited, update the existing photo
        this.photoService.updatePhoto(this.photoToEdit.id, formData).subscribe(
          () => {
            console.log('Update successful');
            this.photoToEdit = null; // Reset photoToEdit
          },
          error => {
            console.error(error);
          }
        );
      } else {
        // If no photo is being edited, add a new photo
        this.http.post('http://localhost:3000/photos/', formData).subscribe(
          () => {
            console.log('Upload successful');
          },
          error => {
            console.error(error);
          }
        );
      }
    }
  }

  editPhoto(photo: Photo) {
    this.photoToEdit = photo; // Set photoToEdit to the photo that is being edited
    this.fileInput.nativeElement.click(); // Open the file dialog
  }

  deletePhoto(id: number) {
    this.photoService.deletePhoto(id).subscribe(
      () => {
        this.photos = this.photos.filter(photo => photo.id !== id); // Remove the deleted photo from the photos array
      },
      error => {
        console.error(error);
      }
    );
  }
}
