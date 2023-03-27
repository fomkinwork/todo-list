import React from 'react';
import './App.scss';
import NotesList from './components/MyNotes/NotesList';
import TodoList from './components/TodoList/TodoList';

function App() {
     return (
          <div className="App">
               <NotesList/>
          </div>
     );
}

export default React.memo(App);
