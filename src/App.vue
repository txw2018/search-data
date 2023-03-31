<script setup>
import {onMounted,ref} from 'vue'
import ExcelFile from "./excel.xlsx?sheetjs"
import { Form, Field, CellGroup,Button} from 'vant';
const username = ref('');
const cdCard = ref('');
const result = ref('')
const loading = ref(false)
const onSubmit = (values) => {
  console.log(ExcelFile);
  const data = ExcelFile.filter(item => {
    return item['姓名'] == username.value && item['身份证'] == cdCard.value
  })
  if(data.length){
    result.value = data[0]
  }
};



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
