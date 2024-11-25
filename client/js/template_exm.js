// // // const express = require('express');
// // const multer = require('multer');

// // // const app = express();

// // // Configure multer storage
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     // Specify the directory where you want to save the uploaded files
// //     cb(null, 'uploads/');
// //   },
// //   filename: function (req, file, cb) {
// //     // Specify a unique name for the uploaded file
// //     cb(null, Date.now() + '-' + file.originalname);
// //   }
// // });

// // // Create the multer instance and specify the storage configuration
// // const upload = multer({ storage: storage });

// // // Define the route for file upload
// // app.post('/upload', upload.single('file'), (req, res) => {
// //   // The uploaded file is available as req.file
// //   if (!req.file) {
// //     return res.status(400).send('No files were uploaded.');
// //   }

// //   // File upload was successful
// //   res.send('File uploaded!');
// // });

// // // // Start the server
// // // app.listen(3000, () => {
// // //   console.log('Server is running on http://localhost:3000');
// // // });




// function btnshow() {
//     $.ajax({
//         type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
//         url: '/getstudents',
//         contentType: 'application/json',
//         success: function (result) {
//             console.log('in btn_show')
//             $.each(result, function (index, value) {      // Save the params and append on the table
//                 var row = $('<tr><td>' + value.sdt_firstName + '</td>' +
//                     '<td><img src="' + value.alfa_rpt_exm + '"></td>' +
//                     '</tr>');
//                 $('#tbl_files').append(row);
//             })
//         },
//         error: function (jqXhr, textStatus, errorThrown) {
//             console.log(errorThrown);
//         }
//     });
// }




// // var btn_show = document.getElementById('show_btn');

// // // Now you can use btn_show
// // btn_show.addEventListener('click', function() {
// //     alert('check')
// //     $.ajax({
// //                 url: '/students',
// //                 type: 'GET',
// //                 success: function (data) {
// //                     console.log('in btn_show')
// //                     $.each(data, function (index, value) {      // Save the params and append on the table
// //                         var row = $('<tr><td>' + value.sdt_firstName + '</td>' +
// //                             // '<td><img src="' + value.alfa_rpt + '"></td>' +
// //                             '</tr>');
// //                         $('#tbl_files').append(row);
// //                     })
// //                 },
// //                 error: function (jqXHR, textStatus, errorThrown) {
// //                     console.log('Error: ' + textStatus + ' - ' + errorThrown);
// //                 }
// //             });
// // });
