import React,{ useState,useEffect }  from 'react';
import { Link , useParams } from 'react-router-dom'
import moment from 'moment/moment';


const Note = ({notes,setNotes}) => {
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [update , setupdate] = useState(false);
  const [dateupdated,setdateupdated]= useState('');

let { id } = useParams();


////////////////////////setting title and description for edited item//////////////////////////////////////

useEffect(()=>{
  fetchOpenedNote(id)
},[])
  const fetchOpenedNote = async(id)=>{
    const res = await fetch(`http://localhost:4000/notes/${id}`)
    const data = await res.json()
    // console.log(data,'data')
    if (data.id == id) { 
    setupdate(true);
    setHeading(data.heading);
    setDescription(data.description);
    setdateupdated(moment(data.updateddate==0?data.time:data.updateddate).fromNow()); 
    }return data.id == id
  }

//setting title and description for edited item///////////////////////////////////////////////

  // useEffect(()=>{
  //   const item = notes.find((elem) => {

  //      if (elem.id == id) {        
  //       setupdate(true);
  //       setHeading(elem.heading);
  //       setDescription(elem.description);
  //       setdateupdated(moment(elem.updateddate==0?elem.time:elem.updateddate).fromNow());   
  //      }
  //      return elem.id == id
  //    })
  //  },[])
  
//generating id////////////////////////////////////////////////////////////////////////////////

  function generateId() {
    return Math.random().toString(36).substring(2) +
      (new Date()).getTime().toString(36);
  }

///////////////////// Fetch Note to be edited ///////////////////////////////
const fetchNote = async (id) => {
  const res = await fetch(`http://localhost:4000/notes/${id}`)
  const data = await res.json()
  return data
}


//adding notes//////////////////////////////////////////////////////////////////////////////////
  const addNotes = async ()=> {
    if (!heading) {
      alert('Title not added')
    } 
    else if (heading && update) {
    console.log('item edited')
    const noteToUpdate = await fetchNote(id)
    const updTask = { ...noteToUpdate, heading, description, updateddate: new Date() }

    const res = await fetch(`http://localhost:4000/notes/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })
    const data = await res.json()
      let editednote = notes.map((note) => note.id === id  ?  { ...note, heading, description, updateddate: new Date() } : note
      )
      editednote.sort((a, b) => {
          return ((b.updateddate > a.updateddate)?1:-1)
        });  
    setNotes(editednote)
      // let editednote = notes.map((elem) => {
      //     if (elem.id == id) {                
      //       return { ...elem, heading, description, updateddate: new Date() };
      //     }
      //     return elem;
      //   }
      //   )
      // editednote.sort((a, b) => {
      //   return ((b.updateddate > a.updateddate)?1:-1)
      // });
      // setNotes(editednote);
    }
    else {
      let note = {
        heading,
        description,
        id: generateId(),
        time: new Date(),
        updateddate: 0, 
      };
      const res = await fetch('http://localhost:4000/notes', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(note),
      })
      const data = await res.json()
      console.log(data,'vggv');
      setNotes([...notes, data]);
      console.log(notes)
    }
  }

//deleting notes/////////////////////////////////////////////////////////////////////////////////////////
  const deletenote = async (id) => {
    const res =  await fetch(`http://localhost:4000/notes/${id}`,{
      method: 'DELETE',
    })
    res.status === 200
    ? setNotes(notes.filter((note) => note.id !== id))
    : alert('Error Deleting This Task')
    // const updatedItems = notes.filter((element, index) => {
    //   return element.id !== id;
    // });
    // setNotes(updatedItems);
  };




  return (
    <div>
      <div className=" w-full mx-auto bg-[#F7F7F7] p-2 pl- border border-stone-200">
        <div className="flex flex-col gap-4 sm:flex-row justify-between w-2/4 mx-auto">
          <div>
          <Link to="/">
            <p className="underline">Home</p>
          </Link>
          </div>
          {update ? <p>Edited: {dateupdated}</p> : <></>}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">

        <input type="text" 
        value = {heading}
        onChange = {(e) => setHeading(e.target.value)}
        placeholder="Type a note title"
        className="mt-8 w-3/4 sm:w-2/4 h-12 p-2 rounded border border-stone-200"
        />
        <textarea
          type="text"
          name="details"
          value = {description}
          onChange = {(e) => setDescription(e.target.value)}
          placeholder="Type the note body"
          className="mt-8 font-light p-2 w-3/4 sm:w-2/4 border  border-stone-200 min-h-[15rem]"
        />
      </div>
      <div className="flex gap-4 justify-between items-center mx-auto w-2/4 mt-8">
        <div onClick={()=>deletenote(id)}>
          <Link to="/">
            <button className="mx-auto bg-[#888888] border-2 border-[#717171] text-black ">
              Remove Note
            </button>
          </Link>
        </div>

        {update ?
        <div>
            <div onClick={(e)=>addNotes(e)}>
              <Link to="/">
                <button className="mx-auto bg-[#888888] border-2 border-[#717171] text-black ">
                  Update notes
                  </button>
              </Link>
            </div>
        </div>
          :
        <div>
            <div onClick={(e)=>addNotes(e)}>
              <Link to="/">
                <button className="mx-auto bg-[#888888] border-2 border-[#717171] text-black ">
                  Add notes
                  </button>
              </Link>
            </div>
        </div>
        }

      </div>
    </div>
  )}
export default Note