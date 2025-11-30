# test_task

# DOCKER: https://github.com/GnomeVault/test_task/blob/main/docker.zip
# DATA FOR TEST: php bin/console doctrine:fixtures:load
# DATA BASE: https://github.com/GnomeVault/test_task/blob/main/testdb.sql

##################### routes.yaml #####################
# GET /v1/api/users
app_get_users:
    path: /v1/api/users/{id}
    controller: App\Controller\RestApiController::get
    methods: GET

# POST /v1/api/users
app_create_user:
    path: /v1/api/users
    controller: App\Controller\RestApiController::post
    methods: POST

# PUT /v1/api/users
app_update_user:
    path: /v1/api/users
    controller: App\Controller\RestApiController::put
    methods: PUT

# DELETE /v1/api/users/{id}
app_delete_user:
    path: /v1/api/users/{id}
    controller: App\Controller\RestApiController::delete
    methods: DELETE

################## JS ###################################
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
