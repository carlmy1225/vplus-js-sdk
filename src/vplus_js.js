!(function(e, f){
	"function" == typeof define && (define.amd || define.cmd)?define(function(){
	    return f(e);
	}): f(e, !0)
})(typeof window === 'object' && window, function(r, e){		
		if(!r){
			console.warn("can't use weixin-js-sdk in server side");
			return;
		}

    var a, c, n, i, t, o, s, d, l, u, p, f, m, g, h, S, y, I, v, _, w, T, callbackId = 1;
    if(!r.vplus) 
			return (
				(h = {}),
				(n = r.document),
				(t = navigator.userAgent.toLowerCase()),
				(d = -1 !== t.indexOf("flutter:vtrip-app")),
				(_  = {
					config(e){
							h = e;
							O(function(){
									K('checkJsApi', {
											apiList: h.jsApiList
									})
							})
					},
							
					pay(e){
						K("pay", 
							{ money: e.money, order_no: e.order_no },
							(e._complete = function(e) {
							},e)
						)
					},
							
					authorize(e){
						K("authorize",
							{ app_key: e.app_key},
							(e._complete = function(e) {
							}, e)
						)
					},
					
					scanQrCode(e){
						K("scanQRCode",
							{
						    needResult: (e = e || {}).needResult || 0,
						    // scanType: e.scanType || ["qrCode", "barCode"],
						  },
						  ((e._complete = function (e) {
								 e.code = e.data;
						  }),e)
						);
					},
					
					isInnerApp(){
						return -1 !== t.indexOf("flutter:vtrip-app")
					},
				}),
				e && (r.vpls = r.vplus = _),
				_
			);
		else return r.vplus; 
		
    function L() {
        return (new Date).getTime()
    }

    function K(method, data, i){
			console.log("invoke method:" + method)
			const callbackName = `__native_callback_${callbackId++}`
			// 注册全局回调函数
			window[callbackName] = function(res) {
					// callback(res)
					console.log("方法:" + method + "得返回：")
					console.log(res);
					R(JSON.parse(res), i)
					delete window[callbackName]
			}
			console.log(r.JsBridge);
			// config.callback = callbackName
			r.JsBridge && r.JsBridge.postMessage(
				JSON.stringify({
					'type': 'invoke',
					'method': method,
					'data': P(data),
					'callback': callbackName
				})
			);
    }

    function R(r, i){
        if(r == null){
            console.log("返回结果错误");
            return;
        }
        let t = r.errMsg,
					index = (
						(i = i || {})._complete && (i._complete(r), delete i._complete),
						(t = r.errMsg || ""),
						h.debug && !d && alert(JSON.stringify(r)),
						t.indexOf(":")
					);
		
        switch (t.substring(index +1)){
            case "ok":
                i.success && i.success(r);
                break;
            case "cancel":
                i.cancel && i.cancel(r);
                break;
            default:
                i.fail && i.fail(r);
        }
        i.complete && i.complete(r)
    }

    function P(e) {
        return (e = e || {}).appId = h.appId, e.verifyAppId = h.appId,
            e.verifySignType = "sha1",
            e.verifyTimestamp = h.timestamp + "",
            e.verifyNonceStr = h.nonceStr,
            e.verifySignature = h.signature, e
    }

    function O(e) {
        d && (r.JsBridge ? e() : n.addEventListener && n.addEventListener("JsBridgeReady", e, !1))
    }

});