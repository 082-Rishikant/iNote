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
      "_id": "61e3e72e99859bf60a42918b",
      "user": "61dfd82086e39b0746891dca",
      "title": "Morning routine",
      "description": "wake up early",
      "tag": "time table",
      "date": "2022-01-16T09:36:46.173Z",
      "__v": 0
    }
    ,
    {
      "_id": "61e3e72e99859bf60a42918b",
      "user": "61dfd82086e39b0746891dca",
      "title": "Morning routine",
      "description": "wake up early",
      "tag": "time table",
      "date": "2022-01-16T09:36:46.173Z",
      "__v": 0
    }
    ,
    {
      "_id": "61e3e72e99859bf60a42918b",
      "user": "61dfd82086e39b0746891dca",
      "title": "Morning routine",
      "description": "wake up early",
      "tag": "time table",
      "date": "2022-01-16T09:36:46.173Z",
      "__v": 0
    }
    ,
    {
      "_id": "61e3e72e99859bf60a42918b",
      "user": "61dfd82086e39b0746891dca",
      "title": "Morning routine",
      "description": "wake up early",
      "tag": "time table",
      "date": "2022-01-16T09:36:46.173Z",
      "__v": 0
    }
    ,
    {
      "_id": "61e3e72e99859bf60a42918b",
      "user": "61dfd82086e39b0746891dca",
      "title": "Morning routine",
      "description": "wake up early",
      "tag": "time table",
      "date": "2022-01-16T09:36:46.173Z",
      "__v": 0
    }
  ];
  const [notes, setNotes] = useState(notesInitially)
  return(
    <NoteContext.Provider value={{notes, setNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;