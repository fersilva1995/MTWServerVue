<template>
  <div>
    
    <navbar>
   
    </navbar>
      <sidebar :routes="routes">
      </sidebar>
      <contentVue>     
        <language></language> 
        <router-view></router-view>
      </contentVue>
  </div>
</template>

<script>
import GroupTable   from './components/shared/table/GroupTable.vue';
import UserTable    from './components/shared/table/UserTable.vue';
import Navbar       from './components/shared/navbar/Navbar.vue'
import Sidebar      from './components/shared/sidebar/Sidebar.vue';
import Content      from './components/shared/content/Content.vue';
import Language     from './components/shared/language/Language.vue';
import { routes }   from './routes';

export default {

  components: {
    'groupTable': GroupTable,
    'userTable' : UserTable,
    'contentVue' : Content,
    'navbar' : Navbar,
    'sidebar' : Sidebar,
    'language' : Language,
  },

  data() {
      return {
        routes
      }
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