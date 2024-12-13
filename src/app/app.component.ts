import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WhatsApp Message Sender';
  numbers: string = ''; // default numbers
  multilineString: string = ''; // message body from textarea
  sentMessagesCount: number = 0; // for tracking sent messages

  buttonLable: string = 'Auto Send'
  buttonSending: boolean = false
  // Options for time interval selection
  timeOptions = [
    { label: '3 Seconds', value: 3000 },
    { label: '5 Seconds', value: 5000 },
    { label: '6 Seconds', value: 6000 },
    { label: '7 Seconds', value: 7000 },
    { label: '8 Seconds', value: 8000 },
    { label: '9 Seconds', value: 9000 },
    { label: '10 Seconds', value: 10000 }
  ];
  currentYear: number = 0;
  whatsappMode: string = 'web';
  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }
  // Store selected time in milliseconds
  selectedTime!: number; // Default to 5 seconds

  urls: { phoneNumber: string; url: string }[] = []; // Array to hold phone numbers and their URLs
  async openWhatsApp() {
   await this.onSendMessage();
    for (const url of this.urls) {
      const anchor = document.createElement('a');
      anchor.href = url.url;
      anchor.target = '_blank';
      anchor.click();
      console.log(url);
  
      // Wait for the selected delay before processing the next URL
      await this.delay(this.selectedTime);
    }
  }
  
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onSendMessage() {
    const phoneNumbers = this.numbers.split(',').map((num) => num.trim()).filter((num) => num !== '');
    if (phoneNumbers.length > 0) {
      this.urls = phoneNumbers.map(phoneNumber => {
        const url =
          this.whatsappMode === 'web'
            ? `https://web.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(this.multilineString)}&type=phone_number&app_absent=0`
            : `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(this.multilineString)}`;
        return { phoneNumber, url };
      });
    } else {
      alert('Please enter at least one phone number.');
    }
  }
  onTimeChange(event: any) {
    console.log(`Selected Time: ${event.value}ms`);
  }
  onClickUrl(url: string) {
    const newWindow = window.open(url, '_blank');
  }
  onWhatsAppModeChange(event: Event) {
    const selectedValue = (event.target as HTMLInputElement).value;
    console.log('Selected WhatsApp Mode:', selectedValue);
    this.onSendMessage();
  }
}
