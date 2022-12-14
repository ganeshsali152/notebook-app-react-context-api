import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/NoteContext';
import NoteItem from './NoteItem';
import { useNavigate } from "react-router-dom";

const Notes = (props) => {

    const context = useContext(NoteContext);
    const { notes, getAllNotes, editNote } = context;
    let history = useNavigate();

    useEffect(() => {

        if (localStorage.getItem('token')){
            getAllNotes()
        }
        else{
            history("/login");
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const closeref = useRef(null);
    const [note, setNote] = useState({id:"",etitle:"",etext:""});

    const updateNote = (currentnote) => {
        ref.current.click();
        setNote({
            id: currentnote.id,
            etitle:currentnote.title,
            etext:currentnote.text,
        })
    }

    const onChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value})
    }

    const handleClick = (e) =>{
        editNote(note.id,note.etitle,note.etext);
        closeref.current.click();
        props.showAlert("Updated Successfully", 'success')
    }

    return (
        <>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="text" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="etext" name="etext" value={note.etext} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length===0 || note.etext.length===0} className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row my-3'>
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length===0 && "No Notes to display"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note.id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes