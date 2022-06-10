<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <div class="brand-link">
      <img src="dist/img/AdminLTELogo.png" alt="MTW Server Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">MTW Server</span>
    </div>

    <div class="sidebar">
      <div class="form-inline mt-3">
        <div class="input-group" data-widget="sidebar-search">
          <input class="form-control form-control-sidebar" type="search" placeholder="Procurar" aria-label="Procurar">
          <div class="input-group-append">
            <button class="btn btn-sidebar">
              <i class="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div>
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li class="nav-item menu-open">
                    <ul class="nav nav-treeview">
                        <li v-for="route in routes" :key="route" :if="route.icon" class="nav-item">
                            <router-link :to="route.path ? route.path : '/'" class="nav-link">
                                <i :class="route.icon"></i>
                                <p>{{ $i18n.t(route.title)}}</p>
                            </router-link>
                        </li>
                    </ul>     
                </li> 
            </ul>
        </nav>
    </div>
  </aside>
</template>


<script>
import Service from '../../../domain/user/User';

  export default {
    props : {
      routes: []
    },

    created() {
      this.service = new Service(this.$resource);
    }

  }


</script>

<style scoped>

</style>
