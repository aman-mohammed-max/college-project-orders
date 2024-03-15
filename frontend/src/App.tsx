import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/screens/Home";
import Layout_Home from "@/Layout/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout_Home />}>
          <Route index element={<Home />} />
          <Route path="orders" element={<>hello</>} />
        </Route>
        <Route path="/tb/:id" element={<Layout_Home />}>
          <Route index element={<Home />} />
          <Route path="orders" element={<>hello</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
