import React, { useContext,useState, useEffect, useRef } from 'react';
import NoteContext from "../context/notes/NoteContext";
import Noteitem from './Noteitem';
import AddNote from "./AddNote";

function Notes(props) {
  const context = useContext(NoteContext);
  const { notes, fetchAllNotes ,editNote} = context;
  useEffect(() => {
    fetchAllNotes();
    // eslint-disable-next-line
  }, []);

  const [newNote, setNewNote] = useState({id:"",etitle:"", edescription:"", etag:""})

  const refShow = useRef(null);
  const refHide = useRef(null);

  const updateNote = (note) => {
    setNewNote({id:note._id,etitle:note.title,edescription:note.description,etag:note.tag});
    refShow.current.click();
  }

  const submitUpdatedNote = () => {
    editNote(newNote.id,newNote.etitle, newNote.edescription, newNote.etag);
    refHide.current.click();
    props.showAlert("Note Updated successfully", "success");
  }

  const onChange=(e)=>{
    setNewNote({...newNote, [e.target.name]:e.target.value})//special function search about it
  }

  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      {/* <!-- Button trigger modal --> */}
      <button ref={refShow} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title of Note</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="etitlehelp" onChange={onChange} value={newNote.etitle}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description of Note</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={newNote.edescription}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag of Note</label>
                  <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={newNote.etag}/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refHide} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={newNote.etitle.length<5 || newNote.edescription.length<5} type="button" className="btn btn-primary" onClick={() => { submitUpdatedNote() }}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-4'>
        <h2>Your Notes</h2>
        <div className="container mx-1">
          {notes.length===0 && 'No Notes to Display'}
        </div>
        {/* printing notes array using map  */}
        {notes.map((note, id) => {
          return <Noteitem key={id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
        })}
      </div>
    </>

  )
}

export default Notes
