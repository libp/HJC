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

require(['config'], function() {
	require(['jquery'], function($) {
		$(document).on('click', '#contentBtn', function() {
			$('#messagebox').html('You have access Jquery by using require()');
			require(['script/alertdesc'], function(alertdesc) {
				alertdesc();
			});
		});
	});
	//学习require 参考链接 http://www.jianshu.com/p/b8a6824c8e07

	require(['promise'], function($) {
		var p = new Promise(function(resolve, reject) {
			//做一些异步操作
			setTimeout(function() {
				console.log('执行完成');
				resolve('随便什么数据');
			}, 2000);
		});

		function runAsync1() {
			var p = new Promise(function(resolve, reject) {
				//做一些异步操作
				setTimeout(function() {
					console.log('异步任务1执行完成');
					resolve('随便什么数据1');
				}, 1000);
			});
			return p;
		}

		function runAsync2() {
			var p = new Promise(function(resolve, reject) {
				//做一些异步操作
				setTimeout(function() {
					console.log('异步任务2执行完成');
					resolve('随便什么数据2');
				}, 2000);
			});
			return p;
		}

		function runAsync3() {
			var p = new Promise(function(resolve, reject) {
				//做一些异步操作
				setTimeout(function() {
					console.log('异步任务3执行完成');
					resolve('随便什么数据3');
				}, 2000);
			});
			return p;
		}
//		runAsync1()
//			.then(function(data) {
//				console.log(data+'001');
//				return runAsync2();
//			})
//			.then(function(data) {
//				console.log(data+'002');
//				return '直接返回数据'; //这里直接返回数据
//			})
//			.then(function(data) {
//				console.log(data+'003');
//			});
//
//		function getNumber() {
//			var p = new Promise(function(resolve, reject) {
//				//做一些异步操作
//				setTimeout(function() {
//					var num = Math.ceil(Math.random() * 10); //生成1-10的随机数
//					if(num <= 5) {
//						resolve(num);
//					} else {
//						reject('数字太大了');
//					}
//				}, 2000);
//			});
//			return p;
//		}
//		getNumber()
//			.then(
//				function(data) {
//					console.log('resolved');
//					console.log(data);
//				},
//				function(reason, data) {
//					console.log('rejected');
//					console.log(reason);
//				}
//			);
//		getNumber()
//			.then(function(data) {
//				console.log('resolved');
//				console.log(data);
//				console.log(somedata); //此处的somedata未定义
//			})
//			.catch(function(reason) {
//				console.log('rejected');
//				console.log(reason);
//			});
//		Promise
//			.all([runAsync1(), runAsync2(), runAsync3()])
//			.then(function(results) {
//				console.log(results);
//			});
//		Promise
//			.race([runAsync1(), runAsync2(), runAsync3()])
//			.then(function(results) {
//				console.log(results);
//			});
//
//		//请求某个图片资源
		function requestImg() {
			var p = new Promise(function(resolve, reject) {
				var img = new Image();
				img.onload = function() {
					resolve(img);
				}
				img.src = 'xxxxxx';
			});
			return p;
		}
		//延时函数，用于给请求计时
		function timeout() {
			var p = new Promise(function(resolve, reject) {
				setTimeout(function() {
					reject('图片请求超时');
				}, 5000);
			});
			return p;
		}

		Promise
			.race([requestImg(), timeout()])
			.then(function(results) {
				console.log(results);
			})
			.catch(function(reason) {
				console.log(reason);
			});
			
		//学习promisejs 参考链接http://www.cnblogs.com/lvdabao/p/es6-promise-1.html
	});
});