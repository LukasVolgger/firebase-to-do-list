import { Component } from '@angular/core';
import { Firestore, collectionData, collection, setDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebase-to-do-list';
  todos: Array<any>;
  todoInput: string = '';

  todos$: Observable<any>; // todos$ is a variable that changes every time data is updated in the firestore
  constructor(private firestore: Firestore) { // Here the Firestore object is imported
    const coll = collection(firestore, 'todos'); // Here the collection which was created in the Firestore is assigned to the constant coll
    this.todos$ = collectionData(coll);

    this.todos$.subscribe((todosFromFirestore) => {
      console.log('New to-do\'s: ', todosFromFirestore);
      this.todos = todosFromFirestore;
    })
  }

  addTodo() {
    console.log(this.todoInput);
    const coll = collection(this.firestore, "todos");
    return setDoc(doc(coll), { name: this.todoInput });
  }
}
