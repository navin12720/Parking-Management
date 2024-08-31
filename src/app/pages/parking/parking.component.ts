import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parking.component.html',
  styleUrl: './parking.component.css',
})
export class ParkingComponent implements OnInit {
  mastersrv = inject(MasterService);
  parkingLotlist: any[] = [];
  ActiveparkingLotlist: any[] = [];
  selectedparkingLot: any = {};
  parkingSpotList: number[] = [];
  selectedparkingspotNumber: number = 0;
  selectedParkingObj: any = {};
  bookingObj: any = {
    parkingId: 0,
    parkingLotId: 0,
    vehicleNo: '',
    mobileNo: '',
    inTime: '',
    outTime: '',
    parkingDate: new Date(),
    spotNo: 0,
  };
  ngOnInit(): void {
    this.getParkingLots();
  }
  getParkingLots() {
    this.mastersrv.getAllParkingLots().subscribe((res: any) => {
      this.parkingLotlist = res.data;
      this.selectedparkingLot = this.parkingLotlist[0];
      this.getActiveParkingLots();
      this.createList(this.selectedparkingLot.totalParkingSpot);
    });
  }

  getActiveParkingLots() {
    this.mastersrv
      .getActiveParkingLotsById(this.selectedparkingLot.parkingLotId)
      .subscribe((res: any) => {
        this.ActiveparkingLotlist = res.data;
      });
  }

  checkIfParkingSpotBooked(spotNo: number) {
    return this.ActiveparkingLotlist.find((m) => m.spotNo == spotNo);
  }
  createList(totalSpot: number) {
    this.parkingSpotList = [];
    for (let i = 1; i <= totalSpot; i++) {
      this.parkingSpotList.push(i);
    }
  }
  selectedParkingLot(data: any) {
    this.selectedparkingLot = data;
    this.createList(this.selectedparkingLot.totalParkingSpot);
    this.getActiveParkingLots();
  }

  openModel(parkingspotNumber: number) {
    this.selectedparkingspotNumber = parkingspotNumber;
    const model = document.getElementById('bookModal');
    if (model != null) {
      model.style.display = 'block';
    }
  }

  openReleaseModel(parkingobj: any) {
    this.selectedParkingObj = parkingobj;
    const model = document.getElementById('releaseBookModal');
    if (model != null) {
      model.style.display = 'block';
    }
  }
  closeModel() {
    const model = document.getElementById('bookModal');
    if (model != null) {
      model.style.display = 'none';
    }
  }
  closeReleaseModel() {
    const model = document.getElementById('releaseBookModal');
    if (model != null) {
      model.style.display = 'none';
    }
  }

  Onbook() {
    this.bookingObj.parkingLotId = this.selectedparkingLot.parkingLotId;
    this.mastersrv.bookSpot(this.bookingObj).subscribe((res: any) => {
      if (res.result) {
        alert('Booking Done');
        this.closeModel();
        this.getActiveParkingLots();
      } else {
        alert(res.message);
      }
    });
  }

  releaseSpot() {
    this.mastersrv
      .ReleaseSpot(this.selectedParkingObj)
      .subscribe((res: any) => {
        if (res.result) {
          alert('Spot Released');
          this.closeReleaseModel();
          this.getActiveParkingLots();
        } else {
          alert(res.message);
        }
      });
  }
}
