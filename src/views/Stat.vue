<template>
    <div class="stat">
        <!--头部-->
        <div>
            <span style="margin-left: 30px; font-size: 24px;">Overview</span>
            <el-button style="float: right; margin-right: 30px;" size="small" type="primary" :loading="loging"
                @click="goTo">点击前往</el-button>
        </div>
        <!--数据-->
        <div>
            <el-row :gutter="20">
                <el-col :span="6" class="cal" v-for="item in statData" :key="item.tata">
                    <div class="grid-content bg-purple">
                        <el-card shadow="hover">
                            <div class="s1">{{ item.tata }}</div><br>
                            <div class="s2">${{ item.menth }} &nbsp;&nbsp;<span class="s3" :style="{ color: item.color }">{{
                                item.status }}<i :class="`el-icon-${item.icon}`"></i></span></div>

                            <span class="s4">{{ item.compared }}</span>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div>
            <el-row :gutter="12">
                <el-col :span="16" style="padding-left: 20px; margin-top: 18px;">
                    <el-card shadow="hover">
                        <div ref="echarts1" class="eacher"></div>
                    </el-card>
                </el-col>
                <el-col :span="8" style="padding-right: 20px; margin-top: 18px;">
                    <el-card shadow="hover">
                        <div ref="echarts2" class="eacher"></div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div>
            <el-row :gutter="12">
                <el-col :span="8" style="padding-left: 20px; margin-top: 18px;">
                    <el-card shadow="hover" class="eacher2">
                        <div class="icons" style="border: 6px solid aqua; width: 70px; height: 70px; border-radius: 35px;">
                            <i class="el-icon-s-goods" style="color: aqua;font-size: 40px;"></i>
                        </div>
                        <div class="sizes">
                            <div style="font-size: 24px; font-weight: bold;">$23753</div>
                            <span style="font-weight: 400; font-size: 12px; color: dimgray;">Adidas yeezy boots 335</span>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8" style="margin-top: 18px;">
                    <el-card shadow="hover" class="eacher2">
                        <div class="icons"
                            style="border: 6px solid blueviolet ; width: 70px; height: 70px; border-radius: 35px;">
                            <i class="el-icon-shopping-cart-full"
                                style="color:blueviolet; font-size: 35px; align:center;"></i>
                        </div>
                        <div class="sizes">
                            <div style="font-size: 24px; font-weight: bold;">$76196</div>
                            <span style="font-weight: 400; font-size: 12px; color: dimgray;">London global factory smell
                                460</span>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8" style="padding-right: 20px; margin-top: 18px;">
                    <el-card shadow="hover" class="eacher2">
                        <div class="icons"
                            style="border: 6px solid deeppink; width: 70px; height: 70px; border-radius: 35px;">
                            <i class="el-icon-office-building" style="color:deeppink; font-size: 40px;"></i>
                        </div>
                        <div class="sizes">
                            <div style="font-size: 24px; font-weight: bold;">$7629</div>
                            <span style="font-weight: 400; font-size: 12px; color: dimgray;">Nike air force triple
                                white</span>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
    
