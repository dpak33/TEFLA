import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { UpdateLevelService } from '../core/services/update-level.service';

@Component({
  selector: 'app-update-topic-level',
  templateUrl: './update-topic-level.component.html',
  styleUrls: ['./update-topic-level.component.css'],
})
export class UpdateTopicLevelComponent implements OnInit {
  updatedLevel: string;
  topic: string;

  constructor(private route: ActivatedRoute, private userService: UserService, private updateLevelService: UpdateLevelService) {}

  ngOnInit() {
    // Retrieve the parameters
    this.route.queryParams.subscribe((params) => {
      this.updatedLevel = params['updatedLevel'];
      this.topic = params['topic'];

      // Now you have access to level and topic in this component
      console.log('updated level:', this.updatedLevel);
      console.log('Topic:', this.topic);

      // Below is where you want to send to the new route for updating the schema on the backend.
      // I need topic, user, and level to send to the backend route: topic and level from params, user from user service
      const user = this.userService.getCurrentUsername();

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
    });
  }
}
