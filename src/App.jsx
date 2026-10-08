import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import Home from "./pages/home.jsx";
import Team from "./pages/team.jsx";
import Contact from "./pages/contact.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer/>
    </BrowserRouter>
  );
}

export default App;