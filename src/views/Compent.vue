<template>
    <div class="compent">
        <!--表头-->
        <div class="manage-header">
            <el-button @click="addList" type="primary" size="mini">
                +新增
            </el-button>
            <el-form :inline="true" class="userForm">
                <el-form-item>
                    <el-input placeholder="请输入你要搜素的角色名称" v-model="rolesForm.name" size="mini"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="onSubmit" type="primary" size="mini">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--表格-->
        <div class="form">
            <template>
                <el-table :data="tableData" border style="width: 100%" height="90%">
                    <el-table-column prop="number" label="编号" width="100" align="center">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="100" align="center">
                    </el-table-column>
                    <el-table-column prop="username" label="账号" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="email" label="邮箱" width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="addTime" label="添加时间" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="iphoneNamber" label="手机号" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="sex" label="性别" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="是否启用" width="100" align="center">
                        <template slot-scope="scope">
                            <p style="text-align: center;">&nbsp;&nbsp;
                                <el-switch v-model="scope.row.isEnab" active-color="#13ce66">
                                </el-switch>
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="210" align="center">
                        <template slot-scope="scope" align="center">
                            <el-button align="center" size="mini"
                                @click="handleEdits(scope.$index, scope.row)">职务</el-button>
                            <el-button align="center" size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button align="center" size="mini" type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <!--分页-->
            <div>
                <el-pagination layout="prev, pager, next" :total="total" :page-size="8" @current-change="changePar"
                    style="float:right; margin-right: 30px;">
                </el-pagination>
            </div>
        </div>
        <!--新增膜态框-->
        <div>
            <el-dialog title="新增" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
                <el-form ref="from" :model="from" label-width="100px" :rules="rules">
                    <el-form-item label="编号:" prop="number">
                        <el-input v-model="from.number" placeholder="请输入编号"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名:" prop="name">
                        <el-input v-model="from.name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="账号:" prop="username">
                        <el-input v-model="from.username" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码:" prop="password">
                        <el-input v-model="from.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="职务:" prop="names">
                        <el-select v-model="from.names" placeholder="请选择职务">
                            <el-option label="超级管理员" value="超级管理员"></el-option>
                            <el-option label="订单管理员" value="订单管理员"></el-option>
                            <el-option label="用户管理员" value="用户管理员"></el-option>
                            <el-option label="商品管理员" value="商品管理员"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="手机号:" prop="iphoneNamber">
                        <el-input v-model="from.iphoneNamber" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="性别:" prop="sex">
                        <el-select v-model="from.sex" placeholder="请选择性别">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="邮箱:" prop="email">
                        <el-input v-model="from.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="添加时间:" prop="addTime">
                        <el-date-picker v-model="from.addTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="是否启用:" prop="isEnab">
                        <el-radio v-model="from.isEnab" :label="true">是</el-radio>
                        <el-radio v-model="from.isEnab" :label="false">否</el-radio>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="over">取 消</el-button>
                    <el-button type="primary" @click="addLest">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!--编辑膜态框-->
        <div>
            <el-dialog title="编辑" :visible.sync="dialogVisibles" width="30%" :before-close="handleCloses">
                <el-form ref="form" :model="froms" label-width="80px">
                    <el-form-item label="账号:">
                        <el-input v-model="froms.username" size="small" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名:">
                        <el-input v-model="froms.name" size="small" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱:">
                        <el-input v-model="froms.email" size="small" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码:">
                        <el-input type="password" v-model="froms.password" size="small" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="是否启用:" prop="isEnab">
                        <el-radio v-model="froms.isEnab" :label="true">是</el-radio>
                        <el-radio v-model="froms.isEnab" :label="false">否</el-radio>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="overs = false" 
                    size="small">取 消</el-button>
                    <el-button type="primary" @click="addData" size="small">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!--职务膜态框-->
        <div>
            <el-dialog title="职务" :visible.sync="dialogVisibless" width="30%" :before-close="handleClosess">
                <el-form ref="formss" :model="froms" label-width="80px">
                    <el-form-item label="职务:" prop="names">
                        <el-select v-model="fromss.names" placeholder="请选择职务">
                            <el-option label="超级管理员" value="超级管理员"></el-option>
                            <el-option label="订单管理员" value="订单管理员"></el-option>
                            <el-option label="用户管理员" value="用户管理员"></el-option>
                            <el-option label="商品管理员" value="商品管理员"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibless = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="dialogVisibless=false" size="small">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        </div>
</template>
    
