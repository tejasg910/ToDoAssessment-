import React, { useState } from "react";
import "../style/Addnote.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Addnote = (props) => {
  const [note, setnote] = useState({
    title: "",
    content: "",
  });

  const onHandleChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  const onHandleClick = async () => {
    const a = await fetch("http://localhost:5000/addnote", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    const res = await a.json();
    if(res.success){
      toast.success('Note added successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    else{
      toast.error('Something wet wrong!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    // console.log(res);

    setnote({title: "", content: ""})
    props.setAddNote(false);
  };

  return (
    <div className="addnotecontainer">
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
<div>


      <div className="addnav">
        <h4>Add a note</h4>
      
      </div>
      <div className="inputs">
        <input
          type="text"
          id="title"
          name="title"
          value={note.title}
          onChange={onHandleChange}
          placeholder="Enter a title"
        />
        <textarea
          name="content"
          onChange={onHandleChange}
          value={note.content}
          id="content"
          cols="30"
          rows="10"
          placeholder="Add your note here"
        ></textarea>

<button className="addnotebtn" onClick={onHandleClick}>Add Note</button>
      </div>
      </div>
    </div>
  );
};

export default Addnote;
