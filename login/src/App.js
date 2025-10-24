import Auntification from "./components/Auntification";
import Login from "./components/login";

import "./index.css";
import { Route, Routes } from "react-router";

// import axios from "axios";

// export const fetchUsers = async () => {
//   const data = await axios.get("https://imdb.iamidiotareyoutoo.com/search?tt=tt2250912");
//   return data.creator;
// };

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auntification" element={<Auntification />} />
      </Routes>
    </>
  );
}

export default App;
