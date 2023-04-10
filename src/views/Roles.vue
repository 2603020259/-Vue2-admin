<template>
    <div class="pageone">
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
        <div class="from">
            <template>
                <el-table :data="tableData" height="90%" border style="width: 100%" :stripe="true">
                    <el-table-column prop="namber" label="编号" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="name" label="角色名称" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="describe" label="描述" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="userNamber" label="用户数" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="addTime" label="添加时间" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="是否启用" width="180" align="center">
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
                                @click="handleEdits(scope.$index, scope.row)">分派</el-button>
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
                <el-pagination layout="prev, pager, next" :total="total" :page-size="4" @current-change="changePar"
                    style="float:right; margin-right: 30px;">
                </el-pagination>
            </div>
        </div>
        <!--新增膜态框-->
        <div>
            <el-dialog title="新增" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                <el-form ref="froms" :model="froms" label-width="80px" :rules="rules">
                    <el-form-item label="编号" prop="namber">
                        <el-input v-model="froms.namber"></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称" prop="name">
                        <el-input v-model="froms.name"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" prop="describe">
                        <el-input type="textarea" v-model="froms.describe"></el-input>
                    </el-form-item>
                    <el-form-item label="用户数" prop="userNamber">
                        <el-input v-model="froms.userNamber"></el-input>
                    </el-form-item>
                    <el-form-item label="添加时间" prop="addTime">
                        <el-date-picker v-model="froms.addTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="是否启用" prop="isEnab">
                        <el-radio v-model="froms.isEnab" :label="true">是</el-radio>
                        <el-radio v-model="froms.isEnab" :label="false">否</el-radio>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addLest">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!--编辑膜态框-->
        <div>
            <el-dialog title="编辑" :visible.sync="dialogVisibles" width="30%" :before-close="handleCloses">
                <el-form ref="fromss" :model="fromss" label-width="80px" :rules="rules">
                    <el-form-item label="编号" prop="namber">
                        <el-input v-model="fromss.namber"></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称" prop="name">
                        <el-input v-model="fromss.name"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" prop="describe">
                        <el-input type="textarea" v-model="fromss.describe"></el-input>
                    </el-form-item>
                    <el-form-item label="用户数" prop="userNamber">
                        <el-input v-model="fromss.userNamber"></el-input>
                    </el-form-item>
                    <el-form-item label="添加时间" prop="addTime">
                        <el-date-picker v-model="fromss.addTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="是否启用" prop="isEnab">
                        <el-radio v-model="fromss.isEnab" :label="true">是</el-radio>
                        <el-radio v-model="fromss.isEnab" :label="false">否</el-radio>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibles = false">取 消</el-button>
                    <el-button type="primary" @click="Editors">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!--分派膜态框-->
        <div>
            <el-dialog title="职务分配" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose2">
                <el-form>
                    <el-form-item label="角色名称:">
                        <el-select v-model="allocate.name" placeholder="请选择职务">
                            <el-option label="超级管理员" value="超级管理员"></el-option>
                            <el-option label="订单管理员" value="订单管理员"></el-option>
                            <el-option label="用户管理员" value="用户管理员"></el-option>
                            <el-option label="商品管理员" value="商品管理员"></el-option>
                        </el-select>
                        <el-form-item label="职务描述:">
                            <el-input type="textarea" v-model="allocate.describe"></el-input>
                        </el-form-item>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible2 = false" size="mini">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible2 = false" size="mini">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { getRolesData, addRoles, delRoles, editRoles } from '../api/index';
export default {
    name: 'PageOne',
    data() {
        return {
            dialogVisible: false,
            dialogVisibles: false,
            dialogVisible2: false,
            drawer: false,
            rolesForm: {
                name: '',
            },
            pageData: {
                limit: 4,
                page: 1
            },

            allocate: {
                name: '',
                describe: '',
            },
            total: 0,
            froms: {
                namber: '',
                name: '',
                describe: '',
                userNamber: '',
                addTime: '',
                isEnab: '',
            },

            fromss: {
                namber: '',
                name: '',
                describe: '',
                userNamber: '',
                addTime: '',
                isEnab: '',
            },
            rules: {
                namber: [
                    { required: true, message: '请输入编号' }
                ],
                name: [
                    { required: true, message: '请输入角色名称' }
                ],
                describe: [
                    { required: true, message: '请输入描述内容' }
                ],
                userNamber: [
                    { required: true, message: '请输入用户数' }
                ],
                addTime: [
                    { required: true, message: '请输入添加时间' }
                ],
                isEnab: [
                    { required: true, message: '请选择是否开启' }
                ],
            },
            pageData: {
                limit: 4,
                page: 1
            },
            tableData: [{
                namber: '11',
                name: '超级管理员',
                describe: '拥有所有查看和操作的功能',
                userNamber: '30',
                addTime: '2023-3-18',
                isEnab: true
            }, {
                namber: '21',
                name: '用户管理员',
                describe: '只能操作和查看用户',
                userNamber: '35',
                addTime: '2023-3-18',
                isEnab: true
            }, {
                namber: '22',
                name: '订单管理员',
                describe: '只能操作和查看订单',
                userNamber: '23',
                addTime: '2023-3-18',
                isEnab: true
            }, {
                namber: '06',
                name: '商品管理员',
                describe: '只能操作和查看商品',
                userNamber: '50',
                addTime: '2023-3-18',
                isEnab: true
            }]
        }
    },
    methods: {
        addList() {
            this.dialogVisible = true;
        },
        handleClose1() {
            this.drawer = false;
        },
        Editors() {
            editRoles(this.fromss).then(() => {
                this.getList();
                setTimeout(() => {
                        this.$message({
                            message: '数据修改成功',
                            type: 'success',
                            center: true,
                            offset: 70
                        });
                    }, 1000);
            })
            this.dialogVisibles = false;
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
        handleEdits(index, row) {
            console.log(index, row);
            this.allocate = JSON.parse(JSON.stringify(row));
            //alert(11111);
            this.dialogVisible2 = true;
        },
        handleEdit(index, row) {
            console.log(index, row);
            this.fromss = JSON.parse(JSON.stringify(row));
            this.dialogVisibles = true;
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delRoles({ id: row.id }).then(() => {
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
        handleClose() {

        },
        changePar(val) {
            this.pageData.page = val;
            this.getList()
        },
        addLest() {
            this.dialogVisible = false;
            addRoles(this.froms).then(value => {
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
            this.$refs.froms.resetFields();
        },
        getList() {
            getRolesData({ params: { ...this.pageData, ...this.rolesForm } }).then(value => {
                console.log(value);
                if (value.data.count !== 0) {
                    this.tableData = (value.data.list);
                    this.label = value.data.count;
                } else {
                    this.label = 4;
                }
            }, err => {
                console.log(err);
                this.$router.replace({ name: '404' });
            })
        },
        handleClose() {
            this.dialogVisible = false;
        },
        handleCloses() {
            this.dialogVisibles = false;
        },
        handleClose2() {
            this.dialogVisible2 = false;
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
    },
}
</script>

<style lang="less" scoped>
.userForm {
    float: right;
}
</style>