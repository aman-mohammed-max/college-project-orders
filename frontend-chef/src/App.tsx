import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/screens/Home";
import Layout_Home from "@/Layout/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout_Home />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
