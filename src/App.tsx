import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AddEditContact from "./pages/AddEditContact";
import ContactInfo from "./pages/ContactInfo";
import Home from "./pages/Home";
import { DarkModeToggle } from "./theme/DarkModeToggle";

function App() {
  return (
    <div id="App">
      <ToastContainer />
      <DarkModeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddEditContact />} />
        <Route path="/update/:id" element={<AddEditContact />} />
        <Route path="/view/:id" element={<ContactInfo />} />
      </Routes>
    </div>
  );
}

export default App;
