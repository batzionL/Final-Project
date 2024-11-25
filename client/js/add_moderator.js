jQuery(function ($) {
    const random7DigitNumber = getRandom7DigitNumber();
    document.getElementById("mod_pswd_id").value = random7DigitNumber;
})

function getRandom7DigitNumber() {
    // Generate a random number between 100000 and 999999
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function add_mod() {
    var id = document.getElementById("id_mod").value;
    if (id.length < 9 || id.length > 9) {
        alert("מס' ת.ז. לא תקין")
    }
    else {
        checkIfModExist(document.getElementById('id_mod').value);

        // var password = document.getElementById("mod_pswd_id").value;
        // console.log(password);

        var flag = localStorage.getItem('flag')
        // alert('in add_student')

        if (flag === 'false') {
            // console.log('flag - ', flag)
            $.ajax({
                type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                url: '/addmoderator', // the url where we want to POST
                contentType: 'application/json',
                data: JSON.stringify({
                    "username": $("#mod_username_id").val(),
                    "password": $("#mod_pswd_id").val(),
                    "mod_firstName": $("#firstName_mod_id").val(),
                    "mod_lastName": $("#lastName_mod_id").val(),
                    "mod_ID": $("#id_mod").val(),
                    "mod_email": $("#email_mod_id").val()
                }),
                processData: false,
                encode: true,
                success: function (data, textStatus, jQxhr) {
                    // console.log(data[0])
                    // alert('seccess')
                    location.href = "/assigAndsubDats"
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    // console.log('tring')
                    console.log(errorThrown);
                }
            });
        }
    }
}

function checkIfModExist(id) {
    // console.log('id - ', id)
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
        url: '/moderator/' + id,
        success: function (result) {
            // console.log(result[0])
            if (result[0] != undefined) {
                alert('מנחה זה כבר קיים');
                localStorage.setItem('flag', "true");
                location.reload();
            }
            else {
                localStorage.setItem('flag', 'false')
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

function add_coor(){
    location.href = "/addcoordinator"
}