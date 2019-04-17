<template>
  <div class="todo">
    <el-button type="primary" @click="dialogVisible = true" size="small">Add</el-button>
    <el-dialog title="New Task" :visible.sync="dialogVisible" center>
      <el-input class="textarea" type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
      <div slot="footer">
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <div class="check">
      <el-checkbox-group v-model="check" class="check-group">
        <el-checkbox v-for="(item,index) in todo" :label="item.content" :key="index">{{item.content}}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script>
import * as http from "@/request/todo"
import throttle from 'lodash/throttle';

export default {
  data() {
    return {
      todo: [],
      textarea: "",
      dialogVisible: false,
      check: [],
    }
  },
  created() {
    this.fetch();
  },
  computed: {
    userId() {
      return this.$route.query.userId
    }
  },
  watch: {
    check: {
      handler: throttle(function () {
        this.update();
      }, 1000, { 'leading': false })
    }
  },
  methods: {
    fetch() {
      http.fetch(this.userId).then(res => {
        const data = res.data;
        if (!data.failed) {
          this.todo = data.content.map(item => {
            const { content, completed } = item;
            return { content, completed }
          });
          const checkData = data.content.map(item => {
            const { content, completed } = item;
            if (completed) {
              return content
            }
          });
          this.check = checkData.filter(el => {
            return el && el.trim();
          })
        }
      })
    },
    add() {
      this.dialogVisible = false;
      const val = {
        userId: this.userId,
        content: this.textarea,
        completed: false,
      };
      http.add(val).then(res => {
        if (!res.data.failed) {
          this.fetch();
          this.textarea = "";
        }
      })
    },
    update() {
      const val = this.todo.map(item => {
        return Object.assign(item, { completed: this.check.includes(item.content) })
      })
      http.update(val).then(res => {
        console.log(res.data);
      })
    }
  }
}
</script>
<style scoped>
.check {
  display: flex;
  justify-content: center;
}
.check-group {
  width: 20%;
  text-align: left;
}
.check-group label {
  height: 30px;
  line-height: 30px;
  font-size: 26px;
  font-weight: 600;
}
/deep/.el-checkbox {
  display: block;
}
/deep/.textarea {
  width: 80%;
  margin: 0 10%;
}
</style>
