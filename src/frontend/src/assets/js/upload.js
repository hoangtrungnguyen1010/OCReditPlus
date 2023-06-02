$(document).ready(function () {
    $('#fileup').change(function () {
        var res = $('#fileup').val();

        var arr = res.split("\\");
        var filename = arr.slice(-1)[0];
        filextension = filename.split(".");
        filext = "." + filextension.slice(-1)[0];
        valid = [".jpg", ".png", ".jpeg", ".bmp"];

        if (valid.indexOf(filext.toLowerCase()) == -1) {
            $(".imgupload").hide("slow");
            $(".imgupload.ok").hide("slow");
            $(".imgupload.stop").show("slow");

            $('#namefile').css({"color": "red", "font-weight": 700});
            $('#namefile').html("File " + filename + " is not  pic!");

            $("#submitbtn").hide();
            $("#fakebtn").show();
        } else {
            //if file is valid we show the green alert and show the valid submit
            $(".imgupload").hide("slow");
            $(".imgupload.stop").hide("slow");
            $(".imgupload.ok").hide("slow");

            $('#namefile').css({"color": "green", "font-weight": 700});
            $('#namefile').html(filename);

            var file = document.getElementById('fileup').files[0];
            var preview = URL.createObjectURL(file);
            console.log(preview)
            $("#preview").attr("src", preview);

            $("#submitbtn").show();
            $("#fakebtn").hide();
            $("#btnup").hide();
        }
    });
});
