// REGISTER

const registerForm = document.getElementById("registerForm");

if (registerForm) {

  registerForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = registerForm.name.value;
    const college = registerForm.college.value;
    const branch = registerForm.branch.value;
    const year = registerForm.year.value;
    const email = registerForm.email.value;
    const phone = registerForm.phone.value;
    const password = registerForm.password.value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      user => user.email === email
    );

    if (existingUser) {
      alert("Email already registered");
      return;
    }

    const newUser = {
      name,
      college,
      branch,
      year,
      email,
      phone,
      password
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert("Registration Successful");

    window.location.href = "login.html";

  });

}


// LOGIN

const loginForm = document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      user => user.email === email &&
      user.password === password
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    alert("Login Successful");

    window.location.href = "profile.html";

  });

}