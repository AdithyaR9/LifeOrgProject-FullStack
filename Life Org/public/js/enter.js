function showPwdTxt() {
    const x = document.getElementById("pwdShow");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }