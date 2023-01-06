import {useEffect, useState} from "react";
import Cards from "./Cards";

const NotesAdder = () => {
  const [cardsData,setcardsData] = useState({
    Title:"",Notes:""
  })
  const [refresh,setRefresh] = useState(0);
  const SaveCards = async(e)=>{
    e.preventDefault();
    const {Title,Notes} = cardsData
    console.log(Title,Notes);
    try{
      const res = await fetch("/SaveNotes",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({Title,Notes})
      })
      const Data = await res.json()
      alert(Data.message)
      setRefresh(refresh+1)
    }catch(err){
      console.log(err)
    }
  }

  const handleInput = (e)=>{
    const name = e.target.name
    const value = e.target.value
    setcardsData({...cardsData,[name]:value})    
  }

  return (

    <div>
      <div className="NotesAdder">
        <form method="POST">
          <input
            type="text"
            placeholder="Title"
            name="Title"
            onChange={handleInput}
          />
          <br />
          <textarea
            id="NotesAdderNotes"
            name="Notes"
            onChange={handleInput}
            placeholder="Write a note..."
          ></textarea>
          <br />
          <button onClick={SaveCards}>+</button>
        </form>
      </div>
      <Cards refresh={refresh} />
    </div>
  );
};

export default NotesAdder;
