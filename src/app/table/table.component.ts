import { Component, OnInit } from '@angular/core';
import { FirestoreDbService } from '../providers/firestore-db.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit{


  studentList: Array<any> = [];

  addStudentForm: FormGroup;
  name: FormControl;
  address: FormControl;
  joinYear: FormControl;
  class: FormControl;

  constructor(private firestoreDbService: FirestoreDbService) {
    this.getStudentList();
  }

  classes = [
    { value: 'EDP'},
    { value: 'QF1'},
    { value: 'QF2'},
    { value: 'QF3'}
  ]

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  async addStudent() {
    try {
      await this.firestoreDbService.insertData('student', {
        name: this.name.value,
        address: this.address.value,
        joinYear: this.joinYear.value,
        class: this.class.value
      });
      this.addStudentForm.reset();
    } catch (error) {
      console.log(error);
    }
  }

  createFormControl() {
    this.name = new FormControl('', [
      Validators.required,
    ]);
    this.address = new FormControl('', [
      Validators.required,
    ]);
    this.joinYear = new FormControl('', [
      Validators.required,
    ]);
    this.class = new FormControl(0);
  }

  createForm(){
    this.addStudentForm = new FormGroup({
      name: this.name,
      address: this.address,
      joinYear: this.joinYear,
      class: this.class
    });
  }

  getStudentList() {
    this.firestoreDbService.getData('student').subscribe(result => {
      console.log('result', result);
      this.studentList = result;
    })
  }

  settings = {
    actions: {
      add: false,
      position: 'right',
    },
    delete: {
      confirmDelete: true
    },
    edit: {
      confirmSave: true
    },
    columns: {
      name: {
        title: 'Full Name',
        filter: 'Search Student Name'
      },
      address: {
        title: 'Address'
      },
      joinYear: {
        title: 'Join Year',
      },
      class: {
        title: 'class',
      }
    }
  };

  deleteRow(event) {
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      this.firestoreDbService.deleteTheRow('student', event.data.id);
    }else{
      event.confirm.reject();
    }
  }

  editRow(event){
    console.log("==Event==", event);
    var data = { "name": event.newData.name,
                  "address": event.newData.address,
                  "joinYear": event.newData.joinYear,
                  "class": event.newData.class
    };
    if (window.confirm('Are you sure you want commit changes?')) {
      this.firestoreDbService.updateTheRow('student', event.data.id, data);
    } else{
      event.confirm.reject();
    }
  }
}
