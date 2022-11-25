<template>
  <div class="row">
    <div class="col-md-12 col-12">
      <!-- card  -->
      <div class="card" v-if="tasks.length">
        <!-- card header  -->
        <div class="card-header bg-white border-bottom-0 py-4">
          <h4 class="mb-0">Assign Tasks</h4>
        </div>
        <!-- table  -->
        <div class="table-responsive">
          <table class="table text-nowrap mb-0">
            <thead class="table-light">
              <tr>
                <th>Task name</th>
                <th>Priority</th>
                <th>Project</th>
                <th>Status</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in tasks" :key="task.id">
                <td class="align-middle">
                  <div class="d-flex align-items-center">
                    <div class="lh-1">
                      <h5 class="fw-bold mb-1">
                        <a
                          href="#"
                          class="text-inherit"
                          style="letter-spacing: 0.7px"
                          @click="showTaskDetails(task.id)"
                          >{{ task.name }}</a
                        >
                      </h5>
                    </div>
                  </div>
                </td>
                <td class="align-middle">
                  <span class="badge text-info" v-if="task.priority == '0'"
                    >Low</span
                  >
                  <span
                    class="badge text-bg-warning"
                    v-if="task.priority == '1'"
                    >Medium</span
                  >
                  <span class="badge text-bg-danger" v-if="task.priority == '2'"
                    >High</span
                  >
                </td>
                <td class="align-middle">
                  <router-link to="/projects">
                    {{ task.project_name }}
                  </router-link>
                </td>
                <td class="align-middle">
                  <div class="float-start">
                    <span
                      class="badge bg-warning"
                      v-if="task.assigned_status == 0"
                      >Not Started!</span
                    >
                    <span class="badge bg-info" v-if="task.assigned_status == 1"
                      >In Progress</span
                    >
                    <span
                      class="badge bg-success"
                      v-if="task.assigned_status == 2"
                      >Done</span
                    >
                    <span
                      class="badge bg-danger"
                      v-if="task.assigned_status == 3"
                      >Overdue</span
                    >
                  </div>
                </td>
                <td class="align-middle text-dark">
                  <div class="float-start">
                    {{ task.due_date }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="alert alert-warning" v-else>
        <code class="fs-3">You have been assigned no task!</code>
        <br />
        <code>or You will have to log in first to see the assigned tasks.</code>
      </div>
    </div>
    <div class="col-lg-6 offset-lg-3 mt-3" v-if="showTask">
      <TaskView :taskId="this.taskId" @update="updateTaskStatus" />
    </div>
  </div>
</template>

<script>
import TaskView from "../components/TaskView.vue";
export default {
  name: "HomeView",
  components: { TaskView },
  data() {
    return {
      tasks: [],
      token: "",
      employeeCode: "",
      showTask: false,
      taskId: "",
    };
  },
  methods: {
    getTasks() {
      this.axios
        .get("http://localhost:8000/api/assigned_tasks/" + this.employeeCode, {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((response) => {
          this.tasks = response.data.tasks;
        })
        .catch((error) => console.log(error));
    },
    showTaskDetails(taskId) {
      this.taskId = taskId;
      this.showTask = true;
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      this.token = user.token;
      this.employeeCode = user.employee_code;
    }
    if (this.token) {
      this.getTasks();
    }
  },
};
</script>
