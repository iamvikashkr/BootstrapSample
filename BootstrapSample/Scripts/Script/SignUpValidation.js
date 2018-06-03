$(document).ready(function () {

    emailExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([com\co\.\in])+$/;

    $('#submit').click(function () {
        
        debugger;
        var fname = $("#firstname").val();
        var lname = $("#lastname").val();
        var email = $("#email").val();
        var phonenumber = $("#phnumber").val();
        var password = $("#pwd").val();

        if (email != '') {
            if (!email.match(emailExp))
            {
                alert("Invalid email id");
                return false;

            }
        }

        var obj = {
            'fname': $("#firstname").val(),
            'lname': $("#lastname").val(),
            'email': $("#email").val(),
            'phonenumber': $("#phnumber").val(),
            'password': $("#pwd").val(),
            'key': Math.random()
        }
        var arr = new Array();
        var arr1 = new Array();

        if (localStorage.getItem('demo') == null || localStorage.getItem('demo') == undefined) {


            arr.push(obj);
            localStorage.setItem('demo', JSON.stringify(arr));
        }
        else {

            arr1 = JSON.parse(localStorage.getItem('demo'));
            arr1.push(obj);
            localStorage.setItem('demo', JSON.stringify(arr1));

        }
        alert("Successfully Registered");
        window.parent.location.href = "Index.html";

    })

    $('#signbtn').click(function () {
        debugger;
        var inputemail = $("#email").val();
        var inputpassword = $("#password").val();

        if (inputemail != '') {
            if (!inputemail.match(emailExp)) {
                alert("Invalid email id");
                return false;

            }
        }

        var data = JSON.parse(localStorage.getItem('demo'));
        if (data == null || data==undefined) {
            alert("data not found");
            return false;
        }
        var len = data.length;

        for (var i = 0; i < len; i++) {
            var email = data[i].email;
            var password = data[i].password;
            if (email == inputemail && password == inputpassword) {
                localStorage.setItem('profile', JSON.stringify(data[i]));
                var pro = JSON.parse(localStorage.getItem('profile'));
                var key = pro.key;
                var date = new Date();
                date.setTime(date.getTime() + (1* 24 * 60 * 60 * 1000));
                var expires = "expires=" + date.toGMTString();
                document.cookie = "token=" + key + ";" + expires + ";path=/";
                window.parent.location.href = "Index.html";
                return true;

            }   
        }
        alert("Data not found");
        return false;
    })
});