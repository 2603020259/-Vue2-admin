<template>
    <div class="classr">
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
                <el-table :data="tableData" border style="width: 100%;" height="460">
                    <el-table-column prop="number" label="编号" width="100" align="center">
                    </el-table-column>
                    <el-table-column prop="name" label="分类名称" width="100" align="center">
                    </el-table-column>
                    <el-table-column prop="level" label="级别" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="quantity" label="商品数量" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="unit" label="数量单位" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="navig" label="导航栏" width="140" align="center">
                        <template slot-scope="scope">
                            <p style="text-align: center;">
                                <el-switch v-model="scope.row.navig" active-color="#13ce66">
                                </el-switch>
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="isDispaly" label="是否显示" width="140" align="center">
                         <template slot-scope="scope">
                            <p style="text-align: center;">
                                <el-switch v-model="scope.row.isDispaly" active-color="#13ce66">
                                </el-switch>
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="isEnab" label="是否启用" width="140" align="center">
                        <template slot-scope="scope">
                            <p style="text-align: center;">
                                <el-switch v-model="scope.row.isEnab" active-color="#13ce66">
                                </el-switch>
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sorting" label="排序" width="180" align="center">
                    </el-table-column>
                    <el-table-column label="设置" width="210" align="center">
                        <template slot-scope="scope" align="center">
                            <el-button align="center" size="mini"
                                @click="handleEdits(scope.$index, scope.row)">查看上级</el-button>
                            <el-button align="center" size="mini"
                                @click="handleEdit(scope.$index, scope.row)">转移商品</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="210" align="center">
                        <template slot-scope="scope" align="center">
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
                <el-pagination layout="prev, pager, next" :total="total" :page-size="9" @current-change="changePar"
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
                    <el-form-item label="分类名称:" prop="name">
                        <el-input v-model="from.name" placeholder="请输入分类名称"></el-input>
                    </el-form-item>
                    <el-form-item label="级别:" prop="level">
                        <el-select v-model="from.level" placeholder="请选择级别" :disabled="true">
                            <el-option label="一级" value="一级"></el-option>
                            <el-option label="二级" value="二级"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品数量:" prop="quantity">
                        <el-input v-model="from.quantity" placeholder="请输入商品数量"></el-input>
                    </el-form-item>
                    <el-form-item label="数量单位:" prop="unit">
                        <el-input v-model="from.unit" placeholder="请输入数量单位" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="排序:" prop="sorting">
                        <el-input v-model="from.sorting" placeholder="请输入排序数字"></el-input>
                    </el-form-item>
                    <el-form-item label="导航:" prop="navig">
                        <el-select v-model="from.navig" placeholder="请选择状态">
                            <el-option label="开启" :value="true"></el-option>
                            <el-option label="关闭" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否显示:" prop="isDispaly">
                        <el-select v-model="from.isDispaly" placeholder="请选择状态">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否启用:" prop="isEnab">
                        <el-radio v-model="from.isEnab" :label="true">是</el-radio>
                        <el-radio v-model="from.isEnab" :label="false">否</el-radio>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible=false">取 消</el-button>
                    <el-button type="primary" @click="addLest">确 定</el-button>
                </span>
            </el-dialog>
        </div>
         <!--编辑膜态框-->
         <div>
            <el-dialog title="编辑" :visible.sync="dialogVisibles" width="40%" :before-close="handleCloses">
                <el-form ref="froms" :model="froms" label-width="100px" :rules="rules">
                    <el-form-item label="编号:" prop="number">
                        <el-input v-model="froms.number" placeholder="请输入编号"></el-input>
                    </el-form-item>
                    <el-form-item label="分类名称:" prop="name">
                        <el-input v-model="froms.name" placeholder="请输入分类名称"></el-input>
                    </el-form-item>
                    <el-form-item label="级别:" prop="level">
                        <el-select v-model="froms.level" placeholder="请选择级别">
                            <el-option label="一级" value="一级"></el-option>
                            <el-option label="二级" value="二级"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品数量:" prop="quantity">
                        <el-input v-model="froms.quantity" placeholder="请输入商品数量"></el-input>
                    </el-form-item>
                    <el-form-item label="数量单位:" prop="unit">
                        <el-input v-model="froms.unit" placeholder="请输入数量单位" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="排序:" prop="sorting">
                        <el-input v-model="froms.sorting" placeholder="请输入排序数字"></el-input>
                    </el-form-item>
                    <el-form-item label="导航:" prop="navig">
                        <el-select v-model="froms.navig" placeholder="请选择状态">
                            <el-option label="开启" :value="true"></el-option>
                            <el-option label="关闭" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否显示:" prop="isDispaly">
                        <el-select v-model="froms.isDispaly" placeholder="请选择状态">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否启用:" prop="isEnab">
                        <el-radio v-model="froms.isEnab" :label="true">是</el-radio>
                        <el-radio v-model="froms.isEnab" :label="false">否</el-radio>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibles = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="addData" size="small">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
    
