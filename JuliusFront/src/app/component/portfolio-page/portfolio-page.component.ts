import { Component, OnInit } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import { PhotoService } from 'src/app/service/photo.service';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css']
})
export class PortfolioPageComponent implements OnInit {
  photos: Photo[] = [];
  isLoggedIn = false; // Set this to true when the user logs in and to false when the user logs out

  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
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
    // Open a modal or another form where the admin can enter the properties of the new photo
    // When the admin submits the form, call the addPhoto method in the PhotoService with the new photo

    const newPhoto = { id: 0, name: 'New Name', path: 'New Path', size: 123 }; // Replace this with the actual new photo

    this.photoService.addPhoto(newPhoto).subscribe(
      newPhoto => {
        this.photos.push(newPhoto); // Add the new photo to the photos array
      },
      error => {
        console.error(error);
      }
    );
  }

  editPhoto(photo: Photo) {
    // Open a modal or another form where the admin can edit the photo's properties
    // When the admin submits the form, call the updatePhoto method with the updated photo

    const updatedPhoto = { ...photo, name: 'New Name', path: 'New Path', size: 123 }; // Replace this with the actual updated photo

    this.photoService.updatePhoto(photo.id, updatedPhoto).subscribe(
      updatedPhoto => {
        // Replace the old photo with the updated photo in the photos array
        const index = this.photos.findIndex(p => p.id === updatedPhoto.id);
        this.photos[index] = updatedPhoto;
      },
      error => {
        console.error(error);
      }
    );
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
