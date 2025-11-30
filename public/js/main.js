// Submit login forn
document.getElementById("login_form").addEventListener("submit", function (e) {
    e.preventDefault();

    let _login    = this.querySelector('input[name="login"]').value;
    let _password = this.querySelector('input[name="password"]').value;

    loginRequest(_login, _password, function() {
        document.getElementById('login_form').style.display = 'none';
        document.getElementById('successBlock').style.display = 'block';
        document.getElementById('successBlockInfo').innerHTML = 'Login: ' + _login;
    });

});

// Logout
document.getElementById("logout").addEventListener("click", function (e) {
    e.preventDefault();

    document.getElementById('login_form').style.display   = 'block';
    document.getElementById('successBlock').style.display = 'none';
    tokenBearer = "";
});

function renderTable(data) {
    let _bodyTable = '';

    for (let id in data) {
        let _btnUpdateUser = '<button onClick="evnUpdateUser(' + data[id].id + ')">GET</button>';
        let _btnDelete     = '<button onClick="evnDeleteUser(' + data[id].id + ')">DELETE</button>';

        _bodyTable += "<tr>" +
                "<td>" + data[id].id    + "</td>"+
                "<td>" + data[id].login + "</td>"+
                "<td>" + data[id].phone + "</td>"+
                "<td>" + data[id].pass  + "</td>"+
                "<td>" + 
                    _btnUpdateUser +
                    _btnDelete +
                "</td>"+
            "</tr>";
    }

    document.getElementById('table_users').innerHTML = _bodyTable;
}

// Get users
document.getElementById("get_users").addEventListener("click", async function (e) {
    e.preventDefault();
    let data = await getUsers();
    renderTable(data);
});

async function evnDeleteUser(id) {
    deleteUser(id);
}

async function evnUpdateUser(id) {
    let user = await getUser(id);

    if (user.error) {
        alert(user.error);
        return;
    }

    let form = document.getElementById('edit_form');

    form.querySelector('input[name="id"]').value       = user.id;
    form.querySelector('input[name="login"]').value    = user.login;
    form.querySelector('input[name="phone"]').value    = user.phone;
    form.querySelector('input[name="password"]').value = user.pass;
}

document.getElementById("edit_form").addEventListener("submit", async function (e) {
    e.preventDefault();

    let form = document.getElementById('edit_form');

    let id = form.querySelector('input[name="id"]').value;
    if (id) {
        let data = await updateUser({
            'id':       id,
            'login':    form.querySelector('input[name="login"]').value,
            'phone':    form.querySelector('input[name="phone"]').value,
            'password': form.querySelector('input[name="password"]').value
        });

        if (data && data.error) {
            alert(data.error);
            return;
        }
    } else {
        let data = await createUser({
            'login':    form.querySelector('input[name="login"]').value,
            'phone':    form.querySelector('input[name="phone"]').value,
            'password': form.querySelector('input[name="password"]').value
        });

        if (data && data.error) {
            alert(data.error);
            return;
        }
    }
});

document.getElementById("clear_form").addEventListener("click", async function (e) {
    e.preventDefault();

    let form = document.getElementById('edit_form');
    form.querySelector('input[name="id"]').value       = "";
    form.querySelector('input[name="login"]').value    = "";
    form.querySelector('input[name="phone"]').value    = "";
    form.querySelector('input[name="password"]').value = "";
});
