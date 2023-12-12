import { Component } from '@angular/core';

@Component({
  selector: 'app-travel-beginner',
  templateUrl: './travel-beginner.component.html',
  styleUrls: ['./travel-beginner.component.css']
})
export class TravelBeginnerComponent {
  currentPage = 1;
  transportModes = [
  { name: 'Car', conjugation: 'I drive the car, you drive the car, he/she/it drives the car, we drive the car, you drive the car, they drive the car', imageUrl: '../../../assets/car.jpg' },
  { name: 'Bus', conjugation: 'I ride the bus, you ride the bus, he/she/it rides the bus, we ride the bus, you ride the bus, they ride the bus', imageUrl: '../../../assets/bus.jpg' },
  { name: 'Bicycle', conjugation: 'I ride the bicycle, you ride the bicycle, he/she/it rides the bicycle, we ride the bicycle, you ride the bicycle, they ride the bicycle', imageUrl: '../../../assets/bicycle.jpg' },
  { name: 'Train', conjugation: 'I take the train, you take the train, he/she/it takes the train, we take the train, you take the train, they take the train', imageUrl: '../../../assets/train.jpg' },
  { name: 'Motorcycle', conjugation: 'I ride the motorcycle, you ride the motorcycle, he/she/it rides the motorcycle, we ride the motorcycle, you ride the motorcycle, they ride the motorcycle', imageUrl: '../../../assets/motorcycle.jpg' },
  { name: 'Boat', conjugation: 'I row the boat, you row the boat, he/she/it rows the boat, we row the boat, you row the boat, they row the boat', imageUrl: '../../../assets/rowboat.jpg' },
  { name: 'Airplane', conjugation: 'I fly the airplane, you fly the airplane, he/she/it flies the airplane, we fly the airplane, you fly the airplane, they fly the airplane', imageUrl: '../../../assets/airplane.jpg' },
  { name: 'Helicopter', conjugation: 'I pilot the helicopter, you pilot the helicopter, he/she/it pilots the helicopter, we pilot the helicopter, you pilot the helicopter, they pilot the helicopter', imageUrl: '../../../assets/helicopter.jpg' },
  { name: 'Subway', conjugation: 'I take the subway, you take the subway, he/she/it takes the subway, we take the subway, you take the subway, they take the subway', imageUrl: '../../../assets/subway.jpg' },
  { name: 'Taxi', conjugation: 'I take the taxi, you take the taxi, he/she/it takes the taxi, we take the taxi, you take the taxi, they take the taxi', imageUrl: '../../../assets/taxi.jpg' },
  { name: 'Scooter', conjugation: 'I ride the scooter, you ride the scooter, he/she/it rides the scooter, we ride the scooter, you ride the scooter, they ride the scooter', imageUrl: '../../../assets/scooter.jpg' },
  { name: 'Truck', conjugation: 'I drive the truck, you drive the truck, he/she/it drives the truck, we drive the truck, you drive the truck, they drive the truck', imageUrl: '../../../assets/truck.jpg' }
];

  textSamples = [
  {text1: `Early in the morning, Emily decided to _______ her bicycle to the nearby park. The air was fresh, and the streets were quiet. As she pedaled along, she noticed a bright yellow _______ passing by. It was full of people looking around the city. After a while, Emily reached the park and locked her bicycle. She planned to meet her friend, Mark, who would _______ the train to get there. While waiting, she watched some kids near the lake, trying to move a small boat in the water.

    Soon, Mark arrived, looking a bit rushed. "I almost missed the train!" he said. "The underground train was so full of people, I thought I wouldn't make it in time."

    They decided to have lunch at a café across the city. Since it was far, they chose to _______ a taxi. The taxi driver, a friendly man named Joe, told them exciting stories as he _______ his taxi through the busy city streets.

    After lunch, Emily and Mark went to the airplane museum. They were both interested in how airplanes work. The best part was an old airplane they could see inside. They even pretended to _______ it.

    In the evening, Emily suggested, "Let's take a helicopter ride! It's a fun way to end our day!"

    Mark agreed, and soon they were up in the sky, looking down at the city. The person flying the helicopter showed them the city from above.

    Finally, as it got dark, they went back to the city center. Emily rode her _______ home, and Mark waited for his _______. They said goodbye, happy about their day.`}
  ]

  // Function to change page
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
