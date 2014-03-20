$(document).on('pageinit', '#pageSockets', function () {
    $.getJSON("http://chargelocator.com/socketTypeList_Alpha.php", function (data) {
        $.each(data, function (key, val) {
            $("#socketType1").append("<option value ='" + val.id_tipo + "'>" + val.nombre_tipo + "</option>").selectmenu('refresh');
            $("#socketType2").append("<option value ='" + val.id_tipo + "'>" + val.nombre_tipo + "</option>").selectmenu('refresh');
        });
    });
    /*         $.getJSON("http://chargelocator.com/ampereList_Alpha.php", function (data) {
     $.each(data, function (key, val) {
     $("#conector1").append("<option value='" + val.codigo_conector + "'>" + val.nombre + "</option>");
     });
     });*/
    //load siteTypes_A.php
    $.getJSON("http://chargelocator.com/siteTypes_Alpha.php", function (data) {
        $.each(data, function (key, val) {
            $("#siteType").append("<option value='" + val.id_tipo + "'>" + val.nombre_tipo + "</option>");
        });
    });
                //load nivel
     $.getJSON("http://chargelocator.com/nivel_Alpha.php", function (data) {
     $.each(data, function (key, val) {
     $("#nivel1").append("<option value='" + val.group_id + "'>" + val.group_name + "</option>");
     });
     });

    $("#butSocketNext").click(function () {
        var socketType1 =$("#socketType1").val();
        var socketType2= $("#socketType2").val()   ;
        var description=$("#description1").val();
        var openinghours=$("#openinghours1").val();
        var siteType=$("#siteType").val();
        var ampere=$("#ampere1").val();


        if(socketType1 != null && description.length>5 && openinghours != null && siteType != null && ampere.length>0)
        {
 /*           localStorage.setItem("description", description);
            localStorage.setItem("openinghours", openinghours);
            localStorage.setItem("siteType", siteType);
            localStorage.setItem("socketType1", socketType1);
            localStorage.setItem("socketType2", socketType2);
            localStorage.setItem("ampere", ampere);*/
            $.mobile.changePage("#fotoPage");
        }
        else{
            $("#popupSocketValidate").popup("open");
        }
    });
/*    $(document).on('click', '#butSocketNext', function () {
        alert("butSocketNext clicked init" +$("#socketType1").val().length);
    });*/
});
