import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";

import moment from "moment/moment"; 

const Notes = ({notes ,setNotes,searchterm,setsearchterm}) => {


  //sorting////////////////////////////////////////////////////////////
  const [option,setOption] = useState('updateddate')

  const sorting = (e)=>{  
    console.log('shdvchgvsdcghvsd')
    if ( e === "heading") {
      const sortcopy = [...notes];
      sortcopy.sort((a, b) => a.heading.localeCompare(b.heading));
      setNotes(sortcopy);
      console.log('sorted by alphabetically');
    } 
    else if ( e === "updateddate") {
      const sortcopy = [...notes];
      sortcopy.sort((a, b) => {
        return ((b.updateddate > a.updateddate)?1:-1)
      });
      setNotes(sortcopy);
      console.log('sorted by edited');
    }
     else if ( e === "time") {
      const sortcopy = [...notes];
      sortcopy.sort((a, b) => {
        return ((b.time > a.time)?1:-1)
      });
      setNotes(sortcopy);
      console.log('sorted by created',sortcopy);
    }
  setOption(e)
}





  return (
    <div>
      <div className=" w-full mx-auto bg-[#F7F7F7] p-2 pl- border border-stone-200">
        <div className="flex flex-col gap-4 sm:gap-2 w-2/4 mx-auto sm:flex-row">
          <input
            type="search"
            value = {searchterm} 
            onChange={(e)=>setsearchterm(e.target.value)}
            placeholder="Filter notes"
            className="h-8 rounded px-2 font-light border border-stone-200"
          />
          <select id="filter-by" value = {option} onChange = {(e)=>sorting(e.target.value)}  className="h-8 border">
            <option value="updateddate">Sort by last edited</option>
            <option value="heading">Sort by alphabetically</option>
            <option value="time">Sort by recently created</option>
          </select>
        </div>
      </div>
      <div>
      {notes.length < 1 ?
        <p className="text-center p-8"> No notes to Show</p> :
        <div>
        {
        notes.map((note , index) => {
          return (
            <div  key={note.id}>
            <Link to={`/note/${note.id}`}>
              <div className="mt-8 w-3/4 sm:w-2/4 h-20 p-2 border border-stone-200 bg-[#F7F7F7] mx-auto flex flex-col">
                <p className="text-xl text-[#333333]">{note.heading}</p>
                <p className="font-thin text-[#333333] italic">
                  Last Edited:{note.updateddate != 0 ? moment(note.updateddate).fromNow() : moment(note.time).fromNow()}
                </p>
              </div>
            </Link>
            </div>

        )})
        
        }
        </div>
        }
      </div>
      

      <div className="mx-auto w-2/4">
        <Link to="/note/:id">
          <button className="mx-auto mt-4 bg-[#43799c] w-24 h-10 text-white border-b-2 border-[#396684]">
            {" "}
            Create Note
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Notes;
