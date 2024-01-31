import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { UpdateLevelService } from '../core/services/update-level.service';
import { UpdateTotalLevelService } from '../core/services/update-total-level.service';

@Component({
  selector: 'app-update-topic-level',
  templateUrl: './update-topic-level.component.html',
  styleUrls: ['./update-topic-level.component.css'],
})
export class UpdateTopicLevelComponent implements OnInit {
  // We can use non-null assertion as we know that they will be assigned to params below
  updatedLevel!: string;
  topic!: string;
  userLevel!: string

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private updateLevelService: UpdateLevelService,
    private updateTotalLevelService: UpdateTotalLevelService
  ) {}

  ngOnInit() {
    // Retrieve the parameters
    const queryParams = this.route.snapshot.queryParams;
    this.updatedLevel = queryParams['updatedLevel'] || '';
    this.topic = queryParams['topic'] || '';

    // Now you have access to level and topic in this component
    console.log('updated level:', this.updatedLevel);
    console.log('Topic:', this.topic);

    // Below is where you want to send to the new route for updating the schema on the backend.
    // I need topic, user, and level to send to the backend route: topic and level from params, user from user service
    const user = this.userService.getCurrentUsername();
    //The below is for total level, which we send to the total level route on the backend after updating topic level
    const userLevel = this.userService.getCurrentLevel();
    console.log(user);
    console.log("user_level: ", userLevel);
    // Check if required parameters are present before making the service call
    if (user && this.topic && this.updatedLevel && this.updatedLevel != 'unchanged') {
      this.updateLevelService.submitNewLevel(user, this.topic, this.updatedLevel).subscribe(
        (response) => {
          console.log('Level updated successfully:', response);
          // You can navigate to another page or perform additional actions here
        },
        (error) => {
          console.error('Error updating level:', error);
          // Handle errors as needed
        }
      );
    } else {
      console.error('Required parameters missing or level unchanged from before.');
    }
    if (user && userLevel) {
      this.updateTotalLevelService.submitNewTotalLevel(user, userLevel).subscribe(
        (response) => {
          console.log('Total level updated successfully:', response);
        },
        (error) => {
          console.error('Error updating total level:', error);
        }
      )
    }
  }
}
