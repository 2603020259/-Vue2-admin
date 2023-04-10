<template>
    <div class="commid">
        <!--表头-->
        <div class="fromOrder">
            <span style="color: #bbb; float: left;">搜素:</span>
            <el-input v-model="fromData.goodsName" size="small" placeholder="商品名称" class="input"></el-input>
            <el-input v-model="fromData.goodsNamber" size="small" placeholder="商品货号" class="input"></el-input>
            <!--上架状态-->
            <el-select v-model="fromData.goodsStatus" placeholder="请选择" size="small" class="option">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
                <!--审核状态-->
            </el-select>
            <el-select v-model="fromData.Staters" placeholder="请选择" size="small" class="option">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" style="margin-left: 30px;" size="small" icon="el-icon-search"
                @click="Search">搜索</el-button>
            <el-button type="primary" style="margin-right: 30px;" size="small" @click="addCommid">+新增</el-button>
        </div>
        <!--表格-->
        <el-table height="90%" :border="true" stripe ref="multipleTable" :data="tableData" tooltip-effect="dark"
            style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="编号" width="100" align="center">
                <template slot-scope="scope" align="center">{{ scope.row.goodsId }}</template>
            </el-table-column>
            <el-table-column prop="goodsImage" label="商品图片" width="160" align="center">
                <template slot-scope="scope">
                    <img :src="require(`../assets/goods${scope.row.goodsImag}.jpeg`)" style="height: 100px; width: 100px;">
                </template>
            </el-table-column>
            <el-table-column prop="goodsName" label="商品名称" align="center" width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="goodsPrice" label="价格" align="center" width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="goodsNambers" label="货号" align="center" width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="getOn" label="标签" align="center" width="160" show-overflow-tooltip>
                <template slot-scope="scope">
                    <p style="text-align: center;">上架:&nbsp;&nbsp;
                        <el-switch v-model="scope.row.getOn" :active-value1="0" :inactive-value1="0" active-color="#13ce66"
                            @change="handlePublishStatusChange1(value1)">
                        </el-switch>
                    </p>
                    <p style="text-align: center;">新品:&nbsp;&nbsp;
                        <el-switch v-model="scope.row.newProduct" active-color="#13ce66"
                            @change="handlePublishStatusChange2(value2)">
                        </el-switch>
                    </p>
                    <p style="text-align: center;">推荐:&nbsp;&nbsp;
                        <el-switch v-model="scope.row.recmmend" active-color="#13ce66"
                            @change="handlePublishStatusChange3(value3)">
                        </el-switch>
                    </p>
                </template>
            </el-table-column>
            <el-table-column prop="sorting" label="排序" align="center" width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="address" label="SKU库存" align="center" width="160" show-overflow-tooltip>
                <el-button type="primary" icon="el-icon-edit" circle @click="changeSKU"></el-button>
            </el-table-column>
            <el-table-column prop="sales" label="销量" align="center" width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="state" label="审核状态" align="center" width="160" show-overflow-tooltip>

            </el-table-column>
            <el-table-column label="操作" width="160" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div>
            <el-pagination layout="prev, pager, next" :total="total" :page-size="4" @current-change="changePar"
                style="float:right; margin-right: 30px;">
            </el-pagination>
        </div>
        <!--SKU库存-->
        <div class="from">
            <el-dialog title="编辑货品信息" :visible.sync="dialogVisible" width="60%">
                <div style="display: block; margin-bottom: 10px;">商品货号:
                    3952954142748268</div>
                <el-form>
                    <template>
                        <el-table :data="froms" border style="width: 100%">
                            <el-table-column prop="SUK" label="SKU编号" width="120" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.SUK"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="color" label="颜色" width="120" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.color"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="ages" label="年龄" width="120" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.ages"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="goodsPrice" label="商品价格" width="120" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.goodsPrice"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="invent" label="商品库存" width="120" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.invent"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="overInvent" label="库存预警值" width="120" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.overInvent"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editCommids">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!--膜态框-->
        <div class="froms">
            <el-dialog title="修改商品信息" :visible.sync="dialogVisibles" width="30%">
                <el-form ref="forms" :model="froms" label-width="80px" :rules="rules">
                    <el-form-item label="编号" prop="goodsId">
                        <el-input v-model="froms.goodsId"></el-input>
                    </el-form-item>
                    <el-form-item label="商品名称" prop="goodsName">
                        <el-input v-model="froms.goodsName"></el-input>
                    </el-form-item>
                    <el-form-item label="价格" prop="goodsPrice">
                        <el-input v-model="froms.goodsPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="货号" prop="goodsNambers">
                        <el-input v-model="froms.goodsNambers"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" prop="sorting">
                        <el-input v-model="froms.sorting"></el-input>
                    </el-form-item>
                    <el-form-item label="销量" prop="sales">
                        <el-input v-model="froms.sales"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibles = false">取 消</el-button>
                    <el-button type="primary" @click="edieCommid">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!--新增商品列表膜态框-->
        <div class="From">
            <el-dialog title="新增商品" :visible.sync="dialogVisibleS" width="40%">
                <el-form ref="From" :model="From" label-width="120px" :rules="rules">
                    <el-form-item label="商品编号:" prop="goodsId">
                        <el-input size="small" placeholder="请输入商品编号" v-model="From.goodsId" width="80"></el-input>
                    </el-form-item>
                    <el-form-item label="商品图片:" prop="goodsImag">
                        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件,且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="商品名称:" prop="goodsName">
                        <el-input size="small" placeholder="请输入商品名称" v-model="From.goodsName" width="80"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格:" prop="goodsPrice">
                        <el-input size="small" placeholder="请输入价格" v-model="From.goodsPrice" width="80"></el-input>
                    </el-form-item>
                    <el-form-item label="商品货号:" prop="goodsNambers">
                        <el-input size="small" placeholder="请输入货号" v-model="From.goodsNambers" width="80"></el-input>
                    </el-form-item>
                    <el-form-item label="商品标签:" prop="getOn" style="margin-left: 5px;">
                        <el-radio-group v-model="From.getOn">
                            <el-radio :label="true" style="margin-left: 5px;">上架</el-radio>
                        </el-radio-group>
                        <el-radio-group v-model="From.newProduct" style="margin-left: 5px;">
                            <el-radio :label="true" style="margin-left: 5px;">新品</el-radio>
                        </el-radio-group>
                        <el-radio-group v-model="From.recmmend" style="margin-left: 5px;">
                            <el-radio :label="true" style="margin-left: 5px;">推荐</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="商品排序:" prop="sorting">
                        <el-input size="small" placeholder="请输入商品排序" v-model="From.sorting" width="80"></el-input>
                    </el-form-item>
                    <el-form-item label="商品销量:" prop="sales">
                        <el-input size="small" placeholder="请输入商品销量" v-model="From.sales" width="80"></el-input>
                    </el-form-item>
                    <el-form-item label="审核状态:" prop="state">
                        <el-input size="small" placeholder="请输入商品审核状态" v-model="From.state" width="80"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibleS = false">取 消</el-button>
                    <el-button type="primary" @click="addData">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { Mock } from 'mockjs';
