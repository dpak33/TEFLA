import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  travelWords = [
  { name: 'Passport', conjugation: 'I showed the passport, you showed the passport, he/she/it showed the passport, we showed the passport, you showed the passport, they showed the passport', imageUrl: '../../../assets/passport.jpg' },
  { name: 'Luggage', conjugation: 'I carried the luggage, you carried the luggage, he/she/it carried the luggage, we carried the luggage, you carried the luggage, they carried the luggage', imageUrl: '../../../assets/luggage.jpg' },
  { name: 'Ticket', conjugation: 'I bought the ticket, you bought the ticket, he/she/it bought the ticket, we bought the ticket, you bought the ticket, they bought the ticket', imageUrl: '../../../assets/ticket.jpg' },
  { name: 'Map', conjugation: 'I used the map, you used the map, he/she/it used the map, we used the map, you used the map, they used the map', imageUrl: '../../../assets/map.jpg' },
  { name: 'Hotel', conjugation: 'I stayed at the hotel, you stayed at the hotel, he/she/it stayed at the hotel, we stayed at the hotel, you stayed at the hotel, they stayed at the hotel', imageUrl: '../../../assets/hotel.jpg' },
  { name: 'Suitcase', conjugation: 'I packed the suitcase, you packed the suitcase, he/she/it packed the suitcase, we packed the suitcase, you packed the suitcase, they packed the suitcase', imageUrl: '../../../assets/suitcase.jpg' },
  { name: 'Backpack', conjugation: 'I brought the backpack, you brought the backpack, he/she/it brought the backpack, we brought the backpack, you brought the backpack, they brought the backpack', imageUrl: '../../../assets/backpack.jpg' },
  { name: 'Tourist', conjugation: 'I met the tourist, you met the tourist, he/she/it met the tourist, we met the tourist, you met the tourist, they met the tourist', imageUrl: '../../../assets/tourist.jpg' },
  { name: 'Guidebook', conjugation: 'I read the guidebook, you read the guidebook, he/she/it read the guidebook, we read the guidebook, you read the guidebook, they read the guidebook', imageUrl: '../../../assets/guidebook.jpg' },
  { name: 'Souvenir', conjugation: 'I bought the souvenir, you bought the souvenir, he/she/it bought the souvenir, we bought the souvenir, you bought the souvenir, they bought the souvenir', imageUrl: '../../../assets/souvenir.jpg' },
  { name: 'Destination', conjugation: 'I reached the destination, you reached the destination, he/she/it reached the destination, we reached the destination, you reached the destination, they reached the destination', imageUrl: '../../../assets/destination.jpg' },
  { name: 'Itinerary', conjugation: 'I planned the itinerary, you planned the itinerary, he/she/it planned the itinerary, we planned the itinerary, you planned the itinerary, they planned the itinerary', imageUrl: '../../../assets/itinerary.jpg' }
  ];


  hotelWords = [
  { name: 'Lobby', conjugation: 'I will go to the lobby, you will go to the lobby, he/she/it will go to the lobby, we will go to the lobby, you will go to the lobby, they will go to the lobby', imageUrl: '../../../assets/hotel.jpg' },
  { name: 'Room Key', conjugation: 'I will use the room key, you will use the room key, he/she/it will use the room key, we will use the room key, you will use the room key, they will use the room key', imageUrl: '../../../assets/roomkey.jpg' },
  { name: 'Luggage', conjugation: 'I will carry the luggage, you will carry the luggage, he/she/it will carry the luggage, we will carry the luggage, you will carry the luggage, they will carry the luggage', imageUrl: '../../../assets/luggage.jpg' },
  { name: 'Reception Desk', conjugation: 'I will check in at the reception desk, you will check in at the reception desk, he/she/it will check in at the reception desk, we will check in at the reception desk, you will check in at the reception desk, they will check in at the reception desk', imageUrl: '../../../assets/receptiondesk.jpg' },
  { name: 'Bellhop', conjugation: 'I will tip the bellhop, you will tip the bellhop, he/she/it will tip the bellhop, we will tip the bellhop, you will tip the bellhop, they will tip the bellhop', imageUrl: '../../../assets/bellhop.jpeg' },
  { name: 'Elevator', conjugation: 'I will take the elevator, you will take the elevator, he/she/it will take the elevator, we will take the elevator, you will take the elevator, they will take the elevator', imageUrl: '../../../assets/elevator.jpg' },
  { name: 'Restaurant', conjugation: 'I will eat at the restaurant, you will eat at the restaurant, he/she/it will eat at the restaurant, we will eat at the restaurant, you will eat at the restaurant, they will eat at the restaurant', imageUrl: '../../../assets/restaurant.jpg' },
  { name: 'Pool', conjugation: 'I will swim in the pool, you will swim in the pool, he/she/it will swim in the pool, we will swim in the pool, you will swim in the pool, they will swim in the pool', imageUrl: '../../../assets/pool.jpg' },
  { name: 'Gym', conjugation: 'I will work out in the gym, you will work out in the gym, he/she/it will work out in the gym, we will work out in the gym, you will work out in the gym, they will work out in the gym', imageUrl: '../../../assets/gym.jpg' },
  { name: 'Concierge', conjugation: 'I will ask the concierge, you will ask the concierge, he/she/it will ask the concierge, we will ask the concierge, you will ask the concierge, they will ask the concierge', imageUrl: '../../../assets/concierge.jpg' },
  { name: 'Spa', conjugation: 'I will visit the spa, you will visit the spa, he/she/it will visit the spa, we will visit the spa, you will visit the spa, they will visit the spa', imageUrl: '../../../assets/spa.jpg' },
  { name: 'Do Not Disturb Sign', conjugation: 'I will hang the do not disturb sign, you will hang the do not disturb sign, he/she/it will hang the do not disturb sign, we will hang the do not disturb sign, you will hang the do not disturb sign, they will hang the do not disturb sign', imageUrl: '../../../assets/do-not-disturb.jpg' }
];

  textSamples = [
  {text1: `Early in the morning, Emily decided to _______ her bicycle to the nearby park. The air was fresh, and the streets were quiet. As she pedaled along, she noticed a bright yellow _______ passing by. It was full of people looking around the city. After a while, Emily reached the park and locked her bicycle. She planned to meet her friend, Mark, who would _______ the train to get there. While waiting, she watched some kids near the lake, trying to move a small boat in the water.

    Soon, Mark arrived, looking a bit rushed. "I almost missed the train!" he said. "The underground train was so full of people, I thought I wouldn't make it in time."

    They decided to have lunch at a café across the city. Since it was far, they chose to _______ a taxi. The taxi driver, a friendly man named Joe, told them exciting stories as he _______ his taxi through the busy city streets.

    After lunch, Emily and Mark went to the airplane museum. They were both interested in how airplanes work. The best part was an old airplane they could see inside. They even pretended to _______ it.

    In the evening, Emily suggested, "Let's take a helicopter ride! It's a fun way to end our day!"

    Mark agreed, and soon they were up in the sky, looking down at the city. The person flying the helicopter showed them the city from above.

    Finally, as it got dark, they went back to the city center. Emily rode her _______ home, and Mark waited for his _______. They said goodbye, happy about their day.`},
    {text2: `Emily was thrilled about her trip. She had her _______ ready, containing all the places she wanted to visit. Checking her _______, she made sure she had everything she needed for her journey.

After leaving her house, Emily realized she forgot her _______ on the kitchen table. Rushing back, she grabbed it and hurried to the bus stop. On her way, she passed by a shop selling various _______ from around the world.

At the bus stop, she met other _______ waiting for the bus, each with their own stories and destinations. Emily opened her _______ to double-check her flight details. She had booked a room in a quaint _______ in the heart of the city.

Once on the bus, Emily placed her _______ in the overhead compartment and settled in for the ride. She took out her _______ and started reading about the city's famous landmarks.

Thinking about the adventures ahead, Emily planned to buy a _______ from each place she would visit. She wanted to have tangible memories of her dream _______.

As the bus neared the airport, Emily looked at her _______ one last time, ensuring she had all her important travel documents. She was ready for her adventure to begin.`},
  {text3: `Tom had planned a weekend getaway and needed to book a room at the ______. He called the ______ to check if there were any rooms available. Fortunately, there was one room left. He quickly made a reservation for two nights.

When Tom arrived at the ______, he went to the ______ to check in. The staff there asked for his ______ to verify his booking. After check-in, Tom asked the ______ for information about the local area.

On the second day, Tom decided to use the ______ in the hotel. It was a pleasant surprise to find a wide variety of equipment. Later, he met a ______ in the ______ and they chatted about local attractions.

In the afternoon, Tom decided to relax in the hotel's ______. Afterward, he planned to have dinner at the hotel's ______, which had good reviews.

Unfortunately, Tom received a call about an urgent meeting back home. He had to check out earlier than expected. He called the ______ to inform them and then went to his room to pack his ______. Before leaving, he made sure to hang the ______ on his door to notify housekeeping.

`}
  ]

  constructor(private router: Router) {}

  startTravelBeginnerQuiz() {
  this.router.navigate(['/section-quizzes', 'beginner', 'travel']);
}

  // Change page
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
