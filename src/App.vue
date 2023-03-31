<script setup>
import {onMounted,ref} from 'vue'
import axios from 'axios'
import ExcelFile from "./excel.xlsx?sheetjs"
import { Form, Field, CellGroup,Button,Toast} from 'vant';
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
const result = ref(null)
const loading = ref(false)
const onSubmit = debounce((values) => {
  result.value = null
  axios.get('https://service-ioate8yw-1258336146.gz.apigw.tencentcs.com/release/search',{
    params:{
      username:username.value,
      cdCard:cdCard.value
    }
  }).then(res => {
    const data = res.data.data
    if(data.length>0){
      result.value = data[0]
    }else{
      showToast('未查到数据');
    }
  })
});



</script>

<template>
<header>数据查询</header>
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
      name="身份证"
      label="身份证"
      placeholder="身份证"
      :rules="[{ required: true, message: '请填写身份证' }]"
    />
  </CellGroup>
  <div style="margin: 16px;">
    <Button round block type="primary" native-type="submit">
      查询
    </Button>
  </div>
  <div class="result">
    <div v-if="result" class="content">
        编号{{result['编号']}}
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
header{
  height: 50px;
  line-height: 50px;
  text-align: center;
}
</style>
