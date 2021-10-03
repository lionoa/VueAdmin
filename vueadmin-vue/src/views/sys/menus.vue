<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-button
          type="primary"
          @click="dialogVisible = true"
        >新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop="name"
        label="名称"
        sortable
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="perms"
        label="权限编码"
        sortable
        width="140"
      >
      </el-table-column>
      <el-table-column
        width="180"
        prop="icon"
        label="图标"
      >
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="80"
      >
        <template slot-scope="scope">
          <el-tag
            size="small"
            v-if="scope.row.type === 0"
          >目录</el-tag>
          <el-tag
            size="small"
            v-else-if="scope.row.type === 1"
            type="success"
          >菜单</el-tag>
          <el-tag
            size="small"
            v-else-if="scope.row.type === 2"
            type="warning"
          >按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="path"
        label="菜单URL"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="component"
        label="菜单组件"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="orderNum"
        label="排序号"
        width="70"
      >
      </el-table-column>
      <el-table-column
        prop="statu"
        label="状态"
        width="70"
      >
        <template slot-scope="scope">
          <el-tag
            size="small"
            v-if="scope.row.statu === 1"
          >正常</el-tag>
          <el-tag
            size="small"
            v-else-if="scope.row.statu === 0"
            type="danger"
          >禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="handle"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="editHandler(scope.row.id)"
          >编辑</el-button>
          <template>
            <el-popconfirm
              @confirm="deleteHandler(scope.row.id)"
              title="这是一段内容确定删除吗？"
            >
              <el-button
                type="primary"
                style="margin-left: 10px;"
                size="mini"
                slot="reference"
              >删除</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
    >
      <el-form
        :model="editForm"
        :rules="rules"
        ref="editForm"
        label-width="100px"
        class="demo-editForm"
      >
        <el-form-item
          label="上级菜单"
          prop="parentId"
        >
          <el-select
            v-model="editForm.parentId"
            placeholder="请选择上级菜单"
          >
            <template v-for="item in tableData">
              <el-option
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
              <template v-for="child in item.children">
                <el-option
                  :key="child.id"
                  :label="child.name"
                  :value="child.id"
                >{{"- " + child.name}}</el-option>
              </template>
            </template>

          </el-select>
        </el-form-item>

        <el-form-item
          label="菜单名称"
          prop="name"
        >
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>

        <el-form-item
          label="权限编码"
          prop="perms"
        >
          <el-input v-model="editForm.perms"></el-input>
        </el-form-item>

        <el-form-item
          label="图标"
          prop="icon"
        >
          <el-input v-model="editForm.icon"></el-input>
        </el-form-item>
        <el-form-item
          label="菜单URL"
          prop="path"
        >
          <el-input v-model="editForm.path"></el-input>
        </el-form-item>
        <el-form-item
          label="菜单组件"
          prop="component"
        >
          <el-input v-model="editForm.component"></el-input>
        </el-form-item>
        <el-form-item
          label="类型"
          prop="type"
        >
          <el-radio-group v-model="editForm.type">
            <el-radio :label=0>目录</el-radio>
            <el-radio :label=1>菜单</el-radio>
            <el-radio :label=2>按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="状态"
          prop="statu"
        >
          <el-radio-group v-model="editForm.statu">
            <el-radio :label=1>正常</el-radio>
            <el-radio :label=0>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="排序号"
          prop="orderNum"
        >
          <el-input-number
            label="排序号"
            v-model="editForm.orderNum"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('editForm')"
          >立即创建</el-button>
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "menus",
  components: {},
  data() {
    return {
      rules: {
        parentId: [
          { required: true, message: "请选择上级菜单", trigger: "blur" },
        ],
        name: [{ required: true, message: "请选择菜单名称", trigger: "blur" }],
        perms: [{ required: true, message: "请选择权限编码", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        statu: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      editForm: {},
      dialogVisible: false,
      tableData: [],
    };
  },
  computed: {},
  methods: {
    getMenuTree() {
      this.$axios.get("/sys/menu/list").then((res) => {
        this.tableData = res.data.data;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 校验通过
          this.$axios
            .post(
              "/sys/menu/" + (this.editForm.id ? "update" : "save"),
              this.editForm
            )
            .then((res) => {
              this.$message({
                showClose: true,
                message: "操作成功",
                type: "success",
                onClose: () => {
                  this.getMenuTree();
                },
              });
              this.dialogVisible = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.resetForm("editForm");
          done();
        })
        .catch((_) => {});
    },
    editHandler(id) {
      this.$axios.get("/sys/menu/info/" + id).then((res) => {
        this.editForm = res.data.data;
        this.dialogVisible = true;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
      this.editForm = {};
    },
    deleteHandler(id) {
      // do delete
      this.$axios.post("/sys/menu/delete/" + id).then((res) => {
        this.$message({
          showClose: true,
          message: "操作成功",
          type: "success",
          onClose: () => {
            this.getMenuTree;
          },
        });
      });
    },
  },
  created() {
    this.getMenuTree();
  },
};
</script>

<style scoped>
</style>