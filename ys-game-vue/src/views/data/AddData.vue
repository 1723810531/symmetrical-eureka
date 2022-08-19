<template>
	<div class="data_main" v-loading="loading"
    element-loading-text="正在上传......"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
		<el-row :gutter="20">
			<el-col :span="6">
				<span style="border-left:5px #0000FF solid; padding-left: 15px;">圣遗物</span>
			</el-col>
			<div style="margin-left: 70%; width: 50%;">
				<el-col :span="18">
					<span style="font-size: 14px;">名称：</span>
					<el-select v-model="dataArray.num" clearable @change="selectRelicsFy" size="mini" style="width: 150px;margin-right: 10px;">
					  <el-option v-for="item in nameList" :key="item.value" :label="item.label" :value="item.value">
					  </el-option>
					</el-select>
					<span style="font-size: 14px;">部位：</span>
					<el-select v-model="dataArray.partsNum" clearable size="mini" style="width: 100px;margin-right: 10px;">
					  <el-option v-for="item in partsList" :key="item.value" :label="item.label" :value="item.value">
					  </el-option>
					</el-select>
					<el-button @click="ssQuery" type="primary" size="mini">搜索 </el-button>
					<el-button @click="relicsExportExcel" type="primary" size="mini">导出 </el-button>

					<el-upload action accept=".xlsx, .xls" :auto-upload="false" :show-file-list="false" :on-change="handle" :limit="1"
					 style="display: inline-block; margin-left: 10px;">
						<el-popover placement="top-start" trigger="hover">
							<p>请先确认导入表头格式无误,再导入数据</p>
							<el-button size="mini" type="primary" :disabled="disable" slot="reference">导入</el-button>
						</el-popover>
					</el-upload>
				</el-col>
			</div>
		</el-row>
		<div class="data_table">
		<el-table :data="relicsList" id="relicsTable" style="width: 100%;margin-top: 10px;"
			border :row-class-name="tableRowClassName" :height="tableHeight"
			:header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
			<el-table-column type="index" label="序号" width="70">
			     <template slot-scope="scope">{{scope.$index+(dataArray.page-1)*dataArray.pageSize+1}}</template>
			</el-table-column>
			<el-table-column prop="name" label="名称" width="160px">
			</el-table-column>
			<el-table-column prop="parts" label="部位" width="100px">
			</el-table-column>
			<el-table-column prop="atk" label="攻击力" width="100px" sortable>
			</el-table-column>
			<el-table-column prop="def" label="防御力" width="100px" sortable>
			</el-table-column>
			<el-table-column prop="hp" label="生命值" width="100px" sortable>
			</el-table-column>
			<el-table-column prop="atks" label="攻击力%" width="110px" sortable>
			</el-table-column>
			<el-table-column prop="defs" label="防御力%" width="110px" sortable>
			</el-table-column>
			<el-table-column prop="hps" label="生命值%" width="110px" sortable>
			</el-table-column>
			<el-table-column prop="em" label="元素精通" width="120px" sortable>
			</el-table-column>
			<el-table-column prop="ec" label="元素充能效率%" width="150px" sortable>
			</el-table-column>
			<el-table-column prop="hit" label="暴击率%" width="110px" sortable>
			</el-table-column>
			<el-table-column prop="fatk" label="暴击伤害%" width="120px" sortable>
			</el-table-column>
			<el-table-column prop="aps" label="元素伤害加成%" width="120px">
			</el-table-column>
			<el-table-column prop="ads" label="物理伤害加成%" width="120px">
			</el-table-column>
			<el-table-column prop="tmt" label="治疗加成%">
			</el-table-column>
		</el-table>
			<!-- 分页 -->
		<el-pagination @size-change="handleSize" @current-change="handleCurrent"
		 :current-page="rows.page" :page-sizes="[10, 20, 30, 50]" :page-size="rows.pageSize" :total="tableDataRelicsTotal"
		 layout="total, sizes, prev, pager, next, jumper" background style="height: 40px;margin-left: 35%;margin-top: 15px;">
		</el-pagination>
		</div>
	</div>
</template>

