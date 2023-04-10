<template>
    <div class="home">
        <el-row>
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="user">
                        <img :src="require(`../assets/login${infrom.url}.jpeg`)" alt="">
                        <div class="userIf">
                            <p class="name">{{ infrom.name }}</p>
                            <p class="access">{{ infrom.position }}</p>
                        </div>
                    </div>
                    <div class="success">
                        <p>上次登陆时间: <span>{{ infrom.time }}</span></p>
                        <p>上次登陆地点: <span>{{ infrom.addre }}</span></p>
                    </div>
                </el-card>
                <el-card shadow="hover" style="margin-top: 20px; height: 254px; font-size: 14px;">
                    <el-table :data="tableData" stripe style="width: 100%" size="mini">
                        <el-table-column prop="name" label="品种">
                        </el-table-column>
                        <el-table-column prop="dayBuy" label="今日购买">
                        </el-table-column>
                        <el-table-column prop="mouBuy" label="本月购买">
                        </el-table-column>
                        <el-table-column prop="talBuy" label="总购买">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="16">
                <div class="grid-content bg-purple-light" style="margin-left: 20px;">
                    <div class="block">
                        <el-carousel trigger="click" height="350px">
                            <el-carousel-item v-for="item in 3" :key="item">
                                <h3 class="small">
                                    <img v-show="item === 1" src="../assets/bj1.jpeg">
                                    <img v-show="item === 2" src="../assets/bj2.jpeg">
                                    <img v-show="item === 3" src="../assets/bj3.jpeg">
                                </h3>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
                <div class="num" style="margin-top: 20px; margin-left: 20px;">
                    <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:'0px'}">
                       <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                       <div class="detail">
                       <p class="price">¥ {{ item.value }}</p>
                       <p class="desc">{{ item.name }}</p>
                    </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {getData} from '../api/index';
export default {
    name: 'Home',
    data() {
        return {
            countData:[],
            tableData:[],
            infrom:{},
        }
    },
    mounted() {
       getData().then(value=>{
        this.countData=value.data.data.countData;
        this.tableData=value.data.data.tableData;
        //console.log('value',value);
       },err=>{
        console.log('err',err);
        this.$router.replace({ name: '404' });
       });
      this.infrom= JSON.parse(sessionStorage.getItem('infrom'))|| this.$store.state.asideAbout.infrom;
      console.log(2222,this.infrom);
     // this.url=require(this.infrom.url);
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

<style lang="less">
.home {
    background-color: rgba(245, 227, 233, 0.6);
    .user {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;

        img {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            margin-bottom: 20px;
        }

        .userIf {
            margin-left: 30px;

            .name {
                font-size: 28px;
                font-weight: 400;
                margin-bottom: 10px;
            }

            .access {
                color: #999999;
                font-size: 14px;
            }
        }
    }

    .success {
        margin-top: 20px;

        p {
            font-size: 14px;
            color: #999999;
            margin: 5px;
        }

        span {
            margin-left: 50px;
            color: #1d1919;
        }
    }
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 350px;
    margin: 0;

    img {
        width: 100%;
        height: 100%;
    }
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .icon{
        width: 70px;
        height: 75px;
        font-size: 25px;
        text-align: center;
        line-height: 75px;
        color: #fff;
    }
    .detail{
        display: flex;
        flex-direction: column;
        justify-content: center;
        .price{
            font-size: 30px;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;
            margin-left: 20px;
        }
        .desc{
            font-size: 14px;
            color: #999;
            text-align: center;
            margin-left: 20px;
        }
    }
  .el-card{
    width: 32%;
    margin-bottom: 15px;
  }
}
</style>