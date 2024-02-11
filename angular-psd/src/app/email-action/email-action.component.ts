import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email-action',
  templateUrl: './email-action.component.html',
  styleUrls: ['./email-action.component.css']
})
export class EmailActionComponent {
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    // Extract parameters from the URL
    this.route.queryParams.subscribe(params => {
      const token = params['token']; // Assuming token is the parameter you're interested in
      if (token) {
        // Send POST request to backend service
        this.http.post<any>('http://localhost:8080/auth/confirm?token=' + token, {})
          .subscribe({
            next: (response) => {
              // No response handling needed since not expecting a response
              if (response === "Success") {
                // Handle success
                console.log('Success:', response);
                // Perform any actions you want to do on success
              } else {
                // Handle other responses
                console.log('Unexpected response:', response);
              }
            },
            error: (error) => {
              // Error handling - redirect or display error message
              console.error('Error:', error);
            }
          });
      }
    });
  }
}
