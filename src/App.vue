<template>
  <div>
    <div v-if="logged">
      <navbar>
      </navbar>
      <sidebar :routes="filteredRoutes">
      </sidebar>
      <contentVue>     
        <language></language> 
        <router-view></router-view>
      </contentVue>
    </div>
    <div v-else>
      <login :routes="routes" @logginAttempt="logginAttempt"></login>
    </div>
  </div>
</template>

<script>
import Navbar       from './components/shared/navbar/Navbar.vue'
import Sidebar      from './components/shared/sidebar/Sidebar.vue';
import Content      from './components/shared/content/Content.vue';
import Language     from './components/shared/language/Language.vue';
import { routes }   from './routes';
import Login        from './components/login/Login.vue';

export default {

  components: {
    'contentVue' : Content,
    'navbar' : Navbar,
    'sidebar' : Sidebar,
    'language' : Language,
    'login' : Login,
  },

  data() {
    return {
      routes : this.$router.options.routes,
      status: false,
    }
  },

  computed: {
    logged() {
      console.log(this.status);
      console.log(this.$session.get('logged'));
      return this.$session.get('logged');
    },

    filteredRoutes() {
      return this.$router.options.routes;
    }


  },

  methods: {
    logginAttempt(login) {
      this.$session.set('logged', true);
      this.status = login;
    }
  },

  created() {
    this.$session.start();
  }

}

</script>


<style>
@import 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback';
@import '~/plugins/fontawesome-free/css/all.min.css';
@import 'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css';
@import '~/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css';
@import '~/plugins/icheck-bootstrap/icheck-bootstrap.min.css';
@import '~/plugins/jqvmap/jqvmap.min.css';
@import '~/dist/css/adminlte.min.css';
@import '~/plugins/overlayScrollbars/css/OverlayScrollbars.min.css';
@import '~/plugins/daterangepicker/daterangepicker.css';
@import '~/plugins/summernote/summernote-bs4.min.css';
</style>