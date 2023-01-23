import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../api/auth";
import Link from "next/link";
import { useRouter } from "next/router";
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(true);
  const login = useMutation(loginApi, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      alert(data.message);
      router.push("/todos");
    },
    onError: (e) => {
      alert("로그인에 실패했습니다.");
    },
  });
  useEffect(() => {
    hadleValidation();
  }, [email, password]);
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handlePassWordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const hadleValidation = () => {
    const reg = "[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*";
    const emailVali = email.match(reg);
    const passVali = password.length > 7 ? true : false;
    emailVali && passVali ? setDisabledBtn(false) : setDisabledBtn(true);
    return emailVali && passVali;
  };
  const hondleSubmit = () => {
    console.log(hadleValidation());
    if (hadleValidation()) login.mutate({ email: email, password: password });
  };
  const handleOnKeyPress = () => {};
  return (
    <div className="h-full flex justify-center items-center">
      <div className="grid grid-cols-1 gap-4">
        <div className="text-2xl font-bold">Todo</div>
        <input
          className="p-2 rounded-md border-solid  border-2 border-gray-800"
          placeholder={"test@test.com"}
          value={email}
          onChange={handleEmailInput}
          name={"id"}
        />
        <input
          className="p-2 rounded-md border-solid  border-2 border-gray-800"
          placeholder={"Password"}
          value={password}
          onChange={handlePassWordInput}
          onKeyUp={handleOnKeyPress}
          name={"pw"}
          type="password"
        />
        <button
          disabled={disabledBtn}
          className={`p-2 rounded-md ${
            disabledBtn ? "bg-gray-500" : "bg-indigo-500"
          } text-white`}
          onClick={hondleSubmit}
        >
          Login
        </button>
        <Link href="/signin" className="flex justify-end text-sm">
          go to SignUp
        </Link>
      </div>
    </div>
  );
};
export default Login;
