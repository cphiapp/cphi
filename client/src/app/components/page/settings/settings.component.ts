import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  notificationForm: FormGroup
  appearanceForm: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.notificationForm = this.formBuilder.group({
      emailNotifications: [true],
      appointmentReminders: [true],
      systemUpdates: [false]
    })

    this.appearanceForm = this.formBuilder.group({
      theme: ['light'],
      language: ['en']
    })
  }

  ngOnInit(): void {
  }

  saveNotificationSettings() {
    console.log('Notification settings saved:', this.notificationForm.value)
    // Implement save logic here
  }

  saveAppearanceSettings() {
    console.log('Appearance settings saved:', this.appearanceForm.value)
    // Implement save logic here
  }

}