import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactService } from 'src/app/services/contact/contact.service';
import { IContact } from 'src/app/types/admin';

@Component({
  selector: 'app-dialog-contact',
  templateUrl: './dialog-contact.component.html',
  styleUrls: ['./dialog-contact.component.scss']
})

export class DialogContactComponent implements OnInit {
  private isValidEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    cellphone: ['', [Validators.required, Validators.minLength(10)]]
  });

  btnSave = true;

  data: {
    title: string,
    action: boolean,
    id: string
  };

  constructor(
    private dialogRef: MatDialogRef<DialogContactComponent>,
    private fb: FormBuilder,
    private contactService: ContactService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.data = data;
    if (this.data.id !== '0') {
      this.getContact(this.data.id)
    }
  }

  ngOnInit(): void {
  }

  async getContact(id: string) {
    const { data: contact } = await this.contactService.findOne(id)

    this.contactForm = this.fb.group({
      name: [contact.name, [Validators.required, Validators.minLength(3)]],
      email: [contact.email, [Validators.required, Validators.pattern(this.isValidEmail)]],
      cellphone: [contact.cellphone, [Validators.required, Validators.minLength(10)]]
    });
  }

  async save() {
    const data = { ...this.contactForm.value };
    data.cellphone = data.cellphone + '';
    if (this.data.action) {
      await this.createContact(data)
    } else {
      await this.updateContact(this.data.id, data)
    }
    this.dialogRef.close(this.contactForm.value);
  }

  async createContact(data: IContact) {
    try {
      this.btnSave = true;
      const { message } = await this.contactService.create(data);
      alert(message);
      return
    } catch (err) {
      alert(err.error.message);
      this.btnSave = false;
    }
  }

  async updateContact(id: string, data: IContact) {
    try {
      this.btnSave = true;
      const { message } = await this.contactService.update(id, data);
      alert(message);
      return
    } catch (err) {
      alert(err.error.message);
      this.btnSave = false;
    }
  }

  close() {
    this.dialogRef.close();
  }

  formValid(): void {
    if (this.contactForm.valid) {
      this.btnSave = false;
    } else {
      this.btnSave = true;
    }
  }
}
