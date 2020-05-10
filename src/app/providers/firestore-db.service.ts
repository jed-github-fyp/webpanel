import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FirestoreDbService {

  constructor(private db: AngularFirestore) { }

  getData(collection) {
    // return this.db.collection('student').valueChanges();
    return this.db.collection(collection).snapshotChanges().pipe(
      map(docArray => {
        return docArray.map(doc => {
          console.log('==', {id: doc.payload.doc.id,
          ...(doc.payload.doc.data() as  {})
          });
          return {
            id: doc.payload.doc.id,
            ...(doc.payload.doc.data() as  {})
          }
        })
      })
    )
  }

  async insertData(collection, data) {
    try{
      const result = await this.db.collection(collection).add(data);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  deleteTheRow(collection, id) {
    const result = this.db.doc(`${collection}/${id}`).delete();
    return result;
    // try{
    //   // const result = this.db.doc(`${'student'}/${id}`).delete();
    //   // return result;
    // } catch (error) {
    //   throw new Error(error);
    // }
  }

  async updateTheRow(collection, id, updatedData) {
    const result = await this.db.doc(`${collection}/${id}`).update(updatedData);
    return result;
  }
}