<script>
	import '@/utils/directives.js'
	import XLSX from "xlsx"
	import {
	  selectRelicsName,selectRelics,selectRelicsFy,readFile,character,delay,relicsInfo
	} from '@/api/input.js'
	export default {
		data() {
			return {
				clientWidth: document.documentElement.clientWidth,
				tableHeight:0,
				dataArray: {
					name: "",
					num: "",
					partsNum: "",
					pageSize: 10,
					page: 1
				},
				nameList: [],
				partsList: [
					{label: "全选",value: ""},
					{label: "生之花",value: "1"},
					{label: "死之羽",value: "2"},
					{label: "时之沙",value: "3"},
					{label: "空之杯",value: "4"},
					{label: "理之冠",value: "5"}],
				relicsList:[],
				relicsExcel: [],
				tableDataRow: [
					{prop: 'num',label: '序号'}, 
					{prop: 'name',label: '名称'},
					{prop: 'parts',label: '部位'}],
				tableDataRelicsTotal: 0,
				rows: {
					pageSize: 10,
					page: 1
				},
				
				dialogTableVisible: false,
				
				loading: false,
				tempData: [],
				disable: false,
			}
		},
		methods: {
			tableRowClassName({
				row,
				rowIndex
			}) {
				if (rowIndex % 2 == 1) {
					return "el-table__row--striped";
				}
			},
			resize() {
			  this.tableHeight = document.documentElement.clientHeight * 0.8 ;
			},
			selectRelicsName(){
				selectRelicsName().then(res => {
					this.nameList = res
				})
			},
			//圣遗物信息查询
			selectRelics(){
				selectRelics(this.dataArray).then(res =>{
					this.relicsExcel = res
				})
			},
			//圣遗物信息查询 分页
			selectRelicsFy(){
				this.dataArray.page = this.rows.page
				this.dataArray.pageSize = this.rows.pageSize
				selectRelicsFy(this.dataArray).then(res =>{
					this.relicsList = res.rows
					this.tableDataRelicsTotal = res.total
				})
			},
			//分页
			handleSize(val) {
				this.rows.pageSize = val
				this.selectRelicsFy()
			},
			handleCurrent(val) {
				this.rows.page = val
				this.selectRelicsFy()
			},
			//查询
			ssQuery() {
				this.selectRelics()
				this.selectRelicsFy()
			},
			
			//采集Excel数据
			async handle(ev) {
				let name = ev.name
				this.disable = true
				let file = ev.raw;
				if (!file) return;

				this.loading = true
				//读取File中的数据(变为json格式)
				let data = await readFile(file)
				let workbook = XLSX.read(data, {
						type: "binary"
					}),
					worksheet = workbook.Sheets[workbook.SheetNames[0]]
				data = XLSX.utils.sheet_to_json(worksheet)

				//处理数据
				let arry = []
				data.forEach(item => {
					let obj = {}
					for (let key in character) {
						if (!character.hasOwnProperty(key)) break;
						let v = character[key],
							text = v.text,
							type = v.type
						v = item[text] || "";
						type === "string" ? (v = String(v)) : null
						obj[key] = v;
					}
					arry.push(obj)
				})

				await delay(100)
				//展示到页面中
				this.tempData = arry
				this.disable = false
				relicsInfo(this.tempData).then(res => {
					this.loading = false
					alert(res)
				})
			},
			//导出
			async relicsExportExcel() {
			  let arr = this.relicsExcel.map(item => {
			    return {
			      序号: item.num,
			      名称: item.name,
			      部位: item.parts,
				  攻击力: item.atk, 
			      防御力: item.def,
			      生命值: item.hp,
			      百分比攻击: item.atks,
			      百分比防御: item.defs,
			      百分比生命: item.hps,
			      元素精通: item.em,
			      元素充能效率: item.ec,
			      暴击率: item.hit,
			      暴击伤害: item.fatk,
			      元素伤害加成: item.aps,
			      物理伤害加成: item.ads,
			      治疗加成: item.tmt
			    }
			  })
			  let sheet = XLSX.utils.json_to_sheet(arr),
			    book = XLSX.utils.book_new()
			  XLSX.utils.book_append_sheet(book, sheet, "sheet1")
			  XLSX.writeFile(book, "圣遗物.xlsx")
			},
		},
		mounted() {
			this.selectRelicsName()
			this.selectRelics()
			this.selectRelicsFy()
		},
		created() {
			this.resize()
		}
	}
</script>

<style>
	.data_main{
		position: relative;
		width: 100%;
	}
	.data_table{
		/* position: absolute;
		top: 40px; */
		overflow: auto;
	}
	.el-dialog__title {
	    line-height: 24px;
	    font-size: 24px;
		font-weight: bold;
	    color: #303133;
		margin-left: 50%;
	}
	.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
	    border: 1px solid #EBEEF5;
	}
</style>
