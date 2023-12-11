import { Component } from '@angular/core';

@Component({
  selector: 'app-travel-beginner',
  templateUrl: './travel-beginner.component.html',
  styleUrls: ['./travel-beginner.component.css']
})
export class TravelBeginnerComponent {
  currentPage = 1;
  transportModes = [
  { name: 'Car', imageUrl: '../../../assets/car.jpg' },
  { name: 'Bus', imageUrl: '../../../assets/bus.jpg' },
  { name: 'Bicycle', imageUrl: '../../../assets/bicycle.jpg' },
  { name: 'Train', imageUrl: '../../../assets/train.jpg' },
  { name: 'Motorcycle', imageUrl: '../../../assets/motorcycle.jpg' },
  { name: 'Boat', imageUrl: '../../../assets/rowboat.jpg' },
  { name: 'Airplane', imageUrl: '../../../assets/airplane.jpg' },
  { name: 'Helicopter', imageUrl: '../../../assets/helicopter.jpg' },
  { name: 'Subway', imageUrl: '../../../assets/subway.jpg' },
  { name: 'Taxi', imageUrl: '../../../assets/taxi.jpg' },
  { name: 'Scooter', imageUrl: '../../../assets/scooter.jpg' },
  { name: 'Truck', imageUrl: '../../../assets/truck.jpg' }
];

  // Function to change page
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
