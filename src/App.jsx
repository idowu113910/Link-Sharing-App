import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Customize from "./pages/Customize";
import ProfileDetails from "./pages/ProfileDetails";
import Preview from "./pages/Preview";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Customize />} />
          <Route path="/profiledetails" element={<ProfileDetails />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
