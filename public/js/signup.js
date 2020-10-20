const submitButton = document.querySelector('form .btn');
const username_error = document.querySelector('form #username-error');
const email_error = document.querySelector('form #email-error');
const password_error = document.querySelector('form #password-error');
const username_holder = document.querySelector('form #username');
const email_holder = document.querySelector('form #email');
const password_holder = document.querySelector('form #password');

const isValid = (user) => {
    var valid = true;
    if (user.username.includes(" ")) {
        valid = false;
        username_error.innerHTML = "Enter a valid Username";
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email) === false) {
        val = false;
        email_error.innerHTML = "Enter a valid Email"
    }
    if (user.password.includes(' ') || user.password === "") {
        valid = false;
        password_error.innerHTML = "Enter a valid Password";
    }

    if (valid) {
        username_holder.value = '';
        email_holder.value = '';
        password_holder.value = '';
    }

    return valid;
}

submitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    document.querySelector('.alert').style.display = "none";
    username_error.innerHTML = password_error.innerHTML = email_error.innerHTML = '';

    const username = username_holder.value;
    const email = email_holder.value;
    const password = password_holder.value;

    const valid = isValid({
        username, email, password
    });

    if (valid) {
        const user = {
            username,
            email,
            password
        };
        try {
            const res = await axios.post("/signup", user);
            localStorage.setItem("login", true);
            const data = {
                ...res.data.user,
                image_url: `/users/${res.data.user._id}/avatar`
            }
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("token", res.data.token);
            location.href = "/";
        } catch (e) {
            if (e.response.data.emailError) {
                document.querySelector('#email-info').style.display = "block";
            }
            if (e.response.data.usernameError) {
                document.querySelector('#username-info').style.display = "block";
            }
        }
    }
})