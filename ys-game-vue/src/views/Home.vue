<template>
	<div>
		<el-container>
			<el-header>
				<h2 style="text-align: center;line-height: 35px; color: #FFFFFF;">原神</h2>
			</el-header>
			<el-container>
				<el-aside width="200px">
					<el-menu router>
						<el-submenu index="2">
							<template slot="title">
								<!-- <i class="el-icon-add-location"></i> -->
								<span>基础信息</span>
								</template>
							<el-menu-item :index="children.path" v-for="(children,index) in this.$router.options.routes[1].children">
								{{children.name}}
							</el-menu-item>
							
						</el-submenu>
						
					</el-menu>
				</el-aside>
				<el-main>
					<router-view />
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: "Home",
		data() {
			return {
				tableHeight:0
			}
		},
		created() {
		},
		methods:{
			menuClick(index){
				this.$router.push(index)
			},
		}
	}
</script>

<style>
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}

	.el-aside {
		color: #333;
	}
	.el-main {
	    display: block;
	    flex: 1;
	    flex-basis: auto;
	    overflow: auto;
	    box-sizing: border-box;
	    padding: 20px;
	    height: 1200px;
	}
</style>
