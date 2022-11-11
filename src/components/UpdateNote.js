import React, { useState } from "react";
import "../style/Addnote.css";

const UpdateNote = (props) => {
    console.log(props)
  const [note, setnote] = useState({
    title: props.title,
    content: props.content,
  });
const newNote = JSON.parse(JSON.stringify(note));
console.log('deep copy',newNote)
  const onHandleChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  const onHandleClick = async () => {
    // const a = await fetch("http://localhost:5000/addnote", {
    //   method: "POST", // or 'PUT'
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(note),
    // });

    // const res = await a.json();
    // console.log(res);

    props.onChangeEdit(newNote)

    // setnote({title: "", content: ""})
  };

  return (
    <div className="addnotecontainer">
      <div className="addnav">
        <h4>Update a note</h4>
        <button onClick={onHandleClick}>Click to Save Note</button>
      </div>
      <div className="inputs">
        <input
          type="text"
          id="title"
          name="title"
          value={newNote.title}
          onChange={onHandleChange}
          placeholder="Enter a title"
        />
        <textarea
          name="content"
          onChange={onHandleChange}
          value={newNote.content}
          id="content"
          cols="30"
          rows="10"
          placeholder="Add your note here"
        ></textarea>
      </div>
    </div>
  );
};

export default UpdateNote;
