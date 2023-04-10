<template>
    <div class="err">
        <div class="box">
            <div class="imgs">
                <span class="span">404</span>
                <img src="../assets/1.png">
                <img class="liaotian" src="../assets/liaotian.png" style="width: 200px; height: 200px;">
                <div class="wenzi">
                  这么多可爱萌宠,竟然没有喜欢滴?真是惊讶到本喵了。本喵现在命令你再回去好好看看!!!
                </div>
            </div>
            <div class="bottom">
                <span>EFFECTIVE ERROR PAGE</span>
                <p>For Some Reason Page You Requested Could Not Be Found On Our My Don't Server . . . . . .</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '404',
}
</script>

<style lang="less" scoped>
.err {
    /* 100%的窗口高度 */
    height: 100vh;
    /* 弹性布局 水平+垂直居中 */
    display: flex;
    //align-items: center;
    justify-content: center;
    background: linear-gradient(200deg, #f5edf8, #e3ecfa);

    .box {
        width: 700px;
        margin: 70px auto;
        position: relative;
    }

    .span {
        display: inline-block;
        font-size: 120px;
        font-weight: bold;
        font-family: '华文彩云';
        height: 150px;
        width: 100%;
        line-height: 150px;
        text-align: center;
        color: darkmagenta;
        opacity: 0.4;
        font-style: italic;
        letter-spacing: 20px;
    }

    .imgs {
        margin-top: 50px;
        width: 400px;
        height: 400px;
        margin: 0px auto;
    }

    .imgs img {
        width: 100%;
        height: 100%;
    }

    .liaotian {
        position: absolute;
        right: 30px;
        top: 100px;
    }

    .wenzi {
        width: 190px;
        height: 190px;
        position: absolute;
        right: 30px;
        top: 120px;
    }

    .bottom {
        width: 700px;
        height: 100px;
        margin: 150px auto;

        span {
            display: inline-block;
            border: 1px solid transparent;
            margin: 10px auto;
            color: rgb(176, 67, 230);
            font-family: '微软雅黑';
            font-style: italic;
            font-weight: bold;
            letter-spacing: 10px;
            font-size: 24px;
            margin-left: 80px;
        }

        p {
            color: rgb(204, 138, 237);
            font-family: '微软雅黑';
            font-style: italic;
            font-size: 14px;
            margin-left: 80px;
        }
    }

}</style>