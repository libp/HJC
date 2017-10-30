//require.config(
//      {
//          paths: {
//              'jquery': '../lib/jquery-3.2.1.min'
//          }
//      }
//  );
//  require(['jquery'],function ($) {
//           $(document).on('click','#contentBtn',function(){
//              $('#messagebox').html('You have access Jquery by using require()');
//              require(['desc'],function(desc){
//              	alert(JSON.stringify(desc));
//              });
////              require(['alertdesc'],function(alertdesc){
////              	alertdesc();
////              });
//           });
//  });
    
    
require(['config'],function(){
    require(['jquery'],function ($) {
         $(document).on('click','#contentBtn',function(){
            $('#messagebox').html('You have access Jquery by using require()');
            require(['script/alertdesc'],function(alertdesc){
                alertdesc();
            });
         });
    });
});

//参考链接 http://www.jianshu.com/p/b8a6824c8e07



