import logo from "./NotesLogo.png"
const Header = () => {
    return(
        <div className="header">
            <img src={logo} alt="NotesLogo" width="50px" />
            <h1>... Shubham Joshi Notes ...</h1>
        </div>
    )
}

export default Header;