import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContactService } from 'src/app/services/contact/contact.service';
import { IContact } from 'src/app/types/admin';
import { DialogContactComponent } from '../dialog-contact/dialog-contact.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contacts: IContact[] = [];

  constructor(
    private contactService: ContactService,
    private dialog: MatDialog
  ) { }

  openDialog(action: boolean, title: string, id: string = '0') {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title,
      action,
      id
    }

    this.dialog.open(DialogContactComponent, dialogConfig)
      .beforeClosed()
      .subscribe(async () => {
        await this.getContacts()
      })
  }

  async ngOnInit() {
    await this.getContacts()
  }

  async getContacts() {
    const result = await this.contactService.findAll()
    this.contacts = result.data;
  }

  async deleteContact(id: string) {
    const _delete = confirm('You want to delete the contact?')
    if (!_delete) return;
    await this.contactService.delete(id)
    await this.getContacts()
  }
}
