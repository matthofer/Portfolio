import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  email = 'max-mustermann@gmail.com';
  privacyAccepted = false;
  hoverPrivacy = false;
  submitted = false;
  mailTest = true;

  contactData = {
    name: '',
    email: '',
    message: '',
  };

  http = inject(HttpClient);

  post = {
    endPoint: 'https://deineDomain.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  togglePrivacy(): void {
    this.privacyAccepted = !this.privacyAccepted;
  }

  privacyRequired(): boolean {
    return !this.privacyAccepted && this.submitted;
  }

  onSubmit(form: NgForm): void {
    this.submitted = true;

    if (form.submitted && form.valid && !this.mailTest) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            console.log('Form data:', this.contactData);
            form.resetForm();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('Send POST complete'),
        });
    } else if (form.submitted && form.valid && this.mailTest) {
      console.log('Test mode – no data sent:', this.contactData);
      form.resetForm();
    }
  }
}
