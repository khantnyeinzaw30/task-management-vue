<template>
  <!-- card -->
  <div class="card rounded-3" v-if="task">
    <!-- card body -->
    <div class="card-body">
      <!-- heading -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <code class="fs-3 fw-bold text-uppercase mb-0">{{ task.name }}</code>
        </div>
        <div class="icon-shape icon-md bg-light-primary text-primary rounded-1">
          <i class="fa-solid fa-list"></i>
        </div>
      </div>
      <!-- task details -->
      <div class="d-flex justify-content-around align-items-center mb-3">
        <strong>
          Priority :
          <span class="badge text-info" v-if="task.priority == '0'">Low</span>
          <span class="badge text-bg-warning" v-if="task.priority == '1'"
            >Medium</span
          >
          <span class="badge text-bg-danger" v-if="task.priority == '2'"
            >High</span
          >
        </strong>
        <div>
          <strong
            >Project : <a href="#"> {{ task.project_name }}</a></strong
          >
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center gap-3">
        <select v-model="taskStatus" class="form-control">
          <option value="0" :selected="task.assigned_status == 0">
            Not Started
          </option>
          <option value="1" :selected="task.assigned_status == 1">
            In Progress
          </option>
          <option value="2" :selected="task.assigned_status == 2">Done</option>
          <option value="3" :selected="task.assigned_status == 3">
            Overdue
          </option>
        </select>
        <button class="btn btn-primary" @click="handleTaskStatus">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import getUserData from "@/assets/getUserData";
export default {
  name: "TaskView",
  props: ["taskId"],
  data() {
    return {
      task: null,
      taskStatus: "0",
      token: "",
    };
  },
  methods: {
    getTask() {
      this.axios
        .get("http://localhost:8000/api/task-details/" + this.taskId, {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((response) => {
          this.task = response.data.task;
        })
        .catch((error) => console.log(error.message));
    },
    handleTaskStatus() {
      //   console.log("ID = " + this.task.id, "Status = " + this.taskStatus);
      this.axios
        .post(
          "http://localhost:8000/api/change/task_status",
          {
            taskId: this.taskId,
            taskStatus: this.taskStatus,
          },
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        )
        .catch((error) => console.log(error.message));
    },
  },
  mounted() {
    const user = getUserData();
    if (user) {
      this.token = user.token;
      this.getTask();
    }
  },
};
</script>