import { getCommidData, editCommid, delCommid, addCommids } from '../api/index'
export default {
    name: 'Mall',
    data() {
        return {
            total: 0,
            //urls: [2, 4, 5, 7, 8, 9, 4, 3],
            from: {
                goodsId: '',
            },
            rules: {
                goodsId: [
                    { required: true, message: '请输入编号' }
                ],
                goodsName: [
                    { required: true, message: '请输入价格' }
                ],
                goodsNambers: [
                    { required: true, message: '请输入货号' }
                ],
                goodsPrice: [
                    { required: true, message: '请输入货号' }
                ],
                sorting: [
                    { required: true, message: '请输入排序' }
                ],
                sales: [
                    { required: true, message: '请输入销量值' }
                ],
                state: [
                    { required: true, message: '请输入审核状态' }
                ],
                goodsImag:[
                { required: true, message: '请上传图片' } 
                ]
            },
            pageData: {
                limit: 8,
                page: 1
            },
            froms: {
                goodsId: '',
                goodsName: '',
                goodsPrice: '',
                goodsNambers: '',
                sorting: '',
                sales: '',
                state: '',
                SUK: '',
                color: '',
                ages: '',
                invent: '',
                overInvent: '',
                getOn: '',
                newProduct: '',
                recmmend: '',
            },
            From: {
                goodsId: '',
                goodsName: '',
                goodsPrice: '',
                goodsNambers: '',
                sorting: '',
                sales: '',
                state: '',
                SUK: '',
                color: '',
                ages: '',
                invent: '',
                overInvent: '',
                getOn: '',
                newProduct: '',
                recmmend: '',
                goodsImag:4,
            },
            dialogVisible: false,
            dialogVisibles: false,
            dialogVisibleS: false,
            fromData: {
                goodsName: '',
                goodsNamber: '',
                goodsStatus: '',
                Staters: '',
            },
            options1: [
                {
                    value: '已上架',
                    label: '已上架'
                },
                {
                    value: '未上架',
                    label: '未上架'
                },
            ],
            options2: [
                {
                    value: '审核通过',
                    label: '审核通过'
                },
                {
                    value: '未审核',
                    label: '未审核'
                },
            ],
            tableData: [

            ],
        }
    },
    methods: {
        handleEdit(index, row) {
            //console.log(index, row);
            this.dialogVisibles = true;
            this.centerDialogVisible = true;
            this.$nextTick(() => {
                this.froms = JSON.parse(JSON.stringify(row));
            })
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delCommid({ id: row.id }).then(() => {
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
        addData() {
            addCommids(this.From).then(() => {
                //console.log(111111);
                this.getList();
                this.$refs.From.resetFields();
                this.From.newProduct='';
                this.From.recmmend='';
                //this.$refs.From.resetFields();
                //console.log(555, this.$refs.Fromss)
                setTimeout(() => {
                        this.$message({
                            message: '数据新增成功',
                            type: 'success',
                            center: true,
                            offset: 70
                        });
                    }, 1000);
            })
            this.dialogVisibleS = false;
        },
        Search() {
            //商品名字搜素
            if (this.fromData.goodsName !== '') {
                this.tableData = this.tableData.filter((p) => {
                    return this.fromData.goodsName.trim() === p.goodsName;
                });
            }
            //商品单号搜索
            if (this.fromData.goodsNamber !== '') {
                this.tableData = this.tableData.filter((p) => {
                    //console.log(p.goodsNambers,this.fromData.goodsNamber);
                    return p.goodsNambers.toString() === this.fromData.goodsNamber;
                });
            }
            //审核状态搜素
            if (this.fromData.Staters !== '') {
                this.tableData = this.tableData.filter((p) => {
                    //console.log(p.goodsNambers,this.fromData.goodsNamber);
                    return p.state === this.fromData.Staters;
                });
            }
            //上架状态搜素
            if (this.fromData.goodsStatus !== '') {
                //const statass=this.fromData.goodsStatus ? '已上架' :'未上架';
                this.tableData = this.tableData.filter((p) => {
                    var statass = p.getOn ? '已上架' : '未上架';
                    return statass === this.fromData.goodsStatus;
                });
            }
            this.fromData.goodsName = '';
            this.fromData.goodsNamber = '';
            this.fromData.Staters = '';
            this.fromData.goodsStatus = '';
        },
        handlePublishStatusChange1(value) {
            console.log(11111, value);
            this.value1 = !value;
            console.log('嘎嘎嘎', this.value1);
        },
        handlePublishStatusChange2(value) {
            console.log(11111, value);
            this.value2 = !value;
        },
        handlePublishStatusChange3(value) {
            console.log(11111, value);
            this.value3 = !value;
        },
        edieCommid() {
            editCommid(this.froms).then(() => {
                this.getList();
                this.dialogVisibles = false;
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
        addCommid() {
            this.dialogVisibleS = true;
        },
        getList() {
            getCommidData({ params: { ...this.pageData } }).then(value => {
                console.log(value);
                this.tableData = value.data.list;
                this.total = value.data.count;
                //this.urls.push(value.data.list.goodsImage);
                //console.log('url', urls)
            },err=>{
                this.$router.replace({ name: '404' });
            });
        },
        changePar(val) {
            console.log(val);
            this.pageData.page = val;
            this.getList()
        },
        changeSKU() {
            //console.log(a,b);
            this.froms = JSON.parse(JSON.stringify(this.tableData));
            this.dialogVisible = true;
        },
        editCommids() {
            this.dialogVisible = false;
        }
    },
    watch: {
        immediate: true,
        tableData(value) {
            console.log('value', value);
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
    },
    beforeMount() {
        getCommidData({ params: { ...this.pageData } }).then(value => {
            this.$nextTick(() => {
                //console.log(value);
                this.tableData.push(...value.data.list);
                this.total = value.data.count;
                //this.urls.push(value.data.list.goodsImage);
                //console.log('url', urls)
                console.log(7777,this.tableData.goodsNamber)
            });
        });
    },
    mounted() {
        console.log(789,this.tableData);
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
.commid {
    height: 95%;

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

    .imgs {
        width: 140px;
        height: 120px;

        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>