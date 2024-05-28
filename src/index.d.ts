
declare namespace vplus {
	type ApiMethod =
	  | "authorize"
	  | "scanQrCode"
	  | "pay";
	// 所有JS接口列表
	type jsApiList = ApiMethod[];
	
	interface BaseParams {
		success?(...args: any[]): void;
		/** 接口调用失败的回调函数 */
		fail?(...args: any[]): void;
		/** 接口取消调用的回调函数 */
		cancel?(...args: any[]): void;
		/** 接口调用结束的回调函数（调用成功、失败都会执行） */
		complete?(...args: any[]): void;
	}
	
	function config(conf: {
	  debug?: boolean; // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	  appId: string; // 必填，公众号的唯一标识
	}): void;
	
	interface IauthParams extends BaseParams {
		app_key: string,
		success(code:string):void
	}
	
	function authorize(params: IauthParams):void;
	
	interface IPayParams extends BaseParams {
		money: string,
		order_no: string,
		success(res: {order_no:string, pay_url:string}):void,
	}
	
	function pay(params: IPayParams):void
	
	interface IScanParams extends BaseParams {
		needResult:number,
		success(code: string):void
	}
	function scanQrCode(params: IScanParams):void
}

// declare function vplus(): void;
/*=============================微信内全局变量==============================*/
declare global {
  interface Window {
    JsBridge: any;
  }
  const JsBridge: any;
}
export default vplus;