import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import User from "./Components/User/User";
import Admin from "./Components/Admin/Admin";
import Graph from "./Components/User/Graph/Graph";

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/user" element={<User />} />
            <Route path="/user/graph" element={<Graph />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;