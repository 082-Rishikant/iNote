import React, {useContext} from 'react';
import NoteContext from "../context/notes/NoteContext";
import Noteitem from './Noteitem';


function Notes() {
  const context = useContext(NoteContext);
  const {notes, setNotes}=context;
  return (
    <div className='row my-4'>
      <h2>Your Notes</h2>
        {/* printing notes array using map  */}
      {notes.map((note, id)=>{
        return <Noteitem key={id} note={note}/>
      })}
    </div>
  )
}

export default Notes
