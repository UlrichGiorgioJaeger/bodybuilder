var imageArray = [];
var points;
var bar=[];
var bar2=[];


$(document).on('pageshow', '#confirmationPage', function () {
    var imageArray = [];
    for (var i = 0; i < 9; i++) {
        var str = "i"+i.toString();
        var imageSrc = localStorage.getItem(str);
        if (imageSrc) {

            imageArray.push(imageSrc);
        }
    }
    $.each(imageArray, function (key, value) {
        points = points+1;
        $("#images").remove();

        $("#images").append("<img style='width: 80px;height: 80px' src='" + value + "'/>")

    });
    //GPS Coordinates
/*    var latitude = localStorage.getItem("latitude");
    var longitude = localStorage.getItem("longitude");*/
    $("#latitude").val($("#latitude1").val());
    $("#longitude").val($("#longitude1").val());

    //LOCATION
/*    var locname = localStorage.getItem("locname");
    var street = localStorage.getItem("street");
    var postalcode = localStorage.getItem("postalcode");
    var city = localStorage.getItem("city");  */
    $("#locname").val($("#locname1").val());
    $("#street").val($("#street1").val());
    $("#postalcode").val($("#postalcode1").val());
    $("#city").val($("#city1").val());
    $("#country").val($("#country1 :selected").text());

    //CHARGER DETAILS
   /* var description = localStorage.getItem("description");
    var openinghours = localStorage.getItem("openinghours");
    var socketType1 =localStorage.getItem("socketType1");
    var socketType2 =localStorage.getItem("socketType2");
    var siteType = localStorage.getItem("siteType");
    var ampere = localStorage.getItem("ampere");*/


    $("#openinghours").val($("#openinghours1").val());
    $("#description").val($("#description1").val());
    $("#siteType1").val($("#siteType :selected").text());
    $("#ampere2").val($("#ampere1").val());

    var foo = [];
    $('#socketType1 :selected').each(function(i, selected){
        foo[i] = $(selected).text();
        bar[i] =  $(selected).val();

    });
    $("#socketType_1").val(foo[1]);

    var foo2 = [];
    $('#socketType2 :selected').each(function(i, selected){
        foo2[i] = $(selected).text();
        bar2[i] =  $(selected).val();

    });
    $("#socketType_2").val(foo2);



    //implement Punkte

    points = 13; //without photos
    if($("#siteType :selected").val() == "1"){
        points = points+20;
    }else{
        points = points+1;

    }
    if($("#ampere1").val() > 32){
        points = points+5;
    }
    else{
        points = points+1;
    }
    //IMAGES

    $("#points").val(points);

});

/* berechnung von Punkten mit Message Sie haben soviel punkte etc. gewonnen.*/
$(document).on('pageinit', '#confirmationPage', function(){


    $(document).on('click', '#buttonSend', function() { // catch the form's submit event


        if($('#longitude').val().length > 0 && $('#locname').val().length > 0){
            // Send data to server through the ajax call
            // action is functionality we want to call and outputJSON is our data
            $("#socketType_2").val(bar2[0]);
            $("#socketType_1").val(bar[0]);
            $("#siteType1").val($("#siteType :selected").val());
            $("#country").val($("#country1 :selected").val());

            var latitude=$("#latitude").val();
           // alert("latitude " +latitude);

            var longitude=$("#longitude").val();
            //alert("longitude " +longitude);

            var locname=$("#locname").val();
            //alert("locname " +locname);

            var street=$("#street").val();
            //alert("street " +street);

            var postalcode=$("#postalcode").val();
           // alert("postalcdoe " +postalcode);

            var city=$("#city").val();
            //alert("city " +city);

            var country=$("#country1 :selected").val();
            //alert("latitude " +country);

            var description=$("#description").val();
            //alert("desc " +description);

            var openinghours=$("#openinghours").val();
            // alert("openinghours " +openinghours);

            var siteType1=$("#siteType :selected").val();
            //alert("siteType1 " +siteType1);

            var socketType1 = 1;
            var ampere2=$("#ampere2").val();
/*
            var myData = {
                latitude : latitude, longitude : longitude,
                locname : locname , street : street,  postalcode : postalcode,
                city : city,country : country,description : description,openinghours :openinghours
                ,siteType1 : siteType1,socketType_1 : socketType1 , socketType_2 : socketType1, ampere2 : ampere2

            };
            alert(myData.toSource());*/

         var formData = $('#confirmationForm').serialize();
            console.log(formData);
            $.ajax({url: 'http://chargelocator.com/new_1.php',
                data: formData ,
                type: 'post',
                async: 'true',
                dataType: 'json',
                beforeSend: function() {
                    // This callback function will trigger before data is sent
                    $.mobile.showPageLoadingMsg(true); // This will show ajax spinner
                },
                complete: function() {
                    // This callback function will trigger on data sent/received complete
                    $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
                },
                success: function (result) {
                    if(result.status) {
//                        alert(result.massage);
                        $("#confirmSuccess").popup("open");
                        $("#span").html(points);
                        uploadPhoto();
                    } else {
                        alert(result.massage);
                    }
                },
                error: function (request,error) {
                    // This callback function will trigger on unsuccessful action
                    alert('Network error has occurred please try again!');
                }
            });
        } else {
            alert('Please fill all necessary fields');
        }
        return false; // cancel original event to prevent form submitting
    });
});

    //UPLOAD IMAGES
    function uploadPhoto() {

        for (var i = 0; i < imageArray.length; i = i + 1) {

            imageURI = imageArray[ i ];
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";

            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;
            options.chunkedMode = false;

            var ft = new FileTransfer();
            ft.upload(imageURI, "http://chargelocator.com/upload_image.php", win, fail, options);
        }
    }

    function win(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        //alert("Upload Success" + r.response);
    }

    function fail(error) {
        alert("An error has occurred: Code = " + error.code);
    }


