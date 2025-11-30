function loginRequest(_login, _password, callback) {
    return fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: _login,
            password: _password
        })
    })
    .then(response => {
        if (!response.ok) {
            alert(response.status + " " + response.statusText + " (Try login/pass: root/root)");
            throw new Error("Login failed");
        }
        return response.json();
    })
    .then(data => {
        tokenBearer = data.token;
        console.log('JWT Token:', tokenBearer);
        callback();
    })
    .catch(error => {
        console.error("Error:", error);
    });
}