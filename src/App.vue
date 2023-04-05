<script setup>
import {onMounted,ref} from 'vue'
import axios from 'axios'
import ExcelFile from "./excel.xlsx?sheetjs"
import { Form, Field, CellGroup,Button,Toast,showLoadingToast,closeToast } from 'vant';


import { showToast } from 'vant';
function debounce(fn, delay = 500) {
    // timer 是在闭包中的
    let timer = null;
    
    return function() {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}
const username = ref('');
const cdCard = ref('');
const result = ref([])
const loading = ref(false)
const onSubmit = debounce((values) => {
  result.value = []
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
  });
  axios.get('https://service-ioate8yw-1258336146.gz.apigw.tencentcs.com/release/search',{
    params:{
      username:username.value,
      cdCard:cdCard.value
    }
  }).then(res => {
    closeToast();
    const data = res.data.data
    if(data.length>0){
     
      result.value = data.map(item => {
        delete item['身份证号码']
        return {
          ...item,
        }
      })
    }else{
      showToast('未查到数据');
    }
  }).catch(err => {
     closeToast();
  })
});



</script>

<template>
<header>宁乡市2023年团员编号分配</header>
<Form @submit="onSubmit">
  <CellGroup inset>
    <Field
      v-model="username"
      name="姓名"
      label="姓名"
      placeholder="姓名"
      :rules="[{ required: true, message: '请填写姓名' }]"
    />
    <Field
      v-model="cdCard"
      type="cdCard"
      name="身份证号码"
      label="身份证号码"
      placeholder="身份证号码"
      :rules="[{ required: true, message: '请填写身份证号码' }]"
    />
  </CellGroup>
  <div style="margin: 16px;">
    <Button round block type="primary" native-type="submit">
      查询
    </Button>
  </div>
  <div class="result">
    <div v-if="result.length" class="content">
      <ul class="content-wrap" v-for="(item,index) in result"  :key="index">
        <li class="list"  v-for="(value,key) in item" :key="key" >
          <span class="key">{{key}}:</span>
          <span class="value">{{value}}</span>
        </li>
      </ul>
      </div>
        <div v-else>
        暂无数据
  </div>
 
  </div>
</Form>

</template>

<style>
@import '@/assets/base.css';

.result{
  text-align: center;
}
.content{
  font-size: 20px;
}
.content-wrap{
  margin-bottom: 10px;
}
.content-wrap li:first-child{
  color: red;
}
header{
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}
.list{
  margin: 0 20px;
  padding: 5px 0;
  display: flex;
  font-size: 14px;
  text-align: left;
  position: relative;
}
.list::after{
  content: '';
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: 0px;
  right: 0px;
  border-bottom: 1px solid #ebedf0;
  transform: scaleY(0.5);


}
.key{
  width: 100px;
  
}
.value{
  margin-left: 5px;
  flex: 1;
}
</style>
