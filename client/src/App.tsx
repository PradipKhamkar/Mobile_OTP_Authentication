import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/common/Loader";
import { useAppDispatch, useAppSelector } from "./hook";
import AccountInfo from "./pages/AccountInfo";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import { dispatchGetLoggedUser } from "./redux/getLoginUserSlice";

const App = () => {
  const { loading, success: isAuthUser } = useAppSelector(
    (state) => state.getLoggedUser
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(dispatchGetLoggedUser());
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!isAuthUser ? <Register /> : <AccountInfo />}
        />

        <Route
          path="/login"
          element={!isAuthUser ? <Login /> : <AccountInfo />}
        />

        <Route
          path="/verify"
          element={!isAuthUser ? <VerifyOtp /> : <AccountInfo />}
        />

        <Route
          path="/accountinfo"
          element={!isAuthUser ? <Register /> : <AccountInfo />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
