<template>
    <div class="login">
        <img src="../assets/lodinBj.jpeg" class="img">
        <div class="container">
            <div class="from-box">
                <!-- 登录 -->
                <div class="login-box">
                    <el-form :model="form" :rules="rules" ref="form">
                        <h1>login</h1>
                        <el-form-item label="" prop="username" class="input">
                            <el-input v-model="form.username" placeholder="请输入账号"
                                style="background-color: transparent;"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="password" class="input">
                            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="button" style="margin-left: 40px;" @click="loginHome">登陆</el-button>
                        </el-form-item>
                    </el-form>
                </div>

            </div>
            <div class="con-box right">
                <h2>欢迎来到<span>宠物之家</span></h2>
                <p>快来领取你的可爱<span>宠物</span>吧</p>
                <img src="../assets/2.png" alt="">
                <span v-show="logins" class="logins"><div class="loader">加载中...</div></span>
            </div>
        </div>
    </div>
</template>

<script>
import Mock from 'mockjs';
import Cookie from 'js-cookie';
import { getMenu } from '../api/index';
export default {
    name: 'MyLogin',
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
            rules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                password: [
                    { required: true, trigger: 'blur', message: '请输入密码' }
                ]
            },
            logins:false,
        }
    },
    methods: {
        loginHome() {
            //const token = Mock.Random.guid();
            //Cookie.set('Login', token);
            //this.$router.push({ name: 'home' });
            //location.reload();
            //this.$message({
            //message: '登陆成功',
            //type: 'success',
            //center:true,

            // });
            this.logins=true;
            this.$refs.form.validate((valid) => {
                if (valid) {
                    getMenu(this.form).then(({ data }) => {
                        console.log(data);
                        if (data.code === 20000) {
                            setTimeout(() => {
                            this.$message({
                                message: '登陆成功',
                                type: 'success',
                                center: true,
                            });
                            Cookie.set('Login', data.data.token);
                            this.$router.push({ name: 'home' });
                            console.log(data.data.menu);
                            //this.menu=data.data.menu;
                            this.$store.commit('asideAbout/MENU', data.data.menu);
                            this.$store.commit('asideAbout/INFROM', data.data.Infrom);
                            this.$store.commit('asideAbout/ADDMENU', this.$router);
                            }, 3000)
                        } else {
                             setTimeout(() => {
                            this.$message({
                                message: data.data.message,
                                type: 'error',
                                center: true,
                            });
                            }, 3000);
                        }

                    })
                }
            })
        }
    },
    mounted() {
        //console.log(window.innerHeight,window.innerWidth)
        if (window.innerHeight < 790 && innerWidth < 1440) {
            this.$message({
                message: '为了您更好的使用该系统,请全屏使用',
                type: 'warning',
                center: true,
            });
        }
    },
}
</script>

<style scoped>
.login {
    /* 100%的窗口高度 */
    height: 100vh;
    /* 弹性布局 水平+垂直居中 */
    display: flex;
    align-items: center;
    justify-content: center;
    /* 渐变背景 */
    background: linear-gradient(200deg, #f3e7e9, #e3eeff);
}


.container {
    background-color: #fff;
    width: 650px;
    height: 415px;
    /* 阴影 */
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
    /* 相对定位 */
    position: relative;
}

.from-box {
    /* 绝对定位 */
    position: absolute;
    top: -10%;
    left: 5%;
    background-color: #d3b7d8;
    width: 320px;
    height: 500px;
    border-radius: 5px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    /* 弹性布局 水平+垂直居中 */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    /* 动画过渡 加速之后 减速 */
    transition: 0.5s ease-in-out;
}

.img {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 100%;
    height: 97%;
}

.register-box,
.login-box {
    /* 弹性布局 垂直排列 */
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.hidden {
    display: none;
    transition: 0.5s;
}

h1 {
    text-align: center;
    margin-bottom: 25px;
    /* 大写字母 */
    text-transform: uppercase;
    color: #fff;
    /* 字间距 */
    letter-spacing: 5px;
}

:deep(.el-input__inner) {
    background-color: transparent;
    width: 240px;
    border-radius: 0;
    color: #fff;
    border: none;
    /* 下边框样式 */
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    padding: 10px 0;
    text-indent: 10px;
    margin: 8px 0;
    font-size: 14px;
    /* 字间距 */
    letter-spacing: 2px;
}

:deep(.el-input__inner)::placeholder {
    color: #fff;
}

:deep(.el-input__inner):focus {
    color: #a262ad;
    outline: none;
    border-bottom: 1px solid #a262ad80;
    transition: 0.5s;
}

:deep(.el-input__inner):focus::placeholder {
    opacity: 0;
}

.from-box .button {

    width: 70%;
    margin-top: 35px;
    background-color: #f6f6f6;
    outline: none;
    border-radius: 8px;
    padding: 13px;
    color: #a262ad;
    letter-spacing: 2px;
    border: none;
    cursor: pointer;
}

.from-box .button:hover {
    background-color: #a262ad;
    color: #f6f6f6;
    transition: background-color 0.5s ease;
}

.con-box {
    width: 50%;
    /* 弹性布局 垂直排列 居中 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* 绝对定位 */
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.con-box.left {
    left: -2%;
}

.con-box.right {
    right: -2%;
}

.con-box h2 {
    color: #8e9aaf;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: 3px;
    text-align: center;
    margin-bottom: 4px;
}

.con-box p {
    font-size: 12px;
    letter-spacing: 2px;
    color: #8e9aaf;
    text-align: center;
}

.con-box span {
    color: #d3b7d8;
}

.con-box img {
    width: 150px;
    height: 150px;
    opacity: 0.9;
    margin: 40px 0;
}

.con-box button {
    margin-top: 3%;
    background-color: #fff;
    color: #a262ad;
    border: 1px solid #d3b7d8;
    padding: 6px 10px;
    letter-spacing: 1px;
    outline: none;
    /* 鼠标放上变小手 */
    cursor: pointer;
}

.con-box button:hover {
    background-color: #a262ad;
    color: #f6f6f6;
}
.loader:before,
.loader:after,
.loader {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
  position: fixed;
  top: -110px;
}
.loader {
  margin: 8em auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  -webkit-animation-delay: 0.16s;
  animation-delay: 0.16s;
}
.loader:before {
  left: -3.5em;
}
.loader:after {
  left: 3.5em;
  -webkit-animation-delay: 0.32s;
  animation-delay: 0.32s;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em #b25cee;
  }
  40% {
    box-shadow: 0 2.5em 0 0 #ef427c;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em #ab43eb;
  }
  40% {
    box-shadow: 0 2.5em 0 0 #fa9dff;
  }
}
.logins{
    display: inline-block;
    width: 150px;
    height: 40px;
    position: relative;
}
</style>