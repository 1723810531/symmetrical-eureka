import {request} from "./request";

//圣遗物分类
export function selectRelicsName() {
   return request({
     url:'/Rest/addData/selectRelicsName',
	 method:"post",
   })
}
//圣遗物信息
export function selectRelics(dataArray) {
   return request({
     url:'/Rest/addData/selectRelics',
	 method:"post",
	data: dataArray
   })
}
//圣遗物信息,分页
export function selectRelicsFy(dataArray) {
   return request({
     url:'/Rest/addData/selectRelicsFy',
	 method:"post",
	 data: dataArray
   })
}
//导入圣遗物信息
export function relicsInfo(dataArray) {
  return request({
    url:'/Rest/addData/relicsInfo',
    method:"post",
    data: dataArray
  })
}
//设置异步间隔延迟
export function delay(interval = 0) {
  return new Promise(resolve => {
    let timer = setTimeout(_ => {
      clearTimeout(timer)
      resolve()
    }, interval)
  })
}
//文件按二进制读取
export function readFile(file) {
  return new Promise(resolve => {
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = ev => {
      resolve(ev.target.result);
    }
  })
}
//字段对应表
export let character = {
  name: { text: "名称", type: "string"},
  parts: { text: "部位", type: "string"},
  atk: { text: "攻击力", type: "string"},
  def: { text: "防御力", type: "string"},
  hp: { text: "生命值", type: "string"},
  atks: { text: "百分比攻击", type: "string"},
  defs: { text: "百分比防御", type: "string"},
  hps: { text: "百分比生命", type: "string"},
  em: { text: "元素精通", type: "string"},
  ec: { text: "元素充能效率", type: "string"},
  hit: { text: "暴击率", type: "string"},
  fatk: { text: "暴击伤害", type: "string"},
  aps: { text: "元素伤害加成", type: "string"},
  ads: { text: "物理伤害加成", type: "string"},
  tmt: { text: "治疗加成", type: "string"}
}
