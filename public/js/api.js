var tokenBearer = '';

async function getUsers(callback) {
    let url = '/v1/api/users';
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + tokenBearer
        }
    });

    if (!response.ok) {
        console.error('API request failed:', response.status);
        alert('API request failed');
        return;
    }

    return await response.json();
}

async function getUser(id) {
    let url = '/v1/api/users/'+id;
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + tokenBearer
        }
    });

    if (!response.ok) {
        console.error('API request failed:', response.status);
        alert('API request failed');
        return;
    }

    return await response.json();
}

async function createUser(data) {
    let response = await fetch('/v1/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenBearer
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        console.error('API request failed:', response.status);
        alert('API request failed');
        return;
    }

    return await response.json();
}

async function updateUser(data) {
    let response = await fetch('/v1/api/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenBearer
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        console.error('API request failed:', response.status);
        alert('API request failed');
        return;
    }

    return await response.json();
}

async function deleteUser(id) {
    let response = await fetch('/v1/api/users/'+id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + tokenBearer
        }
    });
}