<script>
import { getClassrData,addClassr,editClassr,delClassr } from '../api/index';
export default {
    name: 'Classr',
    data() {
        return {
            rolesForm: {
                name: ''
            },
            total:0,
            pageData: {
                limit: 9,
                page: 1
            },
            dialogVisible:false,
            dialogVisibles:false,
            tableData: [],
            from:{
                number:'',
                name:'',
                level:'一级',
                unit:'只',
                quantity:'',
                sorting:'',
                navig:'',
                isDispaly:'',
                isEnab:'',
            },
            froms:{
                number:'',
                name:'',
                level:'',
                unit:'',
                quantity:'',
                sorting:'',
                navig:'',
                isDispaly:'',
                isEnab:'',
            },
            rules: {
                number: [
                    { required: true, message: '请输入编号' }
                ],
                name: [
                    { required: true, message: '分类名称' }
                ],
                quantity: [
                    { required: true, message: '请输入商品数量' }
                ],
                sorting: [
                    { required: true, message: '请输入排序数字' }
                ],
                navig: [
                    { required: true, message: '请选择导航状态' }
                ],
                isDispaly: [
                    { required: true, message: '请选择是否显示' }
                ],
                isEnab: [
                    { required: true, message: '请选择是否启用' }
                ],
            },
        }
    },
    methods: {
        onSubmit() {
            if (this.rolesForm.name !== '') {
                this.tableData = this.tableData.filter((p) => {
                    //console.log(p);
                    return p.name === this.rolesForm.name.toString();
                });
            }
            this.rolesForm.name = '';
        },
        handleEdit(index,row){
         this.froms=JSON.parse(JSON.stringify(row));
         this.dialogVisibles=true;
        },
        addList() {
          this.dialogVisible=true;
        },
        getList() {
            getClassrData({ params: { ...this.pageData } }).then(value => {
                console.log(value);
                this.tableData = value.data.list;
                this.total = value.data.count;
                setTimeout(() => {
                        this.$message({
                            message: '数据加载成功',
                            type: 'success',
                            center: true,
                            offset: 70
                        });
                    }, 1000);
            },err=>{
                this.$router.replace({ name: '404' });
            });
        },
        changePar(val){
            this.pageData.page = val;
            this.getList()
        },
        handleClose(){
            this.$refs.from.resetFields();
            this.dialogVisible=false;
        },
        handleCloses(){
            this.dialogVisibles=false;
        },
        addLest(){
            addClassr(this.from).then(value=>{
              this.getList();
              this.$refs.from.resetFields();
              this.dialogVisible=false;
              setTimeout(() => {
                        this.$message({
                            message: '数据新增成功',
                            type: 'success',
                            center: true,
                            offset: 70
                        });
                    }, 1000);
            },err=>{

            })
        },
        addData(){
            editClassr(this.froms).then(() => {
                this.getList();
                //alert('修改成功');
                //this.centerDialogVisibles = false;
                //alert('修改成功');
                this.handleCloses();
                setTimeout(() => {
                    this.$message({
                        message: '数据修改成功',
                        type: 'success',
                        center: true,
                        offset: 70
                    });
                }, 1000)
            })
        },
        handleDelete(index,row){
            this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delClassr({ id: row.id }).then(() => {
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
    mounted(){
      this.getList();
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
.classr {
    height: 95%;
    .userForm {
        float: right;
    }
}
</style>