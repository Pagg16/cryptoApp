import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import { Navbar, Footer, Main } from "../index";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
