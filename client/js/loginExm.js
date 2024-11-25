// // Revised function with async/await for AJAX calls
// function sub() {
//     // alert("")
//     var username = document.getElementById("id_username").value;
//     var password = document.getElementById("id_password").value;
//     const errorElement = document.getElementById('error');
//     const hasLetter = /[a-zA-Z]/.test(password);

//     // if (password.length == 7 && !hasLetter) {
//     //   alert("")
//     // }
//     if (password.length >= 8 && password.length <= 14 && hasLetter) {
//         if (errorElement != null) {
//             errorElement.textContent = ''; // Clear any previous error messages
//         }
//         $.ajax({
//             type: 'GET',
//             url: '/getStudentPwd/' + password,
//             success: function (result) {
//                 console.log(result[0])
//                 // alert('')
//                 if (result[0] === undefined) {
//                     console.log('oops');
//                     login_mod(username, password);
//                 } else if (result[0].username == username && result[0].password == password) {
//                     localStorage.setItem("data", "student");
//                     var name = result[0].sdt_firstName + " " + result[0].sdt_lastName;
//                     localStorage.setItem("name", name);
//                     localStorage.setItem("stdID", result[0].sdt_ID);
//                     localStorage.setItem("modID", "");
//                     window.location.href = "/assigAndsubDats";
//                 } else {
//                     alert('שם משתמש ו/או הסיסמה שגויים');
//                 }
//             },
//             error: function (jqXhr, textStatus, errorThrown) {
//                 console.log(errorThrown);
//             }
//         });

//     } else {
//         errorElement.textContent = '.יש להכניס בין 8 ל 14 תווים כולל אותיות';
//     }
// }

// // Adjusting login_mod to async
// function login_mod(username, password) {
//     $.ajax({
//         type: 'GET',
//         url: '/getModeratorPwd/' + password,
//         success: function (result) {
//             if (result[0] !== undefined && result[0].username == username) {
//                 var name = result[0].mod_firstName + " " + result[0].mod_lastName;
//                 is_coor(result[0].mod_ID, name);
//             } else {
//                 alert('שם משתמש ו/או הסיסמה שגויים');
//             }
//         },
//         error: function (jqXhr, textStatus, errorThrown) {
//             console.log(errorThrown);
//         }
//     });
// }

// // Adjusting is_coor to async
// function is_coor(id, name) {
//     $.ajax({
//         type: 'GET',
//         url: '/getCoodinator',
//         success: function (result) {
//             if (result[0].coo_ID === undefined || result[0].coo_ID != id) {
//                 localStorage.setItem("data", "moderator");
//             } else {
//                 localStorage.setItem("data", "coordinator");
//             }
//             localStorage.setItem("name", name);
//             localStorage.setItem("modID", id);
//             localStorage.setItem("stdID", "");
//             window.location.href = "/assigAndsubDats";
//         },
//         error: function (jqXhr, textStatus, errorThrown) {
//             console.log(errorThrown);
//         }
//     });
// }

// // No changes needed for showPassword, it remains synchronous
// function showPassword(str) {
//     var x;
//     switch (str) {
//         case 'sdt':
//             x = document.getElementById("sdt_pswd_id");
//             break;
//         case 'mod':
//             x = document.getElementById('mod_pswd_id');
//             break;
//         case 'old':
//             x = document.getElementById('old_pwd_or_ID');
//             break;
//         case 'new':
//             x = document.getElementById('id_new_pwd');
//             break;
//         case 'again':
//             x = document.getElementById('id_again_new_pwd');
//             break;
//         case 'login':
//             x = document.getElementById('id_password');
//             break;
//     }

//     x.type = x.type === 'password' ? 'text' : 'password';
// }

// function resetPassword() {
//     var username = document.getElementById("id_username").value;
//     localStorage.setItem('username', username);
//     window.location.href = "/changepassword";
// }

// function firsTime() {
//     var username = document.getElementById("id_username").value;
//     var password = document.getElementById("id_password");
//     alert('in firsTime')
//     // // if (username != null) {
//     // console.log(username)
//     // alert('null')
//     $.ajax({
//         type: 'GET',
//         url: '/getModByUsername/' + username,
//         success: function (result) {
//             // console.log('result - ', result[0]);
//             if (result[0] != undefined) {
//                 console.log(result[0])
//                 // alert('')
//                 if (result[0].password.length == 7) {
//                     password.value = "הסיסמה נשלחה לך במייל"
//                     sendEmail(result[0].mod_email)
//                 }
//             }
//         },
//         error: function (jqXhr, textStatus, errorThrown) {
//             console.log(errorThrown);
//         }
//     });
// }

// function sendEmail(userEmail) {
//     Email.send({
//         Host: "smtp.gmail.com",
//         Username: "batziona99@gmail.com ",
//         Password: "batzion99",
//         To: userEmail,
//         From: "nafmir26@gmail.com",
//         Subject: "This is the subject",
//         Body: "And this is the body"
//     }).then(
//         message => alert(message)
//     );
// }