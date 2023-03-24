function isValidEmail(value) {
  return value && value.includes("@");
}

function isValidPassword(value) {
  return value && value.trim().length >= 7;
}

function isValidName(value) {
  return value;
}

export function validateCredentials({ email, password, name }) {
  let validationErrors = {};

  if (!isValidEmail(email)) {
    validationErrors.email = "유효하지 않은 이메일 주소 형식입니다.";
  }

  if (!isValidPassword(password)) {
    validationErrors.password = "유효하지 않은 비밀번호 형식입니다. 비밀번호는 7자리 이상이어야 합니다.";
  }

  if (!isValidName(name)) {
    validationErrors.name = "입력하신 형식을 다시 한번 확인해주세요.";
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}
