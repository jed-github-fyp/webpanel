import { Component, OnInit } from '@angular/core';
import { FirestoreDbService } from '../providers/firestore-db.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-table2',
  templateUrl: './table2.component.html',
  styleUrls: ['./table2.component.css']
})
export class Table2Component implements OnInit {

  classList: Array<any> = [];

  addClassForm: FormGroup;
  classname: FormControl;
  term: FormControl;
  yearCreated: FormControl;
  ageGroup: FormControl;

  constructor(private firestoreDbClassService: FirestoreDbService) {
    this.getClassList();
  }

  ngOnInit(): void {
    this.createFormControl();
    this.createForm();
  }

  getClassList() {
    this.firestoreDbClassService.getData('class').subscribe(result => {
      console.log('result', result);
      this.classList = result;
    })
  }

  async addClass() {
    try {
      await this.firestoreDbClassService.insertData('class', {
        classname: this.classname.value,
        term: this.term.value,
        yearCreated: this.yearCreated.value,
        ageGroup: this.ageGroup.value
      });
      this.addClassForm.reset();
    } catch (error) {
      console.log(error);
    }
  }

  createFormControl() {
    this.classname = new FormControl('', [
      Validators.required,
    ]);
    this.term = new FormControl('', [
      Validators.required,
    ]);
    this.yearCreated = new FormControl('', [
      Validators.required,
    ]);
    this.ageGroup = new FormControl('', [
      Validators.required,
    ]);
  }

  createForm(){
    this.addClassForm = new FormGroup({
      classname: this.classname,
      term: this.term,
      yearCreated: this.yearCreated,
      ageGroup: this.ageGroup
    });
  }


  settingtable2 = {
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
      classname: {
        title: 'Class Name'
      },
      term: {
        title: 'Term'
      },
      yearCreated: {
        title: 'Year Created',
      },
      ageGroup: {
        title: 'Age Group',
      }
    }
  };

  deleteRow(event) {
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      this.firestoreDbClassService.deleteTheRow('class', event.data.id);
    }else{
      event.confirm.reject();
    }
  }

  editRow(event){
    console.log("==Event==", event);
    var data = { "classname": event.newData.classname,
                  "term": event.newData.term,
                  "yearCreated": event.newData.yearCreated,
                  "ageGroup": event.newData.ageGroup
    };
    if (window.confirm('Are you sure you want commit changes?')) {
      this.firestoreDbClassService.updateTheRow('class', event.data.id, data);
    } else{
      event.confirm.reject();
    }
  }

}
