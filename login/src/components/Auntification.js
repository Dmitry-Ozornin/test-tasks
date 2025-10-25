import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { CodeAutefication } from "../functions/userVerification";
import { useNavigate } from "react-router";

function Auntification() {
  "use server";

  const location = useLocation();
  const navigate = useNavigate();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await axios.get("https://api.slingacademy.com/v1/sample-data/users");

      return data.data.users;
    },
  });

  if (isError) {
    console.log(isError.message);
  }

  const [buttonContinue, setButtonContinue] = useState("hidden");
  const [errorInput, setErrorInput] = useState("hidden");
  const [errorInputBox, setErrorInputBox] = useState("");
  const [sendCode, setSendCode] = useState("hidden");
  const [num1, setnum1] = useState("");
  const [num2, setnum2] = useState("");
  const [num3, setnum3] = useState("");
  const [num4, setnum4] = useState("");
  const [num5, setnum5] = useState("");
  const [num6, setnum6] = useState("");
  let formValues = [num1, num2, num3, num4, num5, num6];

  useEffect(() => {
    try {
      if (location.state.isLogin !== "false") {
        navigate("/");
      } else {
      }
      location.state.isLogin = "false";
    } catch (error) {
      navigate("/");
    }

    setTimeout(() => {
      location.state.isLogin = "true";
      if (buttonContinue === "hidden") {
        return setSendCode("active");
      }
      location.state.isLogin = "true";
    }, 5000);
  }, []);

  try {
    console.log(location.state.isLogin);

    if (location.state.isLogin === "false") {
      navigate("/");
    } else {
    }
    location.state.isLogin = "false";
  } catch (error) {
    navigate("/");
  }

  const oneNumberInput = (e) => {
    location.state.isLogin = "true";
    console.log(`ввелди число ${location.state.isLogin}`);
    if (e.name === "num1") {
      formValues[0] = e.value;
      if (formValues[0] !== "" && formValues[1] !== "" && formValues[2] !== "" && formValues[3] !== "" && formValues[4] !== "" && formValues[5] !== "") {
        setButtonContinue("active");
        setSendCode("hidden");
        console.log(formValues);
      }
      if (Number(e.value)) {
        setnum1(e.value[0]);
      } else {
        setnum1("");
      }
    } else if (e.name === "num2") {
      formValues[1] = e.value;
      if (formValues[0] !== "" && formValues[1] !== "" && formValues[2] !== "" && formValues[3] !== "" && formValues[4] !== "" && formValues[5] !== "") {
        setButtonContinue("active");
        setSendCode("hidden");
        console.log(formValues);
      }
      if (Number(e.value)) {
        setnum2(e.value[0]);
      } else {
        setnum2("");
      }
    } else if (e.name === "num3") {
      formValues[2] = e.value;
      if (formValues[0] !== "" && formValues[1] !== "" && formValues[2] !== "" && formValues[3] !== "" && formValues[4] !== "" && formValues[5] !== "") {
        setButtonContinue("active");
        setSendCode("hidden");
        console.log(formValues);
      }
      if (Number(e.value)) {
        setnum3(e.value[0]);
      } else {
        setnum3("");
      }
    } else if (e.name === "num4") {
      formValues[3] = e.value;
      if (formValues[0] !== "" && formValues[1] !== "" && formValues[2] !== "" && formValues[3] !== "" && formValues[4] !== "" && formValues[5] !== "") {
        setButtonContinue("active");
        setSendCode("hidden");
        console.log(formValues);
      }
      if (Number(e.value)) {
        setnum4(e.value[0]);
      } else {
        setnum4("");
      }
    } else if (e.name === "num5") {
      formValues[4] = e.value;
      if (formValues[0] !== "" && formValues[1] !== "" && formValues[2] !== "" && formValues[3] !== "" && formValues[4] !== "" && formValues[5] !== "") {
        setButtonContinue("active");
        setSendCode("hidden");
        console.log(formValues);
      }
      if (Number(e.value)) {
        setnum5(e.value[0]);
      } else {
        setnum5("");
      }
    } else {
      formValues[5] = e.value;
      if (formValues[0] !== "" && formValues[1] !== "" && formValues[2] !== "" && formValues[3] !== "" && formValues[4] !== "" && formValues[5] !== "") {
        setButtonContinue("active");
        setSendCode("hidden");
        console.log(formValues);
      }
      if (Number(e.value)) {
        setnum6(e.value[0]);
      } else {
        setnum6("");
      }
    }
  };

  const cheakingTheCode = (e) => {
    e.preventDefault();
    location.state.isLogin = "true";
    console.log(location.state.user[0]);

    try {
      const inputChildren = e.target.children[0].childNodes;
      console.log(inputChildren);
      let codes = [];
      for (let i = 0; i < inputChildren.length - 1; i++) {
        codes.push(inputChildren[i].value);
        console.log(inputChildren[i].value);
      }
      let code = formValues.join("");

      code = code.substring(0, code.length - 1);
      console.log(code);
      const answer = CodeAutefication(location.state.user[0], code, data);
      console.log(answer);

      if (answer === false) {
        setButtonContinue("error");
        setErrorInput("error");
        setErrorInputBox("auntification__form__input_error");
        setnum1("");
        setnum2("");
        setnum3("");
        setnum4("");
        setnum5("");
        setnum6("");
        e.target.reset();

        console.log("ошибка");
      } else {
        console.log("Успешно авторизован");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const clickSendCode = () => {
    // отправка зпроса на код на сервер
    // По логике мы должны передадать пользователя 
  }

  const frontWhow = () => {
    return (
      <>
        {isLoading ? (
          ""
        ) : (
          <>
            <button></button>
            <h1 className="auntification__companyName">
              <img src="Symbol.svg" alt="Logo" style={{ width: "24px", height: "24px" }} />
              Company
            </h1>
            <h2 className="auntification__title">Two-Factor Authentication</h2>
            <p className="auntification__text">Enter the 6-digit code from the Google Authenticator app</p>
            <form className="auntification__form" onSubmit={(e) => cheakingTheCode(e)}>
              <div className="auntification__form__inputsBox">
                <input type="text" name="num1" value={num1} className={`auntification__form__input ${errorInputBox}`} tabIndex="1" min="0" max="9" maxLength="1" onChange={(e) => oneNumberInput(e.target)} />
                <input type="text" name="num2" value={num2} className={`auntification__form__input ${errorInputBox}`} tabIndex="2" min="0" max="9" maxLength="1" onChange={(e) => oneNumberInput(e.target)} />
                <input type="text" name="num3" value={num3} className={`auntification__form__input ${errorInputBox}`} tabIndex="3" min="0" max="9" maxLength="1" onChange={(e) => oneNumberInput(e.target)} />
                <input type="text" name="num4" value={num4} className={`auntification__form__input ${errorInputBox}`} tabIndex="4" min="0" max="9" maxLength="1" onChange={(e) => oneNumberInput(e.target)} />
                <input type="text" name="num5" value={num5} className={`auntification__form__input ${errorInputBox}`} tabIndex="5" min="0" max="9" maxLength="1" onChange={(e) => oneNumberInput(e.target)} />
                <input type="text" name="num6" value={num6} className={`auntification__form__input ${errorInputBox}`} tabIndex="6" min="0" max="9" maxLength="1" onChange={(e) => oneNumberInput(e.target)} />
              </div>
              <p className={`auntification__form__error auntification__form__error_${errorInput} `}>Invalid code</p>
              <button className={`auntification__form__button  auntification__form__button_${buttonContinue}`}>Continue</button>
            </form>
            <button className={`auntification__sendCode auntification__sendCode_${sendCode}`}>отправить код</button>
          </>
        )}
      </>
    );
  };

  return <div className="auntification">{isError ? "" : frontWhow()}</div>;
}

export default Auntification;
