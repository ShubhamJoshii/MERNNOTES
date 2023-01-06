import Header from "./Header";
import Footer from "./footer";
import NotesAdder from "./NotesAdder";
import Login from "./Components/Login/Login";
// import Cards from "./Cards";
import Register from "./Components/Register/Register";
import PageNotFound from "./Components/Notfound/Notfound";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<NotesAdder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
          {/* <Route path="" element={}/> */}
        </Routes>
        {/* <Cards /> */}
        <Footer />
      </Router>
    </div>
  );
};
export default App;
