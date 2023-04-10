<template>
    <div class="order">
        <div class="fromOrder">
            <span style="color: #bbb; float: left;">搜素:</span>
            <el-input v-model="orderForm.inputPort" size="small" placeholder="请输入终端编号" class="input"></el-input>
            <el-input v-model="orderForm.inputUnit" size="small" placeholder="请输入订单号" class="input"></el-input>
            <el-input v-model="orderForm.inputTrad" size="small" placeholder="请输入交易订单" class="input"></el-input>
            <!--支付状态-->
            <el-select v-model="orderForm.payValue" placeholder="请选择" size="small" class="option">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
                <!--货物状态-->
            </el-select>
            <el-select v-model="orderForm.goodsValue" placeholder="请选择" size="small" class="option">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" style="margin-left: 30px;" size="small" icon="el-icon-search" @click="Search">搜索</el-button>
        </div>
        <!--表格-->
        <el-table height="90%" :data="tableData" stripe :border="true" style="width: 100%; font-size: 10px;"
            :default-sort="{ prop: 'date', order: 'descending' }">
            <el-table-column type="index" width="50" align="center">
            </el-table-column>
            <el-table-column prop="terminal" label="终端编号" sortable width="180" align="center">
            </el-table-column>
            <el-table-column prop="order" label="订单号" sortable width="180" align="center">
            </el-table-column>
            <el-table-column prop="trading" label="交易单号" sortable width="180" align="center">
            </el-table-column>
            <el-table-column prop="pay" label="支付方式" sortable width="180" align="center">
            </el-table-column>
            <el-table-column prop="types" label="交易类型" sortable width="180" align="center">
            </el-table-column>
            <el-table-column prop="payName" label="商品价格" sortable width="180" align="center">
            </el-table-column>
            <el-table-column prop="payName" label="支付金额" sortable width="180" align="center">
            </el-table-column>
            <el-table-column prop="commodityName" label="商品名称" sortable width="180" align="center">
            </el-table-column>
            <el-table-column prop="orderStatus" label="订单状态" sortable width="180" align="center">
            </el-table-column>
            <el-table-column prop="times" label="创建时间" sortable width="180" align="center">
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">预览</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">退款</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div>
            <el-pagination layout="prev, pager, next" :total="total" :page-size="8" @current-change="changePar"
                style="float:right; margin-right: 30px;">
            </el-pagination>
        </div>
        <!--膜态框-->
        <div class="from1">
            <el-dialog title="预览" :visible.sync="dialogVisible" width="50%" height="800" :before-close="handleClose">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="终端编号" class="inputs">
                        <el-input v-model="form.terminal" :disabled="true" style="width: 260px;"></el-input>
                    </el-form-item>
                    <el-form-item label="订单号" class="inputs">
                        <el-input v-model="form.order" :disabled="true" style="width: 260px;"></el-input>
                    </el-form-item>
                    <el-form-item label="交易单号" class="inputs">
                        <el-input v-model="form.trading" :disabled="true" style="width: 260px;"></el-input>
                    </el-form-item>
                    <el-form-item label="支付方式" class="inputs">
                        <el-input v-model="form.pay" :disabled="true" style="width: 260px;"></el-input>
                    </el-form-item>
                    <el-form-item label="交易类型" class="inputs">
                        <el-input v-model="form.types" :disabled="true" style="width: 260px;"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" class="inputs">
                        <el-input v-model="form.payName" :disabled="true" style="width: 260px;"></el-input>
                    </el-form-item>
                    <el-form-item label="支付金额" class="inputs">
                        <el-input v-model="form.payName" :disabled="true" style="width: 260px;"></el-input>
                    </el-form-item>
                    <el-form-item label="商品名称" class="inputs">
                        <el-input v-model="form.commodityName" :disabled="true" style="width: 260px;"></el-input>
                    </el-form-item>
                    <el-form-item label="订单状态" class="inputs">
                        <el-input v-model="form.orderStatus" :disabled="true" style="width: 260px;"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间" class="inputs">
                        <el-input v-model="form.times" :disabled="true" style="width: 260px;"></el-input>
                    </el-form-item>
                </el-form>
            </el-dialog>

        </div>
    </div>
</template>
    
