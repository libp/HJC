/*
 * ES6 Promise.js
 * 2017 by XuLiangzhan
 */
(function(global, factory){
	
	if(!global.Promise){
		global.Promise = factory();
	}
	
})(typeof window !== 'undefined' ? window : this, function(){
	
	var 
	promise_status = '[[Promise Status]]', 
	promise_value = '[[Promise Value]]', 
	promise_callback = '[[Promise Callback]]', 
	promise_thener = '[[Promise Thener]]', 
	promise_pending_status = 'pending', 
	promise_resolved_status = 'resolved', 
	promise_rejected_status = 'rejected';
	
	function forEach(list, callback, context){
		if(list && callback){
			for(var index = 0, len = list.length || 0; index < len; index++){
				callback.call(context || this, list[index], index, list)
			}
		}
	}
	
	function filter(list, callback, context){
		var result = [];
		forEach(list, function(item){
			if(callback.apply(this, arguments)){
				result.push(item);
			}
		}, context)
		return result;
	}
	
	function executorPromise(promise){
		if(promise[promise_status] !== promise_pending_status){
			promise[promise_thener] = filter(promise[promise_thener], function(item){
				var 
				value = promise[promise_value], 
				isException = value && value.constructor === PromiseException, 
				callback = isException && item[promise_callback].exception || item[promise_callback][promise[promise_status]];
				if(callback){
	    			try{
	    				value = callback(isException ? value.message : value);
	    			}catch(e){
	    				value = new PromiseException(e);
	    			}finally{
	    				updatePromise(item, value, promise_resolved_status);
	    			}
	    			return false;
	    		}
	    		return true;
	    	});
    	}
	}
	
	function updatePromise(promise, value, status){
		if(value && value.constructor === XPromise){
    		value.then(function(val){
    			updatePromise(promise, val, promise_resolved_status);
    		}, function(val){
    			updatePromise(promise, val, promise_rejected_status);
    		});
    	}else{
    		if(promise[promise_status] === promise_pending_status){
    			promise[promise_status] = status;
    			promise[promise_value] = value;
    		}
    		executorPromise(promise);
    	}
	}
	
	function PromiseException(e){
		this.message = e;
	}
	
	function XPromise(resolver){
		
		this[promise_value];
		this[promise_status] = promise_pending_status;
		this[promise_thener] = [];
		
		this.then = function(resolve, reject){
			var promise = new XPromise(function(){});
			promise[promise_callback] = {resolved : resolve, rejected : reject};
			this[promise_thener].push(promise);
			executorPromise(this);
			return promise;
		}
		
		this["catch"] = function(exception){
			var promise = new XPromise(function(){});
			promise[promise_callback] = {exception : exception};
			this[promise_thener].push(promise);
			executorPromise(this);
			return promise;
		}
		if(typeof resolver === "function"){
	    	try{
	    		var that = this;
			    resolver(function(value){
			    	updatePromise(that, value, promise_resolved_status);
			    }, function(value){
			    	updatePromise(that, value, promise_rejected_status);
			    });
		    }catch(e){
		    	updatePromise(this, new PromiseException(e), promise_rejected_status);
		    }
	    }
	}
	
	
	forEach(['all', 'race'], function(name, index){
		XPromise[name] = function(promiseList){
			var 
			completeCount = 0, 
			rejectCount = 0, 
			isAll = index === 0, 
			completeLen = isAll ? promiseList.length : 1, 
			result = [];
			return new XPromise(function(resolved, rejected){
				function fulfilled(index, value){
					result[index] = value;
					if(++completeCount === completeLen){
						(rejectCount === 0 ? resolved : rejected)(isAll ? result : value);
					}
				}
				if(promiseList.length > 0){
					forEach(promiseList, function(promise, index){
						if(promise && promise.constructor === XPromise){
							promise.then(function(value){
								fulfilled(index, value);
							}, function(value){
								rejectCount++;
								fulfilled(index, value);
							});
						}else{
							fulfilled(index, promise);
						}
					});
				}else{
					resolved();
				}
			});
		}
	});
	
	forEach(['resolve', 'reject'], function(name, index){
		XPromise[name] = function(value){
			return new XPromise(function(resolved, rejected){
				(index === 0 ? resolved : rejected)(value);
			});
		}
	});
	
	return XPromise;
});