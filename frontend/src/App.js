import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./PagesLayout/HomePage";
import { AddBoardPage } from "./PagesLayout/AddBoardPage";
import "./App.css";
// import { Routes, Router } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/AddBoard" element={<AddBoardPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
