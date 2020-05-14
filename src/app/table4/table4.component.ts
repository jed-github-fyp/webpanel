import { Component, OnInit } from '@angular/core';
import { FirestoreDbService } from '../providers/firestore-db.service';

// @Component({
//   selector: 'app-table4',
//   templateUrl: './table4.component.html',
//   styleUrls: ['./table4.component.css']
// })
// export class Table4Component implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
@Component({
  selector: 'app-table4',
  templateUrl: './table4.component.html',
  styleUrls: ['./table4.component.css']
})
export class Table4Component implements OnInit {

  HomeworkList: Array<any> = [];

  constructor(private firestoreDbAttendanceService: FirestoreDbService) {
    this.getHomeworkList();
  }

  ngOnInit(): void {

  }

  getHomeworkList() {
    this.firestoreDbAttendanceService.getData('attendance').subscribe(result => {
      console.log('result', result);
      this.HomeworkList = result;
    })
  }

  settingtable4 = {
    actions: {
      add: false,
      position: 'hide',
    },
    columns: {
      studentName: {
        title: 'Student Name'
      },
      studentClass: {
        title: 'Student Class'
      },
      studentDate: {
        title: 'Student Date',
      },
      studentSubject: {
        title: 'Student Subject',
      },
      studentStatus: {
        title: 'Student Status',
      }
    }
  };

}
