<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import url("common/iconfont/iconfont.css");
	@import "colorui/main.css";
	@import "colorui/icon.css";

	/*每个页面公共css */
	.mm {
		font-siz: 20px
	}
	
	.account-body {
		background: url('https://emhplatformservice.miiteen.com/static/account_bg.png');
		background-size: 100% 100%;
	}
	
	.white-input-placeholder {
		color: #F1F1F1;
	}
</style>
