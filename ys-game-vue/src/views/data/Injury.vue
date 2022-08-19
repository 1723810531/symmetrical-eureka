<template>
	<div>
		<el-form ref="form" :model="form" label-width="100px">
		  <el-form-item label="角色名称">
		    <el-input v-model="form.name" style="width: 200px;"></el-input>
		  </el-form-item>
		  <el-form-item label="角色等级">
		    <el-input v-model="form.grade" style="width: 200px;"></el-input>
		  </el-form-item>
		  <el-form-item label="技能倍率">
		    <el-input v-model="form.buff" style="width: 200px;"></el-input>
		  </el-form-item>
		  <el-form-item label="面板攻击力">
		    <el-input v-model="form.atk" style="width: 200px;"></el-input>
		  </el-form-item>
		  <el-form-item label="暴击率">
		    <el-input v-model="form.hit" style="width: 200px;"></el-input>
		  </el-form-item>
		  <el-form-item label="暴击伤害">
		    <el-input v-model="form.fatk" style="width: 200px;"></el-input>
		  </el-form-item>
		  <el-form-item label="相应加成">
		    <el-input v-model="form.aps" style="width: 200px;"></el-input>
		  </el-form-item>
		  <el-form-item label="元素精通">
		    <el-input v-model="form.em" style="width: 200px;"></el-input>
		  </el-form-item>
		  <el-form-item label="怪物抗性%">
		    <el-input v-model="form.res" style="width: 200px;"></el-input>
		  </el-form-item>
		  <el-form-item label="怪物等级">
		    <el-input v-model="form.grades" style="width: 200px;"></el-input>
		  </el-form-item>
		  <el-form-item label="减防系数">
		    <el-input v-model="form.sunder" style="width: 200px;"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">立即创建</el-button>
		    <el-button>取消</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>
<script>
	// import * as echarts from "echarts";
	import {
	  selectInjury
	} from '@/api/injury.js'
	export default {
		data() {
			return {
				 form: {
				          name: '甘雨',
				          grade: '90',
				          buff: '622',
				          atk: '2205',
				          hit: '100',
				          fatk: '262.5',
				          aps: '133.6',
				          em: '162',
						  res: '10',
						  grades: '87',
						  sunder: '0'
				        }
			};
		},
		methods: {
			onSubmit(){
				this.injury()
			},
			injury(){
				selectInjury(this.form).then(res =>{
					this.$message({
					          message: '最高反应伤害期望为：' + res,
					          type: 'success'
					        });
					console.info(res)
				})
			}
		},
		mounted() {
		},
	}
</script>
<style>
	
</style>