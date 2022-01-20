import React, {useContext, useState} from 'react';
import NoteContext from "../context/notes/NoteContext";

function AddNote() {
  // using NoteContext so that we can use, call and update the state that are exported  in NoteState
  const context = useContext(NoteContext);
  const {addNote}=context;
  // making a state for storing the vakues of note from input fields
  const [note, setNote] = useState({title:"", description:"", tag:""})
  // making a arrow function to hanlde the submit button click 
  const handleClick=(e)=>{
    // this is to stop auto reseting of input fields
    e.preventDefault();
    // Now call the addNote function that in NoteState componenet
    addNote(note.title, note.description, note.tag);
  }

  // here We are assigning the input fields value to the note state'object
  const onChange=(e)=>{
    setNote({...note, [e.target.name]:e.target.value})//special function search about it
  }

  return (
    <div className='container my-3'>
      <h2>Add Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title of Note</label>
          <input type="text" className="form-control" id="title" name="title"  aria-describedby="titlehelp" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description of Note</label>
          <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag of Note</label>
          <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
      </form>
    </div>
  )
}

export default AddNote
