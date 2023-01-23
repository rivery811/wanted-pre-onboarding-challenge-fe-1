import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signUpApi } from "../../api/auth";
import { useRouter } from "next/router";
const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChk, setPasswordChk] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(true);
  const sigbUp = useMutation(signUpApi, {
    onSuccess: (data) => {
      alert(data.message);
      router.push("/todos");
    },
    onError: (e) => {
      alert("회원가입에 실패했습니다.");
    },
  });
  useEffect(() => {
    hadleValidation();
  }, [email, password, passwordChk]);
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handlePassWordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const handlePassWordChkInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPasswordChk(e.target.value);
  };
  const hadleValidation = () => {
    const reg = "[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*";
    const emailVali = email.match(reg);
    const passVali =
      password.length > 7 && passwordChk.length > 7 ? true : false;
    emailVali && passVali ? setDisabledBtn(false) : setDisabledBtn(true);
    return emailVali && passVali;
  };
  const hondleSubmit = () => {
    const chk = password == passwordChk;
    if (!chk) alert("비밀번호가 다릅니다");
    if (hadleValidation() && chk)
      sigbUp.mutate({ email: email, password: password });
  };
  const handleOnKeyPress = () => {};
  return (
    <div className="h-full flex justify-center items-center">
      <div className="grid grid-cols-1 gap-4">
        <div className="text-2xl font-bold">SignUp</div>
        <input
          className="p-2 rounded-md border-solid  border-2 border-gray-800"
          placeholder={"test@test.com"}
          value={email}
          onChange={handleEmailInput}
          name={"id"}
        />

        <input
          className="p-2 rounded-md border-solid  border-2 border-gray-800"
          placeholder={"PW 8글자 이상 입력"}
          value={password}
          onChange={handlePassWordInput}
          onKeyUp={handleOnKeyPress}
          name={"pw"}
          type="password"
        />
        <input
          className="p-2 rounded-md border-solid  border-2 border-gray-800"
          placeholder={"비밀번호 확인"}
          value={passwordChk}
          onChange={handlePassWordChkInput}
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
          SignUp
        </button>

        <a href="/login" className="flex justify-end text-sm">
          go to Login
        </a>
      </div>
    </div>
  );
};
export default SignUp;
