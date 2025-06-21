const button = document.querySelector("#log_btn");

button.addEventListener("click", () => {
  let message = document.querySelector("#msg");
  message.textContent = "Login / SignUp is disabled";

  setTimeout(() => {
    message.textContent = "";
  }, 2000);
});
