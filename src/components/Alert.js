import React from 'react'

export default function Alert(props) {
  const capitalize=(word)=>{
    if(word==="danger")
      word="Failed";
    word=word.toLowerCase();
    return word.charAt(0).toUpperCase()+word.slice(1);
  }
  return (
    <div style={{height:50}}>
      {props.alert && <div className={`alert alert-${props.alert.message} alert-dismissible fade show`} role="alert">
      <strong>{capitalize(props.alert.message)}</strong>:{props.alert.explanation}
      </div>}
    </div>
  )
}
