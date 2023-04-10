<template>
    <div class="header">
        <div class="header-button" @click="isAuth = !isAuth">
            <el-button :icon="`el-icon-${tt}`" size="mini" @click="showIsauth(isAuth)"></el-button>
            <div class="mianbao">
                <el-breadcrumb separator=" ">
                    <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{
                        item.label }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="imgs">
            <el-col :span="12">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        <img :src="require(`../assets/login${infrom.url}.jpeg`)">
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <div @click="personl">
                            <el-dropdown-item>个人中心</el-dropdown-item>
                        </div>
                        <div @click="exitss">
                            <el-dropdown-item>退出</el-dropdown-item>
                        </div>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </div>
    </div>
</template>

<script>
import Cookie from 'js-cookie';
import { mapActions, mapState } from 'vuex';
export default {
    name: 'Header',
    data() {
        return {
            isAuth: false,
            infrom:{},
        }
    },
    methods: {
        ...mapActions('headerAbout', { showIsauth: 'show' }),
        exitss() {
            //console.log(1111);
            this.$confirm('是否要退出系统, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //退出逻辑
                sessionStorage.removeItem('name');
                Cookie.remove('Login');
                sessionStorage.removeItem('menu');
                sessionStorage.removeItem('infrom');
                this.$router.replace({ name: 'login' });
                location.reload();
                this.$message({
                    type: 'success',
                    message: '退出成功!',
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作',
                    offset: 70
                });
            });

        },
        personl(){
            this.$router.push({name:'personl'})
        }
    },
    computed: {
        tt() {
            return this.isAuth === true ? 'menu' : 's-grid';
        },
        ...mapState('headerAbout', { tags: 'routerList' }),
    },
   mounted(){
    this.infrom= JSON.parse(sessionStorage.getItem('infrom'))|| this.$store.state.asideAbout.infrom;
   }
}
</script>

<style lang="less">
.header {
    height: 60px;
    background-color: rgb(190, 72, 203);
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .text {
        color: #fff;
        font-size: 14px;
        margin-left: 15px;
    }

    .imgs {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
    }

    .imgs img {
        width: 40px;
        height: 40px;
    }

    .mianbao {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: normal;
        cursor: pointer;
        position: absolute;
        left: 80px;
        top: 23px;
        color: #ccc;

        .el-breadcrumb__inner.is-link {
            color: rgba(234, 228, 228, 0.25) !important;
        }

        .el-breadcrumb__inner.is-link:last-child {
            color: pink;
        }
    }
}
</style>