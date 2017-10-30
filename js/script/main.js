require.config(
        {
            paths: {
                'jquery': '../lib/jquery-3.2.1.min'
            }
        }
    );
    require(['jquery'],function ($) {
             $(document).on('click','#contentBtn',function(){
                $('#messagebox').html('You have access Jquery by using require()');
//              require(['desc'],function(desc){
//              	alert(JSON.stringify(desc));
//              });
                require(['alertdesc'],function(alertdesc){
                	alertdesc();
                });
             });
    });

