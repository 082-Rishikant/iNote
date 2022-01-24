import NoteContext from "./NoteContext";
import {useState} from 'react';

const NoteState=(props)=>{
  const host="http://localhost:5000";
  const notesInitially=[];
  const [notes, setNotes] = useState(notesInitially);

  //Fetch All Notes from API
  const fetchAllNotes=async ()=>{
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth_token':localStorage.getItem('token')
      }
    });
    const json=await response.json();
    setNotes(json);
  }

  // addNote to API
  const addNote=async (title, description, tag)=>{
    // API Call
    const response = await fetch(`${host}/api/notes/addnote/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth_token':localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}) 
    });

    const json=await response.json();

    // we can also use fetchAllNotes() function directly, we should use this I think
    // fetchAllNotes(); 

              //or

    // // We will created a note object and now concate this object to notes array of object
    setNotes(notes.concat(json)); // arr.concat() will return an updated array
  }

  // deleteNote
  const deleteNote= async (id)=>{
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'auth_token':localStorage.getItem('token')
      }
    });
    const json=await response.json();

    // we can also use fetchAllNotes() function directly,we should use this I think
    // fetchAllNotes();

              //or

    // update the notes array after deleting a note using filter function
    const newNotes=notes.filter((e)=>{return e._id!==id});
    setNotes(newNotes);
  }

  // editNote
  const editNote= async (id, title, description, tag)=>{
    // TODO API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth_token':localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json=await response.json();

    // we can also use fetchAllNotes() function directly, we should use this I think
    // fetchAllNotes(); 

              //or

    let newNotes=JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id===id)
      {
        newNotes[index].title=title;
        newNotes[index].description=description;
        newNotes[index].tag=tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return(
    <NoteContext.Provider value={{notes,addNote, deleteNote, editNote, fetchAllNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;