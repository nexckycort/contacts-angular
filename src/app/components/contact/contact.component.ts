import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact/contact.service';
import { IContact } from 'src/app/types/admin';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contacts: IContact[] = [];

  constructor(
    private contactService: ContactService
  ) { }

  async ngOnInit() {
    await this.getContacts()
  }

  async getContacts() {
    const result = await this.contactService.findAll()
    this.contacts = result.data;
  }

  deleteContact(id: string) {
    alert(id);
  }
}
