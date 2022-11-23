<template>
  <div id="db-wrapper">
    <!-- navbar vertical -->
    <!-- Sidebar -->
    <nav class="navbar-vertical navbar">
      <div class="nav-scroller">
        <!-- Brand logo -->
        <router-link class="navbar-brand" to="/">
          <img src="assets/images/brand/logo/logo.svg" alt="" />
        </router-link>
        <!-- Navbar nav -->
        <ul class="navbar-nav flex-column" id="sideNavbar">
          <li class="nav-item">
            <router-link class="nav-link has-arrow" :to="{ name: 'home' }">
              <i class="fa-solid fa-house nav-icon icon-xs me-2"></i> Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'login' }">
              <i class="fa-solid fa-lock-open nav-icon icon-xs me-2"></i> Login
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <!-- Page Content -->
    <div id="page-content">
      <div class="container-fluid px-6 py-6">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
