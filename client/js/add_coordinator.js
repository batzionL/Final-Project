jQuery(function ($) {
    var coordinator = document.createElement("option")
    coordinator.setAttribute("disabled", "disabled")
    coordinator.setAttribute("selected", "selected")

    coordinators_name.appendChild(coordinator)
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
        url: '/getmoderators',
        success: function (result) {
            //adding all the options
            coordinators_name = document.getElementById("coordinators_name")
            index = 0;
            $.each(result, function (index, value) {
                var coordinator = document.createElement("option")
                coordinator.setAttribute('value', index)
                coordinator.setAttribute("id", value.mod_ID)
                coordinator.setAttribute("first_name_coordinator", value.mod_firstName)
                coordinator.setAttribute("last_name_coordinator", value.mod_lastName)
                // coordinator.setAttribute("image_lecturer", value.image_lecturer)
                // lecturer.setAttribute("div_site", value.div_site)
                coordinator.innerHTML = value.mod_firstName + " " + value.mod_lastName
                coordinators_name.appendChild(coordinator)
                index++;
                // console.log('hggg '+lecturer.getAttribute('name_lecturer'))
            });
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    coordinators_name.addEventListener("change", function () {     //choose the id of lecturer that selected
        var select = document.getElementById('coordinators_name');
        for (var i = 0; i < select.options.length; i++) {
            var option = select.options[i];
            if (option.selected) {
                localStorage.setItem('id_coor', option.id)
                break;
            }
        }
    });

});

function if_there_coor(e) {
    e.preventDefault()
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
        url: '/getCoodinator',
        success: function (result) {
            if (result[0] == undefined) {
                add_coord('');
            }
            else {
                var userResponse = confirm("בלחיצה על אישור הינך מחליף/ה את הרכז/ת הקיים/ת");

                // Check if the user pressed "OK" or "Cancel"
                if (userResponse) {
                    // User pressed "OK"
                    // console.log("User pressed OK");
                    dltOldCoor();
                    add_coord(userResponse);
                } else {
                    // User pressed "Cancel"
                    // console.log("User pressed Cancel");
                    location.href = "/assigAndsubDats";
                }
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}



function add_coord(res) {
    var id_coor = localStorage.getItem('id_coor')
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: '/addcoordinator', // the url where we want to POST
        contentType: 'application/json',
        data: JSON.stringify({
            "coo_ID": id_coor
        }),
        processData: false,
        encode: true,
        success: function (data, textStatus, jQxhr) {
            if (res == '') {
                createSubDatesDoc();
            }
            else{
                location.href = "/assigAndsubDats";
            }
            // location.href = "/login";
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

function createSubDatesDoc() {
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: '/dateOfSub', // the url where we want to POST
        contentType: 'application/json',
        data: JSON.stringify({
            "propRpt": "",
            "alfaRpt": "",
            "betaRpt": "",
            "finalRpt": "",
            "presentation": ""
        }),
        processData: false,
        encode: true,
        success: function (data, textStatus, jQxhr) {
            location.href = "/assigAndsubDats";
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

function dltOldCoor() {
    $.ajax({
        url: "/deleteOldCoor",
        type: 'DELETE',
        success: function (data) {
            // console.log('delete')
        },
        error: function (err) {
            console.log("err", err);
        }
    });
}