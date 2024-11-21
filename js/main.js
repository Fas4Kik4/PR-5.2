document.addEventListener("DOMContentLoaded", function () {
    const authButton = document.querySelector(".button-auth");
    const logoutButton = document.querySelector(".button-out");
    const modalAuth = document.querySelector(".modal-auth");
    const closeAuthButton = document.querySelector(".close-auth");
    const loginForm = document.getElementById("logInForm");
    const loginInput = document.getElementById("login");
    const passwordInput = document.getElementById("password");
    const userNameSpan = document.querySelector(".user-name");

    authButton.addEventListener("click", () => {
        modalAuth.style.display = "flex";
        document.body.style.overflow = "hidden"; // Вимикаємо прокрутку
    });

    closeAuthButton.addEventListener("click", closeModal);

    modalAuth.addEventListener("click", (event) => {
        // Якщо клік поза межами форми, закриваємо модальне вікно
        if (event.target === modalAuth) {
            closeModal();
        }
    });

    if (localStorage.getItem("login")) {
        displayLoggedIn(localStorage.getItem("login"));
    } else {
        displayLoggedOut();
    }

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const login = loginInput.value.trim();
        const password = passwordInput.value.trim();

        clearFormStyles();

        if (!login || !password) {
            if (!login) {
                loginInput.style.borderColor = "red";
            }
            if (!password) {
                passwordInput.style.borderColor = "red";
            }
            alert("Будь ласка, заповніть всі поля.");
            return;
        }

        localStorage.setItem("login", login);
        displayLoggedIn(login);
        closeModal();
    });

    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("login");
        displayLoggedOut();
    });

    function closeModal() {
        modalAuth.style.display = "none";
        document.body.style.overflow = ""; // Відновлюємо прокрутку
        clearFormStyles();
    }

    function displayLoggedIn(login) {
        authButton.style.display = "none";
        logoutButton.style.display = "inline-block";
        userNameSpan.textContent = login;
        userNameSpan.style.display = "inline";
        clearFormStyles();
    }

    function displayLoggedOut() {
        authButton.style.display = "inline-block";
        logoutButton.style.display = "none";
        userNameSpan.textContent = "";
        userNameSpan.style.display = "none";
        loginInput.value = "";
        passwordInput.value = "";
        clearFormStyles();
    }

    function clearFormStyles() {
        loginInput.style.borderColor = "";
        passwordInput.style.borderColor = "";
    }
});
