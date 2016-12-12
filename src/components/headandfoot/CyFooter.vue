<template>
	<div>
		<!-- 尾部-->
		<div class="footer">
			<div class="footer_contert">
				<div class="footer_left">
					<img src="../../assets/img/footer.png" alt="壹财富，诚壹财富顾问">
					<ul style="margin-left: 4%;">
						<li>分享记录</li>
						<li>客户管理</li>
						<li>资料分享</li>
					</ul>
				</div>

				<div class="foot_qr">
					<table>
						<tbody>
							<tr>
								<td>
									<img src="../../assets/img/code_app.png" alt="壹财富，诚壹财富顾问" />
								</td>
								<td>
									<img src="../../assets/img/code_wechat.png" alt="壹财富，诚壹财富顾问" />
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="footer_right">
					<h2 title="诚壹财富顾问">联系我们</h2>
					<h3 title="诚壹财富顾问">4006-222-500</h3>
					<h5 title="诚壹财富顾问">周一到周五：9:30-18:30</h5>
				</div>
			</div>
		</div>
		<div class="footer_copyright">

			<div class="friendly_link">

				<a class="fs14" title="诚壹财富顾问">友情链接:</a>
				<a href="http://www.goldentreewm.com " target="_blank" title="诚壹金融">诚壹金融</a>
				<a href="http://www.chengyiwm.com"title="诚壹财富顾问">诚壹财富顾问</a>
				<a class="fs14" href="http://www.chengyiwm.com" title="诚壹财富顾问">理财师</a>

				<router-link to="/jhxt.html">
					集合信托
				</router-link>
				<router-link to="/zgjh.html">
					资管产品
				</router-link>
				<router-link to="/zqjj.html">
					证券基金
				</router-link>
				<router-link to="/gqjj.html">
					股权基金
				</router-link>
				<router-link to="/hwtz.html">
					海外投资
				</router-link>



				<a class="fs14" target="_blank" href="http://www.51lcs.cn">51理财师</a>
				<a class="fs14" target="_blank" href="http://www.qianyuancaifu.com">票据理财</a>
			</div>
			<div style="line-height: 30px; text-align: center;width: 100%">
				<div style="margin: 0 auto;text-align: center;width: 100%">
					<div style="display: inline-block;padding-top:-40px;float: left;margin-left: 30%">
						<img style="margin: 0 auto" src="../../assets/img/footer_logo.png" alt="">
					</div>
					<div style="display: inline-block;float: left;margin-top: 25px">
						Copyright &copy; 2015-2016 诚壹财富顾问 诚壹泰合（北京）科技有限公司 京ICP备15066551号-1

					</div>
				</div>







				</div>


		</div>

	</div>
</template>
<style scoped>
 	@import './head_footer.css';
</style>

<script>
	export default {
		name: 'cyfooter',
	}
</script>