<script>
import { getCompentData, addCompent, editCompent,delCompent } from '../api/index';
export default {
    name: 'PageTwo',
    data() {
        return {
            rolesForm: {
                name: ''
            },
            total: 0,
            from: {
                number: '',
                name: '',
                username: '',
                password: '',
                email: '',
                addTime: '',
                isEnab: '',
                names: '',
                iphoneNamber: '',
                sex: ''
            },
            froms: {
                number: '',
                name: '',
                username: '',
                password: '',
                email: '',
                addTime: '',
                isEnab: '',
                names: '',
                iphoneNamber: '',
                sex: ''
            },
            fromss:{
              names:''
            },
            rules: {
                number: [
                    { required: true, message: '请输入编号' }
                ],
                name: [
                    { required: true, message: '请输入姓名' }
                ],
                username: [
                    { required: true, message: '请输入账号' }
                ],
                password: [
                    { required: true, message: '请输入密码' }
                ],
                addTime: [
                    { required: true, message: '请输入添加时间' }
                ],
                isEnab: [
                    { required: true, message: '请选择是否开启' }
                ],
                iphoneNamber: [
                    { required: true, message: '请输入手机号' }
                ],
                email: [
                    { required: true, message: '请输入邮箱号' }
                ],
                names: [
                    { required: true, message: '请输入职务' }
                ],
                sex: [
                    { required: true, message: '请选择性别' }
                ],
            },
            pageData: {
                limit: 8,
                page: 1
            },
            dialogVisible: false,
            dialogVisibles: false,
            dialogVisibless:false,
            tableData: [{
                number: '14',
                name: '测试账号',
                username: 'test',
                password: '123456',
                email: 'test@qq.com',
                addTime: '2023-3-20',
                isEnab: true,
                names: '超级管理员',
                iphoneNamber: '13230177130',
                sex: '男'
            }, {
                number: '07',
                name: '用户管理员',
                username: 'userAdmin',
                password: '123456',
                email: 'userAdmin@qq.com',
                addTime: '2023-3-20',
                isEnab: true,
                names: '用户管理员',
                iphoneNamber: '13222277130',
                sex: '男'
            },{
                number: '29',
                name: '商品管理员',
                username: 'commpentAdmin',
                password: '123456',
                email: 'commpentAdmin@qq.com',
                addTime: '2023-3-20',
                isEnab: true,
                names: '商品管理员',
                iphoneNamber: '13230158330',
                sex: '女'
            },{
                number: '25',
                name: '订单管理员',
                username: 'orderAdmin',
                password: '123456',
                email: 'orderAdmin@qq.com',
                addTime: '2023-3-20',
                isEnab: true,
                names: '订单管理员',
                iphoneNamber: '13230172730',
                sex: '男'
            }, {
                number: '66',
                name: '权限管理员',
                username: 'rolesAdmin',
                password: '123456',
                email: 'rolesAdmin@qq.com',
                addTime: '2023-3-20',
                isEnab: true,
                names: '权限管理员',
                iphoneNamber: '15850177130',
                sex: '男'
            }, {
                number: '46',
                name: 'admin',
                username: 'admin',
                password: '123456',
                email: 'admin@qq.com',
                addTime: '2023-3-20',
                isEnab: true,
                names: '超级管理员',
                iphoneNamber: '15850635130',
                sex: '女'
            }, {
                number: '88',
                name: 'jiangxinle',
                username: 'jiangxinle',
                password: '123456',
                email: '2603020259@qq.com',
                addTime: '2023-3-20',
                isEnab: true,
                names: '超级管理员',
                iphoneNamber: '15850635130',
                sex: '男'
            }]
        }
    },
    methods: {
        addList() {
            this.dialogVisible = true
        },
        onSubmit() {
            if (this.rolesForm.name !== '') {
                this.tableData = this.tableData.filter((p) => {
                    //console.log(p);
                    return p.name === this.rolesForm.name.toString();
                });
            }
            this.rolesForm.name = '';
        },
        handleClosess(){},
        handleDelete(index,row){
            this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delCompent({ id: row.id }).then(() => {
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
        over() {
            this.handleClose();
        },
        handleClose() {
            this.dialogVisible = false;
            this.$refs.from.resetFields();
        },
        handleCloses() {
            this.dialogVisibles = false;
            this.$refs.froms.resetFields();
        },
        handleEdits(index, row) {
            //console.log(index, row);
            this.fromss = JSON.parse(JSON.stringify(row));
            this.dialogVisibless = true;
        },
        handleEdit(index, row) {
            //console.log(index, row);
            this.froms = JSON.parse(JSON.stringify(row));
            this.dialogVisibles = true;
        },
        changePar(val) {
            this.pageData.page = val;
            this.getList()
        },
        addLest() {
            this.dialogVisible = false;
            addCompent(this.from).then(value => {
                setTimeout(() => {
                    this.$message({
                        message: '添加数据成功',
                        type: 'success',
                        center: true,
                        offset: 70
                    });
                }, 1000)
                this.getList();
            }, err => {
                console.log(err);
            });
            this.$refs.from.resetFields();
        },
        getList() {
            getCompentData({ params: { ...this.pageData, ...this.rolesForm } }).then(value => {
                console.log(value);
                if (value.data.count !== 0) {
                    this.tableData = (value.data.list);
                    this.total = value.data.count;
                } else {
                    this.total = 6;
                }
            }, err => {
                console.log(err);
                this.$router.replace({ name: '404' });
            })
        },
        overs() {
            this.handleCloses();
        },
        addData() {
            editCompent(this.froms).then(() => {
                setTimeout(() => {
                    this.$message({
                        message: '数据修改成功',
                        type: 'success',
                        center: true,
                        offset: 70
                    });
                }, 1000)
                this.getList();
                //alert('修改成功');
                //this.centerDialogVisibles = false;
                //alert('修改成功');
                this.handleCloses();
               
            })
        }
    },
    mounted() {
        this.getList();
        console.log('8888',this.tableData);
        if (window.innerHeight < 790 && innerWidth < 1440) {
            this.$message({
                message: '为了您更好的使用该系统,请全屏使用',
                type: 'warning',
                center: true,
            });
        }
    }
}
</script>
    
<style lang="less" scoped>
.compent {
    height: 90%;

    .userForm {
        float: right;
    }
}
</style>