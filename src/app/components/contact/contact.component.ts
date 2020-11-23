import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
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
  contactsHttp!: Subscription;

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
      .subscribe(() => {
        this.getContacts()
      })
  }

  ngOnInit() {
    this.getContacts()
  }

  getContacts() {
    this.contactsHttp = this.contactService.findAll()
      .subscribe((result: any) => {
        this.contacts = result.data;
      })
  }

  ngOnDestroy() {
    this.contactsHttp.unsubscribe();
  }

  deleteContact(id: string) {
    const _delete = confirm('You want to delete the contact?')
    if (!_delete) return;
    this.contactsHttp = this.contactService.delete(id)
      .subscribe((result: any) => {
        console.log(result)
        this.getContacts()
      })
  }
}
