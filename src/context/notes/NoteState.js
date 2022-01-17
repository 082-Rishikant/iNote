import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState=(props)=>{
  const s1={
    "name":"Rishikant Patel",
    "Roll_No":205120082
  }
  const [state, setState] = useState(s1);
  const update=()=>{
    setTimeout(() => {
      setState({
        name:"Devansh Patel",
        Roll_No:"Pata nahi"
      })
    }, [5000]);
  } 
  return(
    <NoteContext.Provider value={{state, update}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;