<script>
import * as echarts from 'echarts';
import 'bootstrap/dist/css/bootstrap.min.css';
var path = 'file:///Users/modi/Desktop/vu2_text/src/Eachat%E6%95%B0%E6%8D%AE%E5%8F%AF%E8%A7%86%E5%8C%96/index.html'
export default {
    name: 'Stat',
    data() {
        return {
            loging: false,
            statData: [
                {
                    tata: 'Sales',
                    menth: '27632',
                    status: '+2.5%',
                    compared: 'Compared to ($21340 last year)',
                    color: 'aquamarine',
                    icon: 'top'
                },
                {
                    tata: 'Purchase',
                    menth: '20199',
                    status: '+0.5%',
                    compared: 'Compared to ($19000 last year)',
                    color: 'aquamarine',
                    icon: 'top'
                },
                {
                    tata: 'Return',
                    menth: '2300',
                    status: '-1.3%',
                    compared: 'Compared to ($167 last year)',
                    color: 'red',
                    icon: 'bottom'
                },
                {
                    tata: 'Marketing',
                    menth: '12632',
                    status: '+2.8%',
                    compared: 'Compared to ($10500 last year)',
                    color: 'aquamarine',
                    icon: 'top'
                },
            ]
        }
    },
    mounted() {
        const chartBOM1 = this.$refs.echarts1;
        const myChart1 = echarts.init(chartBOM1);
        var option1;
        option1 = {
            title: {
                text: 'Pet data display'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['Edinburgh', 'London', 'ShangHai']
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [5037, 4260, 3901, 5934, 8290, 10330, 12320],
                    type: 'line',
                    smooth: true,
                    color: 'rgb(189, 106, 237)',
                    name: 'Edinburgh',
                },
                {
                    data: [5820, 7932, 4601, 6934, 10290, 5330, 4320],
                    type: 'line',
                    smooth: true,
                    color: 'aquamarine',
                    name: 'London',
                },
                {
                    data: [820, 5932, 7901, 11934, 2290, 7330, 9320],
                    type: 'line',
                    smooth: true,
                    color: 'red',
                    name: 'ShangHai',
                }
            ]
        };
        option1 && myChart1.setOption(option1);
        const chartBOM2 = this.$refs.echarts2;
        const myChart2 = echarts.init(chartBOM2);
        var option2;
        option2 = {
            title: {
                text: 'Sales volume this quarter'
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [
                        {
                            value: 200,
                            itemStyle: {
                                color: 'rgb(86, 239, 239)',
                            }
                        },
                        {
                            value: 240,
                            itemStyle: {
                                color: 'rgb(99, 232, 121)',
                            }
                        },
                        {
                            value: 155,
                            itemStyle: {
                                color: 'rgb(240, 145, 81)',
                            }
                        },
                        {
                            value: 210,
                            itemStyle: {
                                color: 'rgb(81, 138, 240)',
                            }
                        },
                        {
                            value: 180,
                            itemStyle: {
                                color: 'rgb(121, 81, 240)',
                            }
                        },
                        {
                            value: 160,
                            itemStyle: {
                                color: 'rgb(224, 81, 240)',
                            }
                        },
                        {
                            value: 210,
                            itemStyle: {
                                color: 'rgb(240, 81, 145)',
                            }
                        },
                    ],
                    type: 'bar'
                }
            ]
        };
        option2 && myChart2.setOption(option2);
        if (window.innerHeight < 790 && innerWidth < 1440) {
            this.$message({
                message: '为了您更好的使用该系统,请全屏使用',
                type: 'warning',
                center: true,
            });
        }
    },
    methods: {
        goTo() {
            this.loging = !this.loging;
            this.$confirm('次操作将进入公司内部大屏数据可视化界面,此操做会跳出本系统, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '操作成功,请耐心等待!',
                    center: true,
                    offset: 70
                });
                this.loging = false;
                setTimeout(() => {
                   window.open('../static/index.html');
                }, 3000);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作',
                    center: true,
                    offset: 70
                });
                this.loging = false;
            });
        }
    },
}
</script>
    
<style lang="less" scoped>
.stat {
    height: 98%;
    background-color: hsla(180, 19%, 94%, 0.438);
    overflow: scroll;

    .cal {
        display: flex;
        justify-content: space-around;

        .s1 {
            font-weight: bold;
            font-size: 18px;
        }

        .s2 {
            font-size: 18px;
            font-weight: bold;
        }

        .s3 {
            font-size: 12px;
        }

        .s4 {
            padding-right: 40px;
            font-size: 10px;
            font-weight: 400;
        }
    }

    .eacher {
        width: 100%;
        height: 300px;
    }

    .eacher2 {
        position: relative;
        display: flex;
        height: 90px;
        align-items: center;
        justify-content: space-between;

        .icons {
            line-height: 70px;
            text-align: center;
        }

        .sizes {
            position: absolute;
            left: 120px;
            top: 10px;
        }
    }
}
</style>