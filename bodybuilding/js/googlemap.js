var geocoder;
var map;
var infowindow = new google.maps.InfoWindow();
var marker;
var lat;
var lng;
function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(40.730885, -73.997383);
    var mapOptions = {
        zoom: 8,
        center: latlng,
        mapTypeId: 'roadmap'
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);

function codeLatLng(lat1, lng1) {

    var lat = parseFloat(lat1);
    var lng = parseFloat(lng1);
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                map.setZoom(15);
                marker = new google.maps.Marker({
                    position: latlng,
                    map: map
                });

//                todo revers geolocation parse json
                infowindow.setContent(results[1].formatted_address);
                infowindow.open(map, marker);
                var result = results[1];
                var streetNr;
                for(var i= 0, len = result.address_components.length;i<len; i++){
                    var ac = result.address_components[i];
                    if(ac.types.indexOf("street_number") >=0) streetNr = ac.long_name;
                    if(ac.types.indexOf("route") >=0) $("#street1").val(ac.long_name+" "+streetNr);
                    if(ac.types.indexOf("locality")>=0) $("#city1").val(ac.long_name);
                    if(ac.types.indexOf("postal_code")>=0) $("#postalcode1").val(ac.long_name);
                    if(ac.types.indexOf("country")>=0) $("#country1").val(ac.long_name);
                }
/*                alert(results[1]);
                alert(results[0]);

                var form_Adress = results[1].formatted_address.split(",", 3);

                $("#street1").val(form_Adress[0]);
                var arr = form_Adress[1].split(' ');*/
//                $("#postalcode1").val(arr[1]);
//                $("#city1").val(arr[2]);
                //$('option[value=' + data[0].start + ']').attr('selected', 'selected');

                //$("#country1").val(form_Adress[2]);
            } else {
                alert('No results found');
            }
        } else {
            alert('Geocoder failed due to: ' + status);
        }
    });
};


$(document).on('pageshow', '#gpsPage', function () {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    initialize();
});
$(document).on('pageinit', '#gpsPage', function () {
    $("#maps").click(function () {
        codeLatLng(lat, lng);
    });

    $.getJSON("http://chargelocator.com/codigoCountryList_Alpha.php", function (data) {
        $.each(data, function (key, value) {
            $("#country1").append("<option value='" + value.codigo + "'>" + value.NOMBRE_ES + "</option>");
        });
    });

    $(document).on('click', '#buttonNext', function () {
        if ($('#locname1').val().length > 2 && $('#street1').val().length > 2 && $('#postalcode1').val().length > 2
            && $('#city1').val().length > 2 && $('#country1').val() != null) {

 /*           localStorage.setItem("latitude", $("#latitude1").val());
            localStorage.setItem("longitude", $("#longitude1").val());
            localStorage.setItem("locname", $("#locname1").val());
            localStorage.setItem("street", $("#street1").val());
            localStorage.setItem("postalcode", $("#postalcode1").val());
            localStorage.setItem("city", $("#city1").val());
            localStorage.setItem("country", $("#country1").val());*/
            $.mobile.changePage("#pageSockets");
        }
        else {

            $("#popupGpsValidate").popup("open");
        }
    });
});
function onSuccess(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    $("#latitude1").val(lat);
    $("#longitude1").val(lng);
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('Gps Error not activated. Please activate your GPS. Error code: ' + error.code + '\n' +
        'Message: ' + error.message + '\n');

};


