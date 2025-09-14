import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule
  ]
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