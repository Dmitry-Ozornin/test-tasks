import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { fetchUsers } from "../App";
import axios from "axios";
import { Verefications } from "../functions/userVerification";
import { useNavigate, useLocation } from "react-router";

function Login({ returnUser }) {
  console.log(returnUser);
  const location = useLocation();
  const Navigate = useNavigate();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await axios.get("https://api.slingacademy.com/v1/sample-data/users");

      return data.data.users;
    },
  });

  //ловим возврат через браузер
  try {
    console.log(location.state.isLoading);
    if (location.state.returnUser) {
      console.log(location.state.returnUser);
    }
  } catch (error) {
    // console.log(error.message);
  }

  const [inputText, setInputText] = useState("");
  const [inputPassword, setPasswordText] = useState("");
  const [passwordOk, setPasswordOk] = useState(false);
  const [emailOk, setEmailOk] = useState(false);
  const [wrongAutorization, setWrongAutorization] = useState("hidden");
  const [showPassword, setShowPassword] = useState("password");
  const [iconLock, setIconLock] = useState("lock-solid.svg");
  let isTrueLogin = "false";
  try {
    isTrueLogin = location.state.returnUser;
  } catch (error) {
    // console.log(error.message);
  }

  const emailInput = (value) => {
    if (value) {
      setInputText(value);
      setEmailOk(true);
    } else {
      setInputText("");
      setEmailOk(false);
    }
  };

  const passwordInput = (value) => {
    if (value) {
      setPasswordText(value);
      setPasswordOk(true);
    } else {
      setPasswordText("");
      setPasswordOk(false);
    }
  };

  const userVerefications = (e) => {
    e.preventDefault();
    const userData = [inputText, inputPassword];
    isTrueLogin = "true";

    let answer = Verefications(userData, data);

    if (answer == true) {
      Navigate("/auntification", { state: { user: userData, isLogin: isTrueLogin } });
    } else {
      setWrongAutorization("showError");
    }
  };

  // активация кнопки при введенном логине и пароле
  const changeClassButton = () => {
    if (passwordOk === true && emailOk === true) {
      return "login__form__button_active";
    } else {
      return "login__form__button_disable";
    }
  };

  //открыть/закрыть пароль
  const showPasswordBtn = () => {
    if (showPassword === "password") {
      setShowPassword("text");
      setIconLock("unlock-solid.svg");
    } else {
      setShowPassword("password");
      setIconLock("lock-solid.svg");
    }
  };

  const showForm = () => {
    return (
      <>
        <h1 className="login__companyName">
          <img src="Symbol.svg" alt="Logo" style={{ width: "24px", height: "24px" }} />
          Company
        </h1>
        <h2 className="login__title">Sign in to your account to continue</h2>
        <form onSubmit={(e) => userVerefications(e)} className="login__form">
          <input type="email" name="email" value={inputText} className="login__form__inputLogin" required placeholder="     Email" onChange={(e) => emailInput(e.target.value)} />
          <input type={showPassword} name="password" value={inputPassword} className="login__form__inputPassword" required placeholder="     Password" onChange={(e) => passwordInput(e.target.value)} />

          <button type="submit" className={`login__form__button ${changeClassButton()}`}>
            Log in
          </button>
          <p className={`login__form__${wrongAutorization}`}>You entered an incorrect username or password.</p>
        </form>
        <button className="login__form__inputPassword_showPassword" onClick={() => showPasswordBtn()}>
          <img src={iconLock} alt="open/lock password" />
        </button>
      </>
    );
  };

  return (
    <div className="login">
      {!isLoading ? (
        isError ? (
          <h1>
            Authorization is not available, try to reload the page or log in later.
            <br /> If the error persists, please contact us.
          </h1>
        ) : (
          showForm()
        )
      ) : null}
    </div>
  );
}

export default Login;
