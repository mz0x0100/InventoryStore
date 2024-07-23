import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextMuted } from "../components/Text";
import InputWithIcon from "../components/InputWithIcon";
import PasswordField from "../components/PasswordField";
import { LoginRole, useLoginUser } from "../utils/apicalls/authentication";
import { useCurrentUser } from "../utils/contexts/CurrentUserContext";
import Overlay from "../components/Overlay";
import { LoaderRegular } from "../components/Loader";

interface Props {
  loginRole: LoginRole;
}

const LoginView: React.FC<Props> = ({ loginRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSucceeded, setLoginSucceeded] = useState(false);
  const [showError, setShowError] = useState(false);
  const loginUser = useLoginUser(loginRole);
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const [show, setShow] = useState(false);
  const [loginBtnAttrs, setLoginBtnAttrs] = useState<{
    className: string;
    text: string;
  }>({ className: "", text: "Login" });

  useEffect(() => {
    if (currentUser?.isAuthenticated) {
      if (currentUser.role != "staffuser")
        navigate(`/${currentUser.role === "admin" ? "admin" : "su"}/products`);
      else navigate("/staff/profile");
    } else if (currentUser !== null && !currentUser.isAuthenticated) {
      setShow(true);
    }
    if (loginSucceeded) {
      if (loginRole != "staffuser")
        navigate(`/${loginRole === "admin" ? "admin" : "su"}/products`);
      else navigate("/staff/profile");
    }
  }, [currentUser, loginSucceeded]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.name == "username"
      ? setUsername(e.target.value)
      : setPassword(e.target.value);
  };

  const onApiRequestFailed = () => {
    console.log("APIRequestFailed");
    setLoginBtnAttrs({
      className: "",
      text: "Login",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginBtnAttrs({
      className: "cursor-not-allowed opacity-70",
      text: "Signing in...",
    });
    loginUser(username, password, setLoginSucceeded, onApiRequestFailed);
  };

  return show ? (
    <div className="h-screen">
      <div className="items-center justify-center py-16 px-2 md:px-8">
        <div className="mt-8 rounded-xl shadow-2xl mx-auto my-auto theme-bg md:w-[600px] lg:w-[700px] px-2 py-6 md:p-8">
          <TextMuted className="text-2xl font-weight-800">
            {loginRole == "admin" ? "Admin" : "Staff User"} Login
          </TextMuted>
          <br />
          <form action="" onSubmit={handleSubmit}>
            <InputWithIcon
              type="text"
              placeholder="Enter username"
              name="username"
              iconclass="fa-user"
              required
              onChange={handleChange}
            />

            <PasswordField
              name="password"
              placeholder="Enter password"
              iconclass="fa-lock"
              required
              onChange={handleChange}
            />
            <button
              type="submit"
              className={`${loginBtnAttrs.className} p-2 rounded-md text-white font-weight-500 bg-primary mt-6 w-full hover:opacity-80`}
            >
              {loginBtnAttrs.text}
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Overlay>
      <div className="w-full pt-62">
        <LoaderRegular text="" />
      </div>
    </Overlay>
  );
};

export default LoginView;
