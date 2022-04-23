import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import User from "./Components/User/User";
import Admin from "./Components/Admin/Admin";
import Form from "./Components/Admin/Initial Form/Form"

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<Form />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;