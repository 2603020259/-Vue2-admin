import 'element-ui';

//数据消息回调
/*
export default{
 news :  ()=> {
    this.$message({
        showClose: true,
        message: '这是一条消息提示',
        type: 'news'
    });
},
//数据成功的回调
 success :  ()=> {
    this.$message({
        showClose: true,
        message: '恭喜你，这是一条成功消息',
        type: 'success'
    });
},

//这是一个数据警告的回调
 warning : ()=> {
    this.$message({
        showClose: true,
        message: '警告哦，这是一条警告消息',
        type: 'warning'
    });
},

//这是一个数据错误的回调
  error: ()=> {
    this.$message({
        showClose: true,
        message: '错了哦，这是一条错误消息',
        type: 'error'
    });
}
}
*/
export default{
    success:()=>{
        this.$message({
            message: '恭喜你，这是一条成功消息',
            type: 'success'
          });
    }
}
