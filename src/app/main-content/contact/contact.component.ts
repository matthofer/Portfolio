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
  email = 'contact@matthias-hofer.com';
  privacyAccepted = false;
  hoverPrivacy = false;
  submitted = false;
  mailTest = true;
  showToast = false;
  isSmallScreen = window.innerWidth <= 1080;

  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));
  }

  checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth <= 1080;
  }

  scrollToTop(event: Event): void {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  contactData = {
    name: '',
    email: '',
    message: '',
  };

  http = inject(HttpClient);

  post = {
    endPoint: 'https://matthias-hofer.com/sendMail.php',
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
            this.submitted = false;
            this.showToast = true;
            const scrollbarWidth =
              window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            setTimeout(() => {
              document.body.style.overflow = '';
              document.body.style.paddingRight = '';
              this.showToast = false;
            }, 3000);
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('Send POST complete'),
        });
    } else if (form.submitted && form.valid && this.mailTest) {
      console.log('Test mode – no data sent:', this.contactData);
      form.resetForm();
      this.submitted = false;
      this.showToast = true;
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      setTimeout(() => {
        this.showToast = false;
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }, 3000);
    }
  }
}
