import React, {useContext, useEffect} from 'react';
import NoteContext from '../context/notes/NoteContext';

function About() {
  const a = useContext(NoteContext)
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <h1>This is About {a.state.name} and his Roll no. {a.state.Roll_No}</h1>
    </div>
  )
}

export default About
