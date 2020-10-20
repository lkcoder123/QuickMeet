const submitButton = document.querySelector('form .btn');
const email_error = document.querySelector('form #email-error');
const password_error = document.querySelector('form #password-error');
const email_holder = document.querySelector('form #email');
const password_holder = document.querySelector('form #password');
const message_holder = document.querySelector('from #message');

const isValid = (user) => {
    var valid = true;

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email) === false) {
        val = false;
        email_error.innerHTML = "Enter a valid Email"
    }
    if (user.password.includes(' ') || user.password === "") {
        valid = false;
        password_error.innerHTML = "Enter a valid Password";
    }

    if (valid) {
        email_holder.value = '';
        password_holder.value = '';
    }

    return valid;
}

submitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    email_error.innerHTML = password_error.innerHTML = '';

    const user = {
        email: email_holder.value,
        password: password_holder.value
    };

    const valid = isValid(user);

    if (valid) {
        try {
            const res = await axios.post("/login", user);
            localStorage.setItem("login", true);
            const data = {
                ...res.data.user,
                image_url: `/users/${res.data.user._id}/avatar`
            }
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("token", res.data.token);
            location.href = "/";
        } catch (e) {
            console.log(e.response.data.error);
            document.querySelector('.alert').style.display = "block";
        }
    }
})
