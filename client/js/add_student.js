jQuery(function ($) {
    const random7DigitNumber = getRandom7DigitNumber();
    document.getElementById("sdt_pswd_id").value = random7DigitNumber;
})

function getRandom7DigitNumber() {
    // Generate a random number between 1000000 and 9999999
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function add_studen(e) {
    e.preventDefault();
    var id = document.getElementById("id_sdt").value;
    if (id.length < 9 || id.length > 9) {
        alert("מס' ת.ז. לא תקין")
    }
    else {
        checkIfSdudentExist(document.getElementById('id_sdt').value);

        var flag = localStorage.getItem('flag')
        // alert('in add_student')
        if (flag == 'false') {
            $.ajax({
                type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                url: '/addstudent', // the url where we want to POST
                contentType: 'application/json',
                data: JSON.stringify({
                    "username": $("#sdt_username_id").val(),
                    "password": $("#sdt_pswd_id").val(),
                    "sdt_firstName": $("#firstName_sdt_id").val(),
                    "sdt_lastName": $("#lastName_sdt_id").val(),
                    "sdt_ID": $("#id_sdt").val(),
                    "sdt_email": $("#email_sdt_id").val(),
                    "id_pjt": "",
                    "id_grade": "",
                    "id_prop_rpt": "",
                    "id_alfa_rpt": "",
                    "id_beta_rpt": "",
                    "id_final_rpt": ""
                }),
                processData: false,
                encode: true,
                success: function (data, textStatus, jQxhr) {
                    // alert('in seccess of add student')
                    location.href = "/assigAndsubDats"
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    // alert('in error of add student')
                    // console.log('tring')
                    console.log(errorThrown);
                }
            })
        }
    }
}

function checkIfSdudentExist(id) {
    // console.log('id - ', id)
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
        url: '/student/' + id,
        success: function (result) {
            // console.log(result[0])
            if (result[0] != undefined) {
                alert('סטודנט זה כבר קיים');
                localStorage.setItem('flag', "true")
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