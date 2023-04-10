<template>
    <div class="personl">
        <el-row :gutter="20">
            <el-col :span="8">
                <div>
                    <el-card shadow="hover">
                        <div class="left">
                            <div class="login">
                                <img :src="require(`../assets/login${infrom.url}.jpeg`)" alt="">
                            </div>
                            <div class="userIf">
                                <p class="name"><span style="font-weight: bold; font-size: 18px;">名称:</span>{{ infrom.name }}</p>
                                <p class="access"><span style="font-weight: bold; font-size: 18px;">职务:</span>{{ infrom.position }}</p>
                            </div>

                        </div>
                    </el-card>
                    <div class="tools">
                        <div style="margin-top: 35px; opacity: 1;">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-card shadow="hover" style="height: 85px;">
                                        <div @click="Times" class="btn" :class="{ active: times }">日历</div>
                                    </el-card>
                                </el-col>
                                <el-col :span="12">
                                    <el-card shadow="hover" style="height: 85px;">
                                        <div class="btn" @click="Personl" :class="{ active: personls }">个人信息</div>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </div>
                        <div style="margin-top: 35px;">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-card shadow="hover" style="height: 85px;">
                                        <div class="btn" @click="Notice" :class="{ active: notice }">通知公告</div>
                                    </el-card>
                                </el-col>
                                <el-col :span="12">
                                    <el-card shadow="hover" style="height: 85px;">
                                        <div class="btn" @click="Style" :class="{ active: style }">公司风采</div>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </div>
                        <div style="margin-top: 35px;">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-card shadow="hover" style="height: 85px;">
                                        <div class="btn" @click="Mission" :class="{ active: mission }">今日任务</div>
                                    </el-card>
                                </el-col>
                                <el-col :span="12">
                                    <el-card shadow="hover" style="height: 85px;">
                                        <div class="btn" @click="Version" :class="{ active: version }">系统版本</div>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="right">
                    <!--日历-->
                    <div v-show="times">
                        <el-calendar style="background: transparent; font-size: 16px;">
                            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
                            <template slot="dateCell" slot-scope="{date, data}">
                                <p :class="data.isSelected ? 'is-selected' : ''">
                                    {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : '' }}
                                </p>
                            </template>
                        </el-calendar>
                    </div>
                    <!--个人信息-->
                    <div v-show="personls" style="height: 600px;">
                        <div class="box">
                            <p><span>姓名:&nbsp;&nbsp;</span>{{ infrom.name }}</p>
                            <p><span>性别:&nbsp;&nbsp;</span>{{ infrom.sex }}</p>
                            <p><span>地址:&nbsp;&nbsp;</span>{{ infrom.address }}</p>
                            <p><span>手机号:&nbsp;&nbsp;</span>{{ infrom.iphoneNamber }}</p>
                            <p><span>职务:&nbsp;&nbsp;</span>{{ infrom.position }}</p>
                            <p><span>公司:&nbsp;&nbsp;</span>{{infrom.company }}</p>
                            <p><span>职务等级:&nbsp;&nbsp;</span>{{ infrom.grade }}</p>
                        </div>
                    </div>
                    <!--通知公告-->
                    <div v-show="notice" style="height: 600px;">
                        <div style="margin-top: 70px; margin-left: 50px;">
                            <el-link type="primary"
                                style="font-size: 16px; margin-top: 5px;">3月销量'斯芬克斯'销量领先,位居下一位的是人称猫公主的'布偶猫'。</el-link><br>
                            <el-link type="primary"
                                style="font-size: 16px; margin-top: 5px;">4月,福利要来了,家人们要加油哦!!!!!。</el-link><br>
                            <el-link type="danger" style="font-size: 16px; margin-top: 5px;">系统软件使用不合格扣分警告统计。</el-link><br>
                            <el-link type="warning"
                                style="font-size: 16px; margin-top: 5px;">真是炸裂,群众最不看好的猫猫系列,这个月竟然大卖了,喜欢的伙伴们可以冲啊,现在购入有折扣哦。</el-link><br>
                            <el-link type="primary"
                                style="font-size: 16px; margin-top: 5px;">明天早上公司总部开会'地点:xxx大厦33楼,个位不要迟到哦。'</el-link><br>
                            <el-link type="danger"
                                style="font-size: 16px; margin-top: 5px;">最新通知:'埃及猫要进行统一加价,请各公司经理传达到位。'</el-link><br>
                            <el-link type="primary"
                                style="font-size: 16px; margin-top: 5px;">4月员工生日会,请名单中的员工晚上8点准时参与活动,活动地点;'南京市xxx饭店6楼16厅。'</el-link><br>
                            <el-link type="primary"
                                style="font-size: 16px; margin-top: 5px;">请1,2月份入职的员工到当地城市公司相关部门进行培训</el-link><br>
                            <el-link type="primary"
                                style="font-size: 16px; margin-top: 5px;">恭喜:'星乐猫咖北京分公司成功上市,北京区的员工本月奖金双倍。'</el-link><br>
                            <el-link type="warning"
                                style="font-size: 16px; margin-top: 5px;">炸裂消息:星乐猫咖成功入驻巴黎市场,今晚全员庆祝:'地点上海市xxx饭店。'</el-link><br>
                            <el-link type="danger"
                                style="font-size: 16px; margin-top: 5px;">本月引进一系列新产品,请各位员工及时推荐。</el-link><br>
                            <el-link type="primary"
                                style="font-size: 16px; margin-top: 5px;">通知:公司系统瘫痪明天'放假一天'。</el-link><br>
                            <el-link type="primary"
                                style="font-size: 16px; margin-top: 5px;">本周销量之最'人称猫公主的布偶猫'。</el-link><br>
                            <el-link type="primary"
                                style="font-size: 16px; margin-top: 5px;">最新消息:'上海xxx女士花费140万购入纯种蓝色海洋布偶。'</el-link><br>
                            <el-link type="primary"
                                style="font-size: 16px; margin-top: 5px;">最新通知:'本月工资已发放,请各位员工及时查验,如有不符,请上报给财务进行审核处理'。</el-link><br>
                            <el-link type="success"
                                style="font-size: 16px; margin-top: 5px;">明天各公司经理进行踏青活动的具体项目和地点,'公司全员将在4月20号进行踏青活动'。</el-link><br>
                        </div>
                    </div>
                    <!--公司风采-->
                    <div v-show="style" style="height: 600px;">
                        <div class="jieshao">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;星乐猫咖有限公司成立于1999年,注册资金3000万,员工4000余人,是上海市一家专业宠物公司。公司的产品主要有'金渐层', '银渐层', '狸花猫', '斯芬克斯', '印度猫', '布偶猫', '波斯猫', '孟买猫',等...,充分发挥产品的优势,提高劳动效率,。优秀的员工，先进的技术，精良的设备，严格的管理是公司得以不断发展养大、产品能够赢得用户依靠的根本所在。“精确、可靠、专业”是我们生产精神和服务信念

                            十几年来,星乐猫咖有限公司在吸取国内外先进技术和工艺的基础上,集多年来在衡器行业的智慧和经验,产品的精度、稳定性,可靠性居全国领先地位,我公司的产品都是经过多层专业人士的筛选和把控,已逐步从第一代产品升级为目前的第六代产品,并仍在研发更为高端的产品,是国内拥有最先进的仪器和技术的公司。凭着先进的技术、卓越的品质、完善的服务,我公司产品跻身于国内宠物公司前列,已成为国内知名上市公司,产品遍及全国各地，我们用心倡导：以市场为导向，以科研为龙头，以创新为手段，用心开拓国内外市场。

                            星乐猫咖有限公司以完善到位的专业化售前、售中、售后服务赢得了国内外客户的信赖和好评，公司在坚持技术创新的基础上，狠抓质量管理，不断提高服务水平，实现了公司业务的良性发展

                            我们用心参与推广以及行业交流活动，公司在长期的发展过程中以过硬的产品质量、良好的产品性能、领先的技术优势和国内许多大型的衡器厂都建立了长期良好的合作伙伴关联，我们也热诚欢迎国内外客户来我司考察，参观及技术交流！
                        </div>
                    </div>
                    <!--今日任务-->
                    <div v-show="mission" style="height: 600px;">
                       <div class="renwu">
                        <el-empty description="暂无任务" :image-size="200"></el-empty>
                       </div>
                    </div>
                    <!--系统版本-->
                    <div v-show="version" style="height: 600px;">
                        <div class="box1">
                            <p><span>系统名称:&nbsp;&nbsp;</span>星乐猫咖后台管理系统</p>
                            <p><span>系统版本:&nbsp;&nbsp;</span>X L 1 . 1 . 0 . 0 . 0</p>
                            <p><span>发行时间:&nbsp;&nbsp;</span>2023年4月1</p>
                            <p><span>作用公司:&nbsp;&nbsp;</span>上海星乐猫咖有限公司</p>
                            <p><span>版本更新:&nbsp;&nbsp;</span>
                                <el-link type="primary">升级版本</el-link> 
                            </p>
                        </div> 
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'Personl',
    data() {
        return {
            times: true,
            personls: false,
            notice: false,
            style: false,
            mission: false,
            version: false,
            infrom:{},
        }
    },
    methods: {
        Times() {
            this.times = true;
            this.personls = false;
            this.notice = false;
            this.style = false;
            this.mission = false;
            this.version = false;
        },
        Personl() {
            this.times = false;
            this.personls = true;
            this.notice = false;
            this.style = false;
            this.mission = false;
            this.version = false;
        },
        Notice() {
            this.times = false;
            this.personls = false;
            this.notice = true;
            this.style = false;
            this.mission = false;
            this.version = false;
        },
        Style() {
            this.times = false;
            this.personls = false;
            this.notice = false;
            this.style = true;
            this.mission = false;
            this.version = false;
        },
        Mission() {
            this.times = false;
            this.personls = false;
            this.notice = false;
            this.style = false;
            this.mission = true;
            this.version = false;
        },
        Version() {
            this.times = false;
            this.personls = false;
            this.notice = false;
            this.style = false;
            this.mission = false;
            this.version = true;
        },
    },
    mounted() {
        this.infrom= JSON.parse(sessionStorage.getItem('infrom'))|| this.$store.state.asideAbout.infrom;
        //console.log(this.infrom);
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
<style lang="less" scoped>
.personl {
    .left {
        height: 200px;
        display: flex;
        align-items: center;

        .login {
            width: 130px;
            height: 130px;
            border-radius: 100%;
            overflow: hidden;

            img {
                height: 100%;
                width: 100%;
            }
        }

        .userIf {
            margin-left: 50px;
        }
    }

    .time {
        height: 100%;
        border: 1px solid rgb(175, 175, 175);
    }

    .right {
        /* 100%的窗口高度 */
        height: 100vh;
        width: 100%;
        /* 弹性布局 水平+垂直居中 */
        display: flex;
        align-items: center;
        justify-content: center;
        //border: 1px solid rgb(177, 177, 177);
        background-image: url('../assets/2.png');
        height: 100%;
        width: 100%;
        overflow: hidden;
        background-size: cover;
        opacity: 0.8;

        .is-selected {
            color: #1989FA;
        }

        :deep(.el-calendar-day) {
            height: 74px;
        }

        :deep(.el-calendar-table .el-calendar-day:hover) {
            opacity: 0.7;
        }

        :deep(.el-calendar-table td.is-selected) {
            opacity: 0.7;
        }

        .box {
            width: 350px;
            height: 310px;
            margin-top: 150px;
            border: 1px solid rgb(189, 189, 189);
            background: #f3bdf0;
            opacity: 0.6;

            p {
                margin-left: 50px;
                font-size: 17px;
                color: #000000;

                span {
                    font-size: 20px;
                    font-weight: bold;
                    color: #862ff8;
                }
            }

        }
        .jieshao{
            margin-top: 100px;
            margin-left: 50px;
            font-size: 18px;
            font-family: '微软雅黑';
            font-weight: 700;
        }
        .renwu{
            width: 400px;
            height: 400px;
            margin-top: 100px;
            border: 1px solid rgb(192, 192, 192);
            background: #d7d5d55f;
            opacity: 0.8;
        }
        .box1{
           width: 300px;
           height: 150px;
           margin-top: 200px;
           span{
            color: #000000;
            font-size: 18px;
            font-weight: bold;
            font-family: '微软雅黑';
           }
           p{
            color: #fff;
            font-size: 16px;
           }
        }
    }

    .tools {
        display: flex;
        flex-direction: column;

        //align-content: center;
        .btn {
            width: 100%;
            height: 100%;
            margin: auto;
            line-height: 100%;
            text-align: center;
            margin-top: 6px;
        }

        .btn :hover {
            background-color: blueviolet;
            color: #fff;
        }

        .btn:active {
            background-color: blueviolet;
            color: #fff;
        }

        .active {
            color: blueviolet;
        }

    }
}</style>