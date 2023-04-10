<template>
    <div class="mange">
        <el-dialog title="新增" :visible.sync="centerDialogVisible" width="30%" center :before-close="handleClose"
            :close-on-click-modal="false">
            <!--表单用户信息-->
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="姓名:" prop="name">
                    <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄:" prop="age">
                    <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性别:" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期:" prop="birth">
                    <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-DD">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="地址:" prop="addr">
                    <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer" :center="false">
                <el-button size="mini" @click="cancel">取 消</el-button>
                <el-button size="mini" type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <!--新增和查询-->
        <div class="manage-header">
            <el-button @click="addList" type="primary" size="mini">
                +新增
            </el-button>
            <el-form :inline="true" class="userForm">
                <el-form-item>
                    <el-input placeholder="请输入你要搜素的名称" v-model="userForm.name" size="mini"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="onSubmit" type="primary" size="mini">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--表格-->
        <el-table height="90%" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;" stripe
            resetField="true">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="日期" width="120">
                <template slot-scope="scope">{{ scope.row.birth }}</template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column label="性别">
                <template slot-scope="scope">{{ scope.row.sex }}</template>
            </el-table-column>
            <el-table-column prop="age" label="年龄" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="addr" label="地址" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div>
            <el-pagination layout="prev, pager, next" :total="total" :page-size="8" @current-change="changePar"
                style="float:right; margin-right: 30px;">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from '@/api/index';
export default {
    name: 'User',
    data() {
        return {
            centerDialogVisible: false,
            form: {
                name: '',
                age: '',
                sex: '',
                birth: '',
                add: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名' }
                ],
                age: [
                    { required: true, message: '请输入年龄' }
                ],
                sex: [
                    { required: true, message: '请选择性别' }
                ],
                birth: [
                    { required: true, message: '请选择日期' }
                ],
                add: [
                    { required: true, message: '请输入地址' }
                ],
            },
            tableData: [],
            total: 0,
            modelType: 0,
            pageData: {
                limit: 9,
                page: 1
            },
            userForm: {
                name: ''
            },
        }
    },
    methods: {
        submit() {
            this.$refs.form.validate((valid) => {
                //console.log(this.tableData)
                console.log(valid)
                if (valid) {
                    if (this.modelType === 0) {
                        addUser(this.form).then(() => {
                            this.getList();
                            setTimeout(() => {
                                this.$message({
                                    message: '数据添加成功',
                                    type: 'success',
                                    center: true,
                                    offset: 70
                                });
                            }, 1000)
                        })
                        //console.log('form', this.form);
                        //this.centerDialogVisible=false;
                        //清空输入框内容
                        this.handleClose();
                    } else {
                        editUser(this.form).then(() => {
                            this.getList();
                            //alert('修改成功');
                            this.centerDialogVisible = false;
                            //alert('修改成功');
                            this.handleClose();
                            setTimeout(() => {
                                this.$message({
                                    message: '数据修改成功',
                                    type: 'success',
                                    center: true,
                                    offset: 70
                                });
                            }, 1000)
                        })
                    }
                }
            });
        },
        handleClose() {
            this.$refs.form.resetFields();
            this.centerDialogVisible = false;
        },
        cancel() {
            this.handleClose();
            setTimeout(() => {
                this.$message({
                    message: '已取消修改',
                    center: true,
                    offset: 70
                });
            }, 1000)
        },
        handleEdit(index, row) {
            console.log(index, row);
            this.modelType = 1
            this.centerDialogVisible = true;
            this.form = JSON.parse(JSON.stringify(row));
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delUser({ id: row.id }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                        center: true,
                        offset: 70
                    });
                    this.getList()
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
        addList() {
            this.centerDialogVisible = true;
            this.modelType = 0
        },
        getList() {
            getUser({ params: { ...this.pageData, ...this.userForm } }).then(value => {
                //console.log('value', value);
                this.tableData = value.data.list;
                this.total = value.data.count || 0;
                //this.getList();
            }, err => {
                console.log('err', err);
                this.$router.replace({ name: '404' });
            })
        },
        changePar(val) {
            this.pageData.page = val;
            this.getList()
        },
        onSubmit() {
            let Name = []
            this.tableData.forEach((p) => {
                // console.log(p.name);
                Name.push(p.name);
                console.log(Name);
            })
            if (Name.indexOf(this.userForm.name.trim()) === -1) {
                //console.log(Name.indexOf(this.userForm.name));
                //console.log(this.userForm.name);
                //this.getList();
                setTimeout(() => {
                    this.$message({
                        message: '暂无该人员信息',
                        type: 'error',
                        center: true,
                        offset: 70
                    });
                }, 1000);
                this.userForm.name = ''
                this.getList();
            } else {
                if (this.userForm.name.trim() !== '') {
                    this.getList();
                    this.userForm.name = ''
                    setTimeout(() => {
                        this.$message({
                            message: '搜素数据成功',
                            type: 'success',
                            center: true,
                            offset: 70
                        });
                    }, 1000);
                    //this.getList();
                } else {
                    setTimeout(() => {
                        this.$message({
                            message: '搜素不能为空',
                            type: 'error',
                            center: true,
                            offset: 70
                        });
                    }, 1000)
                }
            }
        }
    },
    mounted() {
        this.getList();
        if (window.innerHeight < 790 && innerWidth < 1440) {
            this.$message({
                message: '为了您更好的使用该系统,请全屏使用',
                type: 'warning',
                center: true,
            });
        }
        setTimeout(() => {
            this.$message({
                message: '数据加载完成',
                type: 'success',
                center: true,
                offset: 70
            });
        }, 1000)

    },
    watch: {
        modelType(value) {
            console.log(this.modelType);
            if (value === 0) {
                this.valid = false
            } else {
                this.valid = true;
            }
        },
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

<style lang="less">
.mange {
    height: 94%;

    .userForm {
        float: right;
    }

    .el-form-item__content {
        line-height: 0px;
    }
}
</style>