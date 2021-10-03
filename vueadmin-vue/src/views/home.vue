<template>
  <el-container>
    <el-aside width="210px">
      <el-menu
        :default-active="this.$store.state.menus.editableTabsValue"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item
          index="/index"
          @click="addTab({name: '/index', title: '首页', index: '/index'})"
        >
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu
          v-for="menu in menuList"
          :key="menu.perms"
          :index="menu.id + ''"
        >
          <template slot="title">
            <i :class="menu.icon"></i>
            <span>{{menu.title}}</span>
          </template>
          <el-menu-item
            v-for="item in menu.children"
            :key="item.index"
            :index="item.index + ''"
            @click="addTab(item)"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <strong>VUE后台管理系统</strong>
        <div class="header-avatar">
          <el-avatar
            :size="40"
            :src="userInfo.avatar"
          ></el-avatar>
          <el-dropdown
            split-button
            size="small"
            type="primary"
            @click="handleClick"
            trigger="click"
            placement="top"
          >
            {{userInfo.username}}
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="userCenter">个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <tabs></tabs>
        <div style="margin: 0 20px;">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import tabs from "@/components/tabs.vue";
export default {
  name: "home",
  data() {
    return {
      userInfo: {
        id: "",
        username: "",
        avatar: "",
      },
    };
  },
  computed: {
    menuList() {
      return this.$store.state.menus.menuList;
    },
  },
  methods: {
    addTab(item) {
      this.$store.commit("addTab", item);
    },
    handleClick() {
      this.$message.success("你好呀");
    },
    getUserInfo() {
      this.$axios.get("/sys/userInfo").then((res) => {
        this.userInfo = res.data.data;
      });
    },
    userCenter() {
      this.$router.push("/userCenter");
    },
    logout() {
      this.$axios.post("/logout").then((res) => {
        localStorage.clear();
        sessionStorage.clear();
        this.$store.commit("resetStore");
        this.$message.success(res.data.msg);
        this.$router.push("/login");
      });
    },
  },
  created() {
    this.getUserInfo();
  },
  components: {
    tabs,
  },
};
</script>
<style scoped>
.header-avatar {
  float: right;
  display: flex;
  width: 170px;
  justify-content: space-around;
  align-items: center;
}

.el-container {
  padding: 0;
  margin: 0;
  height: 100%;
}

.el-header {
  background-color: #9aa3af;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
}

.el-main {
  color: #333;
  padding: 0;
}

.el-menu-vertical-demo {
  height: 100%;
}
</style>