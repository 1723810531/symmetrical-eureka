<template>
	<div class="main">
		<div id="mjInchats" style="height: 80vh;width: 100%"></div>
	</div>
</template>
<script>
	import * as echarts from "echarts";
	import {
	  echatsEm
	} from '@/api/echatsData.js'
	export default {
		data() {
			return {
				seriesObj: {
					name: "",
					type: 'line',
					data: []
				}
			};
		},
		methods: {
			//面积
			echatsEm() {
			  echatsEm().then(res => {
			    let data = res
			    this.mjInchats(data.emList,data.yName,data.seriesList)
			  })
			},
			mjInchats(xAxisData, yName, seriesData) {
				var myChart = echarts.init(document.getElementById('mjInchats'));
				myChart.setOption({
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					legend: {
					    data: yName
					  },
					xAxis: [{
						axisLabel: {
							interval: 0,
							rotate: 40,
							color: '#000000',
							fontSize: 14,
							margin: 10
						},
						type: 'category',
						name: '元素精通',
						boundaryGap: false,
						data: xAxisData,
						axisTick: {
							alignWithLabel: true
						}
					}],
					yAxis: [{
						type: 'value',
						name: '提升幅度(%)',
						nameTextStyle: {
							color: '#000000',
							padding: [0, 0, 8, 0]
						},
						splitLine: {
							lineStyle: {
								color: ['#2DA4FF'],
								opacity: 0.2
							}
			
						}
					}],
					series: seriesData
				})
			}
			
		},
		mounted() {
			this.echatsEm()
		},
	}
</script>
<style>
	
</style>