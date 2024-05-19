interface ValidateResponse {
  ok: boolean;
  msg: string;
}

export const validateId = (data: string): ValidateResponse => {
  const replacedData = data.replaceAll(" ", "");
  if (replacedData.length > 0 === false) {
    return { ok: false, msg: "아이디를 입력해주세요." };
  }

  if (replacedData.includes("@") === false) {
    return { ok: false, msg: "올바른 형식의 아이디를 입력해주세요." };
  }

  return { ok: true, msg: "good" };
};

export const validatePassword = (data: string): ValidateResponse => {
  const replacedData = data.replaceAll(" ", "");
  if (replacedData.length > 0 === false) {
    return { ok: false, msg: "비밀번호를 입력해주세요." };
  }

  if (replacedData.length >= 6 === false) {
    return { ok: false, msg: "비밀번호는 6자리 이상 이어야합니다." };
  }

  return { ok: true, msg: "good" };
};

export const validateName = (data: string): ValidateResponse => {
  const replacedData = data.replaceAll(" ", "");
  if (replacedData.length > 0 === false) {
    return { ok: false, msg: "이름을 입력해주세요." };
  }

  if (replacedData.length >= 3 === false) {
    return { ok: false, msg: "이름은 세 글자 이상 이어야합니다." };
  }

  return { ok: true, msg: "good" };
};
