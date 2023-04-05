import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "../pages/About";
import Board from "../pages/Board";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import Write from "../pages/Write";
import Header from "../redux/components/headerComponents/Header";

const Router = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);

  return (
    <BrowserRouter>

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/board" element={<Board />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/write" element={<Write />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

//commit
// 요 놈 문제 있어.. 
//     <BrowserRouter>
//       {isLogin === true ? <Header /> : null}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/board" element={<Board />} />
//         <Route path="/detail/:id" element={<Detail />} />
//         <Route path="/write" element={<Write />} />
//         {isLogin === false ?
//           <>
//             <Route path="/login" element={<LogIn />} />
//             <Route path="/signup" element={<SignUp />} />
//           </> : null}
//       </Routes>
//     </BrowserRouter>
//   );
// };

export default Router;
