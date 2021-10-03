<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input
          v-model="searchForm.name"
          placeholder='名称'
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="getRoleList">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="dialogVisible = true"
        >新增</el-button>
      </el-form-item>

      <el-form-item>
        <el-popconfirm
          @confirm="deleteHandler(null)"
          title="是否批量删除？"
        >
          <el-button
            type="danger"
            style="margin-left: 10px;"
            slot="reference"
            :disabled=disabled
          >批量删除</el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>

    <el-table
      border
      stripe
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>

      <el-table-column
        prop="name"
        label="名称"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="code"
        label="唯一编码"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="remark"
        show-overflow-tooltip
        label="描述"
      >
      </el-table-column>
      <el-table-column
        prop="statu"
        label="状态"
        width="80"
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
        width="235"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="permsHandler(scope.row.id)"
          >分配权限</el-button>
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
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="current"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="size"
      :total="total"
    >
    </el-pagination>

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
          label="角色名称"
          prop="name"
        >
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>

        <el-form-item
          label="唯一编码"
          prop="code"
        >
          <el-input v-model="editForm.code"></el-input>
        </el-form-item>

        <el-form-item
          label="描述"
          prop="remark"
        >
          <el-input v-model="editForm.remark"></el-input>
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
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('editForm')"
          >立即创建</el-button>
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="分配权限"
      :visible.sync="permsVisible"
      width="500px"
    >
      <el-form :model="permsForm">
        <el-tree
          ref="permsTree"
          :data="permsData"
          default-expand-all
          show-checkbox
          :check-strictly=true
          node-key="id"
          :props="defaultProps"
        >
        </el-tree>

      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="permsVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitPermsFormHandler('permsForm')"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "role",
  components: {},
  data() {
    return {
      permsVisible: false,
      dialogVisible: false,
      current: 1,
      size: 10,
      total: 0,
      disabled: true,
      searchForm: {},
      editForm: {},
      permsForm: {},
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入唯一编码", trigger: "blur" }],
        statu: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      tableData: [],
      multipleSelection: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      permsData: [],
    };
  },
  computed: {},
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // 如果勾选的选项大于1则将批量删除的状态变为可点击
      if (val.length >= 1) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val;
      this.getRoleList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    permsHandler(id) {
      this.$axios.get("/sys/role/info/" + id).then((res) => {
        this.$refs.permsTree.setCheckedKeys(res.data.data.menuIds);
        this.permsForm = res.data.data;
      });
      this.permsVisible = true;
    },
    handleClose() {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.resetForm("editForm");
          done();
        })
        .catch((_) => {});
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
      this.editForm = {};
    },
    getRoleList() {
      this.$axios
        .get("/sys/role/list", {
          params: {
            name: this.searchForm.name,
            current: this.current,
            size: this.size,
          },
        })
        .then((res) => {
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
          this.current = res.data.data.current;
          this.size = res.data.data.size;
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 校验通过
          this.$axios
            .post(
              "/sys/role/" + (this.editForm.id ? "update" : "save"),
              this.editForm
            )
            .then((res) => {
              this.$message({
                showClose: true,
                message: "操作成功",
                type: "success",
                onClose: () => {
                  this.getRoleList;
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
    editHandler(id) {
      this.$axios.get("/sys/role/info/" + id).then((res) => {
        this.editForm = res.data.data;
        this.dialogVisible = true;
      });
    },
    deleteHandler(id) {
      // 批量删除
      let ids = [];
      if (id) {
        ids.push(id);
      } else {
        this.multipleSelection.forEach((row) => {
          ids.push(row.id);
        });
      }
      this.$axios.post("/sys/role/delete", ids).then((res) => {
        this.$message({
          showClose: true,
          message: "操作成功",
          type: "success",
          onClose: () => {
            this.getRoleList;
          },
        });
      });
    },
    submitPermsFormHandler() {
      let menuIds = this.$refs.permsTree.getCheckedKeys();
      this.$axios
        .post("/sys/role/perm/" + this.permsForm.id, menuIds)
        .then((res) => {
          this.$message.success("操作成功");
          this.getRoleList();
        });
      this.permsVisible = false;
    },
  },
  created() {
    this.getRoleList();
    this.$axios.get("/sys/menu/list").then((res) => {
      this.permsData = res.data.data;
    });
  },
};
</script>

<style scoped>
.el-pagination {
  margin-top: 20px;
  float: right;
}
</style>