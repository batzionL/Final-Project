function sub(e) {
    e.preventDefault()
    // alert("")
    var username = document.getElementById("id_username").value;
    var password = document.getElementById("id_password").value;
    // var errorElement = document.getElementById('error');
    getStudentUsername(username, password);
    getModeratorUsername(username, password);
}


// Adjusting is_coor to async
function is_coor(id, name) {
    $.ajax({
        type: 'GET',
        url: '/getCoodinator',
        success: function (result) {
            if (result[0].coo_ID === undefined || result[0].coo_ID != id) {
                localStorage.setItem("data", "moderator");
            } else {
                localStorage.setItem("data", "coordinator");
            }
            localStorage.setItem("name", name);
            localStorage.setItem("modID", id);
            localStorage.setItem("stdID", "");
            window.location.href = "/assigAndsubDats";
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function showPassword(str) {
    var x;
    switch (str) {
        case 'sdt':
            x = document.getElementById("sdt_pswd_id");
            break;
        case 'mod':
            x = document.getElementById('mod_pswd_id');
            break;
        case 'old':
            x = document.getElementById('old_pwd_or_ID');
            break;
        case 'new':
            x = document.getElementById('id_new_pwd');
            break;
        case 'again':
            x = document.getElementById('id_again_new_pwd');
            break;
        case 'login':
            x = document.getElementById('id_password');
            break;
    }

    x.type = x.type === 'password' ? 'text' : 'password';
}

function resetPassword() {
    var username = document.getElementById("id_username").value;
    localStorage.setItem('username', username);
    window.location.href = "/changepassword";
}

function firsTime() {
    var username = document.getElementById("id_username").value;
    var password = document.getElementById("id_password").value;

    getStudentUsername(username, password);
    getModeratorUsername(username, password);
}

function sendEmail(userEmail, password) {
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: '/sendEmail', // the url where we want to POST
        contentType: 'application/json',
        data: JSON.stringify({
            "email": userEmail,
            "password": password
        }),
        processData: false,
        encode: true,
        success: function (data, textStatus, jQxhr) {
            alert('הסיסמה לכניסה ראשונה נשלחה לך במייל');
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function getStudentUsername(username, sdtPwd) {
    $.ajax({
        type: 'GET',
        url: '/getStudentPwd/' + username,
        success: function (result) {
            if (result[0] != undefined) {
                if (sdtPwd == "") {
                    sendEmail(result[0].sdt_email, result[0].password)
                } else if (sdtPwd.length >= 8 && sdtPwd.length <= 14) {
                    if (sdtPwd == result[0].password) {
                        // console.log(sdt)
                        localStorage.setItem("data", "student");
                        var name = result[0].sdt_firstName + " " + result[0].sdt_lastName;
                        localStorage.setItem("name", name);
                        localStorage.setItem("stdID", result[0].sdt_ID);
                        localStorage.setItem("modID", "");
                        window.location.href = "/assigAndsubDats";
                    }
                } else if (sdtPwd.length == 6) {
                    if (sdtPwd == result[0].password) {
                        resetPassword();
                    }
                }
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

}

function getModeratorUsername(username, modPwd) {
    $.ajax({
        type: 'GET',
        url: '/getModeratorPwd/' + username,
        success: function (result) {
            if (result[0] != undefined) {
                if (modPwd == "") {
                    sendEmail(result[0].mod_email, result[0].password)
                } else if (modPwd.length >= 8 && modPwd.length <= 14) {
                    // console.log('rrslt', result[0])
                    if (modPwd == result[0].password) {
                        var name = result[0].mod_firstName + " " + result[0].mod_lastName;
                        is_coor(result[0].mod_ID, name);
                    }
                } else if (modPwd.length == 6) {
                    if (modPwd == result[0].password) {
                        resetPassword();
                    }
                }
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

}