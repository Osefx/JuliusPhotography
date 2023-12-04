import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from '../models/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private photosUrl = 'http://localhost:3000/photos'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photosUrl);
  }

  addPhoto(photo: Photo): Observable<Photo> {
    console.log(this.photosUrl)
    return this.http.post<Photo>(this.photosUrl, photo);
  }

  updatePhoto(id: number, photo: FormData): Observable<Photo> {
    const url = `${this.photosUrl}/${id}`;
    return this.http.put<Photo>(url, photo);
  }

  deletePhoto(id: number): Observable<Photo> {

    const url = `${this.photosUrl}/${id}`;
    console.log(url)
    return this.http.delete<Photo>(url);
  }
}
