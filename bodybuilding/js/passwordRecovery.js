$(document).on('pageinit', '#passWordRecoveryPage', function(){
    $(document).on('click', '#recover', function() { // catch the form's submit event
        if($('#email').val().length > 4){
            // Send data to server through the ajax call
            // action is functionality we want to call and outputJSON is our data
            var data  = $('#email-recover').serialize();
            $.ajax({url: 'http://chargelocator.com/passwordRecovery_Alpha--.php',
                data: data,
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
                       alert(result.massage);
                        $.mobile.changePage("#login");
                    } else {
                        alert('Logon unsuccessful!');
                    }
                },
                error: function (request,error) {
                    // This callback function will trigger on unsuccessful action
                    alert('Network error has occurred please try again!');
                }
            });
        } else {
            alert("Network error bla bla");
            $("#popupLogon").popup("open");
        }
        return false; // cancel original event to prevent form submitting
    });
});
