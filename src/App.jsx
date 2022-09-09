import React,{ useState,useEffect } from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Notes from "./components/Notes";
import Note from "./components/Note";
import Header from "./components/Header";


function App() {
const [notes, setNotes] = useState([]);

////////////////////////////////////////searching //////////////////////////////////
const [searchterm , setsearchterm] = useState('');
const [duplicatenotes, setduplicatenotes] = useState(notes);
useEffect(()=>{
    const newuserlist = notes.filter((items)=>{
       return items.heading.toLowerCase().includes(searchterm.toLowerCase());;})
    setduplicatenotes(newuserlist)      
},[searchterm])

////////////////////////////////fetching data from server /////////////////////////
useEffect(()=>{
  fetchNotes()
},[])
const fetchNotes = async()=>{
  const res = await fetch('http://localhost:4000/notes')
  const data = await res.json()
  console.log(data,'data')
  setNotes(data)
}

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
        <Route path="/" element={<Notes
                notes={searchterm.length < 1  ? notes : duplicatenotes}
                setNotes={setNotes} searchterm={searchterm}
                setsearchterm={setsearchterm}
                duplicatenotes = {duplicatenotes}/>} />
        <Route path="/note/:id" element={<Note 

        notes= {notes}
        setNotes = {setNotes}
        />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
