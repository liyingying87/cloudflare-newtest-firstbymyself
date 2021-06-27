//api.js
import Mock from 'mockjs'
Mock.mock('/user/login',{
    "status":0,
    "data":{
        "id":2
    },
    "msg":"成功"
})