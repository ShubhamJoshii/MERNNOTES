import { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
const NotesAdder = () => {
  const [Topictemp, setTopictemp] = useState("");
  const [Notestemp, setNotestemp] = useState("");
  const [count, setCount] = useState(0);
  let [DisplayArr, setDisplayArr] = useState([]);
  const [Data, setData] = useState({
    Topic: "",
    Notes: "",
  });
  let port = process.env.PORT || 8000;

  const PostData = async (e) => {
    const { Topic, Notes } = Data;
    console.log(Topic);
    console.log(Notes);
    axios.post(`http://localhost:${port}/input`, Data).then((res) => {
      // console.log(res.data.message)
      alert(res.data.message);
    });
    
  };
  
  // fetch("http://localhost:8000/dataDisplay")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // console.log(data);
  //     setDisplayArr(data)
  //   })
  //   .catch(() => {
  //     console.log("error1");
  //   });

  const DisplayData = () => {
    axios.post("http://localhost:8000/display").then((res) => {
      // DisplayArr = res.data.message;
      setDisplayArr(res.data.message);
      // console.log(DisplayArr);
      // alert(DisplayArr);
    });
  };
  const SaveCards = (e) => {
    setData({
      Topic: Topictemp,
      Notes: Notestemp,
    });
    e.preventDefault();
  };

  useEffect(() => {
    if (count > 0) {
      PostData();
    }
    setCount(count + 1);
  }, [Data]);
  
  useEffect(() => {
    DisplayData();
  }, [DisplayArr]);
  return (
    <div>
      <div className="NotesAdder">
        <form action="POST">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => {
              // console.log(e.target.value);
              setTopictemp(e.target.value);
            }}
          />
          <br />
          <textarea
            name=""
            id="NotesAdderNotes"
            placeholder="Write a note..."
            onChange={(e) => {
              // console.log(e.target.value);
              setNotestemp(e.target.value);
            }}
          ></textarea>
          <br />
          <button onClick={SaveCards}>+</button>
        </form>
      </div>
      <div className="AllCards">
        {DisplayArr.map((curr,id) => {
          {/* console.log(curr); */}
          return <Cards Topic={curr.Topic} Notes={curr.Notes} id={curr._id} key = {id}/>;
        })}
      </div>
    </div>
  );
};

export default NotesAdder;
