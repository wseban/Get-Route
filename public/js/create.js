// Sign up Form - create an account for the user
const createFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#name-create").value.trim();
  const email = document.querySelector("#email-login-create").value.trim();
  const password = document
    .querySelector("#password-login-create")
    .value.trim();

  if (username && email && password) {
    const response = await fetch("/api/users/", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in");
    }
  }
};

document
  .querySelector(".create-form")
  .addEventListener("submit", createFormHandler);
