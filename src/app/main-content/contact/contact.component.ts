import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  email = 'contact@matthias-hofer.com';
  privacyAccepted = false;
  hoverPrivacy = false;
  submitted = false;
  showToast = false;
  isSmallScreen = window.innerWidth <= 1080;
  contactData = { name: '', email: '', message: '' };
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

  togglePrivacy(): void {
    this.privacyAccepted = !this.privacyAccepted;
  }

  privacyRequired(): boolean {
    return !this.privacyAccepted && this.submitted;
  }

  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (!form.submitted || !form.valid) return;

    this.http
      .post(this.post.endPoint, this.post.body(this.contactData))
      .subscribe({
        next: () => this.handleSuccess(form),
        error: (error) => console.error(error),
        complete: () => console.info('Send POST complete'),
      });
  }

  handleSuccess(form: NgForm): void {
    console.log('Form data:', this.contactData);
    form.resetForm();
    this.submitted = false;
    this.showToast = true;
    this.lockBodyScroll();

    setTimeout(() => {
      this.unlockBodyScroll();
      this.showToast = false;
    }, 3000);
  }

  lockBodyScroll(): void {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  unlockBodyScroll(): void {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
}
