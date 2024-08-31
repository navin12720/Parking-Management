import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  apiurl: string =
    'https://freeapi.miniprojectideas.com/api/ParkingSpotBooking/';
  constructor(private http: HttpClient) {}
  getAllParkingLots() {
    return this.http.get(`${this.apiurl}GetAllParkingLots`);
  }
  bookSpot(obj: any) {
    return this.http.post(`${this.apiurl}bookSpot`, obj);
  }
  ReleaseSpot(obj: any) {
    return this.http.put(`${this.apiurl}ReleaseSpot`, obj);
  }
  getActiveParkingLotsById(parkingLotId: number) {
    return this.http.get(
      `${this.apiurl}GetActiveParkingByPrakingLotId?parkingLotId=${parkingLotId}`
    );
  }
}
