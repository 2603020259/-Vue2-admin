<template>
    <div>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            background-color="#a262ad" text-color="#fff" active-text-color="aqua" :collapse="isAuth">
            <div class="icons">
                <span v-show="!isAuth">宠物后台管理系统</span>
                <span v-show="isAuth">菜单</span>
            </div>
            <el-menu-item @click="clickMenu(item)" v-for="item in nomenuData" :key="item.name" :index="item.name">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </el-menu-item>
            <el-submenu v-for="item in hasmenuData" :key="item.label" :index="item.label">
                <template slot="title">
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span slot="title">{{ item.label }}</span>
                </template>
                <el-menu-item-group v-for="p in item.children" :key="p.name">
                    <el-menu-item :index="p.name" @click="clickMenu(p)">{{ p.label }}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'Aside',
    data() {
        return {
            //isCollapse: this.isAuth,
           // menuData: [],
        };
    },
    methods: {
        //...mapMutations('headerAbout', { clickMenu: 'CHANGROUTER' }),
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickMenu(item) {
            if (this.$route.path !== item.path && !(this.$route.path === '/home' && (this.$route.path === '/'))) {
                this.$router.push(item.path);
            }
            this.$store.commit('headerAbout/CHANGROUTER', item);
        }
    },
    computed: {
        nomenuData() {
            return this.menuData.filter((item) => {
                return item = !item.children&&item.label !=='个人主页';
            });
        },
        hasmenuData() {
            return this.menuData.filter((item) => {
                return item = item.children;
            });
        },
        menuData(){
          return JSON.parse(sessionStorage.getItem('menu')) || this.$store.state.asideAbout.menu;
        },
        ...mapState('headerAbout', { isAuth: 'isAuth' }),
    },
    mounted(){
       console.log(this.$store)
    }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu {
    height: 100vh;
    border-right: none;
}

.icons {
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
    font-weight: 700;
}
</style>