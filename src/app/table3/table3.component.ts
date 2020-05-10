import { Component, OnInit } from '@angular/core';
import { FirestoreDbService } from '../providers/firestore-db.service';

@Component({
  selector: 'app-table3',
  templateUrl: './table3.component.html',
  styleUrls: ['./table3.component.css']
})
export class Table3Component implements OnInit {

  AttendanceList: Array<any> = [];

  constructor(private firestoreDbAttendanceService: FirestoreDbService) {
    this.getAttendanceList();
  }

  ngOnInit(): void {

  }

  getAttendanceList() {
    this.firestoreDbAttendanceService.getData('attendance').subscribe(result => {
      console.log('result', result);
      this.AttendanceList = result;
    })
  }

  settingtable3 = {
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
      studentTemperature: {
        title: 'Student Temperature',
      },
      studentStatus: {
        title: 'Student Status',
      }
    }
  };

}
