import React, { useEffect, useState } from "react";
import "../style/Home.css";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Addnote from "./Addnote";
import UpdateNote from "./UpdateNote";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

  const [update, setUpdate] = useState(false);

  
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [addNote, setAddNote] = useState(false);

  const [keyForEdit, setKeyForEdit] = useState("");

    //creating the state for rerender the component 
  const [key, setKey] = useState(null);
  const [allnotes, setallnotes] = useState({});
  const getNotes = async () => {

    //fetching all notes from backend 
    const a = await fetch("http://localhost:5000/getnotes");
    const res = await a.json();
    const notes = res.notes;
    // console.log(notes)
    setallnotes(notes);
  };

  const deleteNote = async (_id) => {

    //deleting the note from the backend 
    const a = await fetch("http://localhost:5000/deletenote", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    });

    const res = await a.json();
    if(res.success){
      toast.success('Note deleted successfully!', {
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
    // console.log(res)
    setKey(Math.random());
  };

  const onHandleEdit = async (_id, title, content) => {
    //clicked on the edit button
    setUpdate(true);
    window.scrollTo(0, 0);

    setEditContent(content);
    setEditTitle(title);
    setKeyForEdit(_id);
  };
  const onHandleDelete = (key) => {
    // console.log(key)
    deleteNote(key);
  };
  const onChangeEdit = async (note) => {
    console.log("helow on onchange edit called");
    console.log(note);
    const a = await fetch("http://localhost:5000/updatenote", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyForEdit, note }),
    });

    const res = await a.json();
    if(res.success){
      toast.success('Note updated successfully!', {
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
      toast.error('something went wrong!', {
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
    setUpdate(false);
    setKey(Math.random());
  };

  const addNoteBtn = () => {
    window.scrollTo(0, 0);
    setAddNote(true);
  };

  useEffect(() => {
    getNotes();
  }, [key, addNote]);

  return (
    <div className="maincontainer">
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
      <h1 className="myheading">My Notes</h1>

      <div>{addNote && <Addnote setAddNote={setAddNote} />}</div>

      {update && (
        <div>
          <UpdateNote
            title={editTitle}
            content={editContent}
            onChangeEdit={onChangeEdit}
          />
        </div>
      )}
    <div className="notescontainer">

   
      {Object.keys(allnotes).map((note) => {
        console.log("this is ", note);
        return (
          <div key={allnotes[note]._id} className="notes">
            <div className="note">
              <div>
                <h3 className="noteheading">{allnotes[note].title}</h3>
              </div>
              <div className="notecontent">
                {allnotes[note].content}
                <div className="contentbtn">
                  <FiEdit
                    className="editbtn"
                    onClick={() => {
                      onHandleEdit(
                        allnotes[note]._id,
                        allnotes[note].title,
                        allnotes[note].content
                      );
                    }}
                  />
                  <AiOutlineDelete
                    className="deletebtn"
                    onClick={() => {
                      onHandleDelete(allnotes[note]._id);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
       </div>
      <div className="flex justify-centre addbtndiv">
        {!addNote && (
          <button className="addbtn" onClick={addNoteBtn}>
            +
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
