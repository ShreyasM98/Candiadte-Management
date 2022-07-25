import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContact } from 'src/app/Models/iContact';
import { IGroup } from 'src/app/Models/iGroup';
import { ContactService } from 'src/app/Service/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent implements OnInit {
 
 public loading: boolean = false;
 public contactId: string | null = null;
 public contact: IContact = {} as IContact;
 public errorMessage: string | null = null;
 public group:IGroup = {} as IGroup;

  constructor(private activatedRoute : ActivatedRoute,
    private contactService: ContactService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param)=> {
      this.contactId = param.get('contactId')
    });
    if(this.contactId){
      this.contactService.getContact(this.contactId).subscribe((data)=>{
        this.contact = data;
        this.loading = false;
        this.contactService.getGroup(data).subscribe((data) => {})
      }, (error) => {
        this.errorMessage = error;
        this.loading = false
      })
    }
    
  }

  

}
