import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/screens/Home";
import Layout_Home from "@/Layout/Home";
import Orders_table from "@/screens/orders/table";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout_Home />}>
          <Route index element={<Home />} />
          <Route path="tb/:id" element={<Home />} />
        </Route>

        <Route path="/orders" element={<Layout_Home />}>
          <Route index element={<>hello</>} />
          <Route path="tb/:id" element={<Orders_table />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
