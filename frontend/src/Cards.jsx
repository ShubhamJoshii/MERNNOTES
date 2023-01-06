// import axios from "axios";
import { useEffect, useState } from "react";

const Cards = ({refresh}) => {
  const [Cards, setCards] = useState([{}]);

  const AllCards = async () => {
    try {
      const res = await fetch("/fetchNotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const Data = await res.json();
      console.log(Data.Notes);
      // console.log(Data._id)
      setCards(Data.Notes);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNote = async(e)=>{
    console.log(e.target.name)

  }
  useEffect(() => {
    AllCards();
    // console.log(cardsData)
  }, [refresh]);

  // useEffect(() => {
  //   console.log(Cards);
  // }, [Cards]);

  return (
    <div className="cardsOuter">
      {Cards.map((curr,id) => {
        return (
          <div className="Cards" key={curr.id}>
            <div className="CardsTopic">
              <h1>{curr.Title}</h1>
            </div>
            <div className="CardsNotes">
              <p>{curr.Notes}</p>
            </div>
            <button id="CardsButton" name={id} onClick={deleteNote}>X</button>
          </div>
        );
      })}
    </div>
  );
};
export default Cards;
