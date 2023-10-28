import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
        <Navbar />
        <div style={{ backgroundColor: "#9ca3af", minHeight: "100vh" }}>
        <Routes>
          <Route>
            <Route index element={<Home />}></Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
