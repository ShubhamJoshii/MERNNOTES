import axios from "axios";
const Cards = (props) =>{
    const delteNotes = (e) =>{
        let Delete = {
            _id : e.target.name
        }
        // console.log(Delete);
        let port = process.env.PORT || 8000;

        axios.post(`http://localhost:${port}/deleteData`,Delete).then((res)=>{
            console.log("Deleted Note")
        })
    }
    return(
        <div className="Cards">
            <div className="CardsTopic"> 
                <h1>{props.Topic}</h1>
            </div>
            <div className="CardsNotes">
                <p>{props.Notes}</p>
            </div>
            <button id="CardsButton" onClick={delteNotes} name={props.id}>+</button>
        </div>
    )
}
export default Cards;