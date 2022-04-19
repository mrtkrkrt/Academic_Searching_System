import { BrowserRouter, Route, Routes } from "react-router-dom";
import Choose from "./Components/Choose";

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/choose" element={<Choose />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;