<script>
import { getOrderData, delOrder } from '../api/index';
export default {
    name: 'Order',
    data() {
        return {
            orderForm: {
                //端口数据
                inputPort: '',
                //订单数据
                inputUnit: '',
                //交易数据
                inputTrad: '',
                //支付状态
                //支付
                payValue: '',
                //货物
                goodsValue: '',
                //表格数据
            },
            options1: [{
                value: '请选择',
                label: '请选择'
            }, {
                value: '现金',
                label: '现金'
            }, {
                value: '支付宝',
                label: '支付宝'
            }, {
                value: '微信',
                label: '微信'
            }, {
                value: 'POS通',
                label: 'POS通'
            }, {
                value: '闪付',
                label: '闪付'
            }, {
                value: 'POS通C扫B',
                label: 'POS通C扫B'
            }, {
                value: '银联二维码',
                label: '银联二维码'
            }, {
                value: '会员余额支付',
                label: '会员余额支付'
            }],
            //货物状态
            options2: [{
                value: '请选择',
                label: '请选择'
            }, {
                value: '初始化',
                label: '初始化'
            }, {
                value: '已支付',
                label: '已支付'
            }, {
                value: '出货成功',
                label: '出货成功'
            }, {
                value: '出货失败',
                label: '出货失败'
            }, {
                value: '订单超时',
                label: '订单超时'
            }, {
                value: '退款初始化',
                label: '退款初始化'
            }, {
                value: '退款进行中',
                label: '退款进行中'
            }, {
                value: '退款成功',
                label: '退款成功'
            }, {
                value: '退款失败',
                label: '退款失败'
            }, {
                value: '订单处理中',
                label: '订单处理中'
            }],
            tableData: [],
            dialogVisible: false,
            form: {
                terminal: '', //终端号
                order: '', //订单号
                trading: '', //交易单号
                pay: '', //支付方式
                types: '', //交易类型
                commodity: '', //商品价格
                payName: '',  //支付金额
                commodityName: '', //商品名称
                orderStatus: '',  //订单状态
                times: '', //创建时间
            },
            total: 0,
            pageData: {
                limit: 9,
                page: 1
            },
            focu: false,
        }
    },
    methods: {
        formatter(row, column) {
            return row.address;
        },
        handleEdit(index, row) {
            console.log(index, row);
            this.dialogVisible = true;
            this.form = JSON.parse(JSON.stringify(row));
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleClose(done) {
            done();
        },
        Search() {
            if (this.orderForm.inputPort !== '') {
                //端口号搜素
                this.tableData = this.tableData.filter((p) => {
                    return p.terminal.toString() === this.orderForm.inputPort;
                });
            }
            if (this.orderForm.inputUnit !== '') {
                //订单号搜素
                this.tableData = this.tableData.filter((p) => {
                    console.log(p.order,this.orderForm.inputUnit)
                    return p.order.toString() === this.orderForm.inputUnit;
                });
            }
            if (this.orderForm.inputTrad !== '') {
                //交易订单号搜素搜素
                this.tableData = this.tableData.filter((p) => {
                    return p.trading.toString() === this.orderForm.inputTrad;
                });
            }
            if (this.orderForm.payValue !== '') {
                //支付方式搜素
                this.tableData = this.tableData.filter((p) => {
                    return p.pay.toString() === this.orderForm.payValue;
                });
            }
            if (this.orderForm.goodsValue !== '') {
                //订单状态搜素
                this.tableData = this.tableData.filter((p) => {
                    return p.orderStatus.toString() === this.orderForm.goodsValue;
                });
            }
            this.orderForm.inputPort = '';
            this.orderForm.inputUnit = '';
            this.orderForm.inputTrad = '';
            this.orderForm.payValue = '';
            this.orderForm.goodsValue = '';
        },
        getList() {
            getOrderData({ params: { ...this.pageData } }).then(value => {
                console.log(value);
                this.tableData = value.data.list;
                this.total = value.data.count;
            },err=>{
                this.$router.replace({ name: '404' });
            });
        },
        changePar(val) {
            console.log(val);
            this.pageData.page = val;
            this.getList()
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delOrder({ id: row.id }).then(() => {
                    console.log(row.id);
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                        center: true,
                        offset: 70
                    });
                    this.getList();
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                    center: true,
                    offset: 70
                });
            });
        },

    },
    mounted() {
        this.getList();
        console.log(9999,this.tableData);
        setTimeout(() => {
            this.$message({
                message: '数据加载完成',
                type: 'success',
                center: true,
                offset: 70
            });
        }, 1000)
        console.log(7777,this.tableData);
        if (window.innerHeight < 790 && innerWidth < 1440) {
            this.$message({
                message: '为了您更好的使用该系统,请全屏使用',
                type: 'warning',
                center: true,
            });
        }
    },
    watch: {
        tableData(value) {
            if (value.length === 0) {
                this.$message({
                    message: '暂无搜素内容,2秒后将返回数据',
                    type: 'warning',
                    center: true,
                    offset: 70
                });
            }
            if (value.length === 0) {
                setTimeout(() => {
                    this.getList()
                }, 2000);
            }
        }
    }
}
</script>
    
<style  lang="less" scoped>
.order {
    height: 83%;

    .fromOrder {

        span {
            display: inline-block;
            margin-top: 5px;
        }

        .input {
            width: 180px;
            float: left;
            margin-left: 20px;
            margin-bottom: 20px;
        }

        .option {
            margin-left: 20px;
            margin-bottom: 20px;
        }

        .btn {
            margin-left: 40px;
            margin-bottom: 20px;
        }
    }

    .from1 {
        :deep(.el-dialog__body) {
            height: 700px;
        }

        .inputs {
            display: flex;
            justify-content: center;
        }
    }
}
</style>