<template>
  <div class="row">
    <div class="col-md-12 col-12">
      <!-- card  -->
      <div class="card" v-if="tasks.length">
        <!-- card header  -->
        <div class="card-header bg-white border-bottom-0 py-4">
          <h4 class="mb-0">Assigned Tasks</h4>
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
                      <h5 class="mb-1">
                        <a
                          href="#"
                          class="text-inherit"
                          style="letter-spacing: 1px"
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
                  <a href="#" @click="toggleProject">
                    {{ task.project_name }}
                  </a>
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
  </div>
  <div class="row mt-3">
    <div class="col-lg-12" v-if="projects.length">
      <div class="card">
        <!-- card header  -->
        <div class="card-header bg-white border-bottom-0 py-4">
          <h4 class="mb-0">Projects</h4>
        </div>
        <!-- table  -->
        <div class="table-responsive">
          <table class="table text-nowrap mb-0">
            <thead class="table-light">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Mark Done</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="project in projects" :key="project.id">
                <td class="align-middle">
                  <div class="d-flex align-items-center">
                    <div class="lh-1">
                      <h5 class="fw-bold mb-1">
                        <a
                          href="#"
                          class="text-inherit"
                          style="letter-spacing: 0.7px"
                          >{{ project.name }}</a
                        >
                      </h5>
                    </div>
                  </div>
                </td>
                <td class="align-middle">
                  <p class="text-inherit" style="letter-spacing: 1px">
                    {{ project.description }}
                  </p>
                </td>
                <td class="align-middle">
                  <div class="d-flex align-items-center gap-2">
                    <label class="form-label">Done</label>
                    <input
                      type="checkbox"
                      class="form-check mb-2"
                      :checked="project.is_done == 1"
                      @change.once="markDone(project.id)"
                      :disabled="project.is_done == 1"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="col-lg-6 mt-3" v-if="showTask">
    <TaskView :taskId="this.taskId" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TaskView from "../components/TaskView.vue";
export default {
  name: "HomeView",
  components: { TaskView },
  data() {
    return {
      tasks: [],
      projects: [],
      showTask: false,
      taskId: "",
    };
  },
  computed: {
    ...mapGetters(["getToken", "getEmployeeCode"]),
  },
  methods: {
    getTasks() {
      this.axios
        .post(
          "http://localhost:8000/api/assigned-tasks",
          {
            employeeCode: this.getEmployeeCode,
          },
          {
            headers: {
              Authorization: "Bearer " + this.getToken,
            },
          }
        )
        .then((response) => {
          this.tasks = response.data.tasks;
        })
        .catch((error) => console.log(error.message));
    },
    getProjects() {
      this.axios
        .get("http://localhost:8000/api/projects", {
          headers: {
            Authorization: "Bearer " + this.getToken,
          },
        })
        .then((response) => {
          for (let i = 0; i < response.data.projects.length; i++) {
            const element = response.data.projects[i];
            if (element.description.length > 50) {
              element.description = element.description.substr(0, 20) + "...";
            }
          }
          this.projects = response.data.projects;
        })
        .catch((error) => console.log(error.message));
    },
    markDone(projectId) {
      this.axios
        .post(
          "http://localhost:8000/api/project/mark_done",
          {
            projectId,
            isDone: true,
          },
          {
            headers: {
              Authorization: "Bearer " + this.getToken,
            },
          }
        )
        .catch((error) => console.log(error.message));
    },
    showTaskDetails(taskId) {
      this.taskId = taskId;
      this.showTask = true;
    },
  },
  mounted() {
    if (this.getToken) {
      if (this.getEmployeeCode) {
        this.getTasks();
      }
      this.getProjects();
    }
  },
};
</script>
