<template>
    <div class="param">
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
        <div class="form" style="text-align: center;">
            <template>
                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                    @selection-change="handleSelectionChange" border header-align="center" height="500">
                    <el-table-column type="selection" width="80" align="center">
                    </el-table-column>
                    <el-table-column prop="number" label="编号" width="140" align="center">
                    </el-table-column>
                    <el-table-column prop="name" label="品牌名称" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="initiles" label="品牌代理首字母" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="sorting" label="排序" width="140" align="center">
                    </el-table-column>
                    <el-table-column prop="brand" label="品牌制造商" width="140" align="center">
                        <template slot-scope="scope">
                            <p style="text-align: center;">
                                <el-switch v-model="scope.row.brand" active-color="#13ce66">
                                </el-switch>
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="isEnab" label="是否显示" width="140" align="center">
                        <template slot-scope="scope">
                            <p style="text-align: center;">
                                <el-switch v-model="scope.row.isEnab" active-color="#13ce66">
                                </el-switch>
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="commodity" label="相关" width="260" align="center">
                        相关: <el-link type="primary" align="center" :underline="false" size="mini">
                            100
                        </el-link> &nbsp;&nbsp; 评价: <el-link type="primary" :underline="false"
                        size="mini" align="center">1000</el-link>
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
                <!--分页-->
                <div>
                    <el-pagination layout="prev, pager, next" :total="total" :page-size="9" @current-change="changePar"
                        style="float:right; margin-right: 30px;">
                    </el-pagination>
                </div>
            </template>
        </div>
         <!--新增膜态框-->
         <div>
            <el-dialog title="新增" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
                <el-form ref="from" :model="from" label-width="140px" :rules="rules">
                    <el-form-item label="编号:" prop="number">
                        <el-input v-model="from.number" placeholder="请输入编号"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌名称:" prop="name">
                        <el-input v-model="from.name" placeholder="请输入品牌名称"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌代理数字母:" prop="initiles">
                        <el-input v-model="from.initiles" placeholder="请输入品牌代理首字母(请输入大写字母)"></el-input>
                    </el-form-item>
                    <el-form-item label="排序:" prop="sorting">
                        <el-input v-model="from.sorting" placeholder="请输入排序数字"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌制造商:" prop="brand">
                        <el-select v-model="from.brand" placeholder="请选择状态">
                            <el-option label="开启" :value="true"></el-option>
                            <el-option label="关闭" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否显示:" prop="isEnab">
                        <el-select v-model="from.isEnab" placeholder="请选择状态">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品相关:" prop="evaluetion">
                        <el-input v-model="from.evaluetion" placeholder="请输入商品相关"></el-input>
                    </el-form-item>
                    <el-form-item label="商品评价:" prop="commodity">
                        <el-input v-model="from.commodity" placeholder="请输入商品评价"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="over" size="small">取 消</el-button>
                    <el-button type="primary" @click="addLest" size="small">确 定</el-button>
                </span>
            </el-dialog>
        </div>
         <!--编辑膜态框-->
         <div>
            <el-dialog title="编辑" :visible.sync="dialogVisibles" width="40%" :before-close="handleCloses">
                <el-form ref="froms" :model="froms" label-width="140px" :rules="rules">
                    <el-form-item label="编号:" prop="number">
                        <el-input v-model="froms.number" placeholder="请输入编号"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌名称:" prop="name">
                        <el-input v-model="froms.name" placeholder="请输入品牌名称"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌代理数字母:" prop="initiles">
                        <el-input v-model="froms.initiles" placeholder="请输入品牌代理首字母(请输入大写字母)"></el-input>
                    </el-form-item>
                    <el-form-item label="排序:" prop="sorting">
                        <el-input v-model="froms.sorting" placeholder="请输入排序数字"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌制造商:" prop="brand">
                        <el-select v-model="froms.brand" placeholder="请选择状态">
                            <el-option label="开启" :value="true"></el-option>
                            <el-option label="关闭" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否显示:" prop="isEnab">
                        <el-select v-model="froms.isEnab" placeholder="请选择状态">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品相关:" prop="evaluetion">
                        <el-input v-model="froms.evaluetion" placeholder="请输入商品相关"></el-input>
                    </el-form-item>
                    <el-form-item label="商品评价:" prop="commodity">
                        <el-input v-model="froms.commodity" placeholder="请输入商品评价"></el-input>
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
import { getParamData,addParam,editParam,delParam } from '../api/index'
export default {
    name: 'Param',
    data() {
        return {
            rolesForm: {
                name: '',
            },
            from:{
               number:'',
               name:'',
               initiles:'',
               sorting:'',
               brand:'',
               isEnab:'',
               evaluetion:'',
               commodity:'',
            },
            froms:{
               number:'',
               name:'',
               initiles:'',
               sorting:'',
               brand:'',
               isEnab:'',
               evaluetion:'',
               commodity:'',
            },
            rules: {
                number: [
                    { required: true, message: '请输入编号' }
                ],
                name: [
                    { required: true, message: '请输入品牌名称' }
                ],
                initiles: [
                    { required: true, message: '请输入商品代理首字母' }
                ],
                sorting: [
                    { required: true, message: '请输入排序数字' }
                ],
                brand: [
                    { required: true, message: '请选择导航状态' }
                ],
                evaluetion: [
                    { required: true, message: '请输入相关数值' }
                ],
                isEnab: [
                    { required: true, message: '请选择是否启用' }
                ],
                commodity: [
                    { required: true, message: '请输入评价数值' }
                ],
            },
            total:0,
            tableData: [],
            pageData: {
                limit: 9,
                page: 1
            },
            dialogVisible:false,
            dialogVisibles:false,
        }
    },
    methods: {
        addList() {
           this.dialogVisible=true;
        },
        handleClose(){
           this.dialogVisible=false;
           this.$refs.from.resetFields();
        },
        over(){
          this.handleClose();
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
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        changePar(val){
            this.pageData.page = val;
            this.getList()
        },
        getList(){
            getParamData({ params: { ...this.pageData } }).then(value => {
                console.log(value);
                this.tableData = value.data.list;
                this.total = value.data.count;
            },err=>{
                this.$router.replace({ name: '404' });
            });
        },
        addLest(){
            console.log(11111);
            addParam(this.from).then(value=>{
              this.getList();
              this.$refs.from.resetFields();
              this.dialogVisible=false;
              setTimeout(() => {
                    this.$message({
                        message: '数据添加成功',
                        type: 'success',
                        center: true,
                        offset: 70
                    });
                }, 1000)
            },err=>{
            })
        },
        addData(){
            editParam(this.froms).then(value=>{
                this.getList();
                //alert('修改成功');
                //this.centerDialogVisibles = false;
                //alert('修改成功');
                this.dialogVisibles=false;
                //this.handleCloses();
                setTimeout(() => {
                    this.$message({
                        message: '数据修改成功',
                        type: 'success',
                        center: true,
                        offset: 70
                    });
                }, 1000)
            },err=>{

            })
        },
        handleDelete(index,row){
            this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delParam({ id: row.id }).then(() => {
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
        handleCloses(){
            this.dialogVisibles=false;
        },
        handleEdit(index,row){
          this.froms=JSON.parse(JSON.stringify(row));
          this.dialogVisibles=true;
        }
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
.param {
    height: 95%;

    .userForm {
        float: right;
    }
}
</style>