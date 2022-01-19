import NoteContext from "./NoteContext";
import {useState} from 'react';

const NoteState=(props)=>{
  const notesInitially=[
    {
      "_id": "61e3e72e99859bf60a42918b",
      "user": "61dfd82086e39b0746891dca",
      "title": "Morning routine",
      "description": "wake up early",
      "tag": "time table",
      "date": "2022-01-16T09:36:46.173Z",
      "__v": 0
    },
    {
      "_id": "61e3e7e99859bf60a42918b",
      "user": "61dfd82086e39b0746891dca",
      "title": "Morning routine",
      "description": "wake up early",
      "tag": "time table",
      "date": "2022-01-16T09:36:46.173Z",
      "__v": 0
    }
    ,
    {
      "_id": "61e3e72e9985bf60a42918b",
      "user": "61dfd82086e39b0746891dca",
      "title": "Morning routine",
      "description": "wake up early",
      "tag": "time table",
      "date": "2022-01-16T09:36:46.173Z",
      "__v": 0
    }
    ,
    {
      "_id": "61e3e72e9859bf60a42918b",
      "user": "61dfd82086e39b0746891dca",
      "title": "Morning routine",
      "description": "wake up early",
      "tag": "time table",
      "date": "2022-01-16T09:36:46.173Z",
      "__v": 0
    }
    ,
    {
      "_id": "61e3e72e99859bf6042918b",
      "user": "61dfd82086e39b0746891dca",
      "title": "Morning routine",
      "description": "wake up early",
      "tag": "time table",
      "date": "2022-01-16T09:36:46.173Z",
      "__v": 0
    }
    ,
    {
      "_id": "61e3e72e99859bf60a4918b",
      "user": "61dfd82086e39b0746891dca",
      "title": "Morning routine",
      "description": "wake up early",
      "tag": "time table",
      "date": "2022-01-16T09:36:46.173Z",
      "__v": 0
    }
  ];
  const [notes, setNotes] = useState(notesInitially);

  // addNote
  const addNote=(title, description, tag)=>{
    // TODO API Call
    // We will created a note object and now concate this object to notes array of object
    const note={
      "title":title,
      "description":description,
      "tag":tag
    } 
    setNotes(notes.concat(note)); // arr.concat() will return an updated array
  }

  // deleteNote
  const deleteNote=(id)=>{
    // TODO API Call
    // update the notes array after deleting a note using filter function
    const newNotes=notes.filter((e)=>{return e._id!==id});
    setNotes(newNotes);
  }

  // editNote
  const editNote=()=>{

  }

  return(
    <NoteContext.Provider value={{notes,addNote, deleteNote, editNote}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;