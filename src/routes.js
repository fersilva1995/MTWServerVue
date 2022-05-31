import Equipment from './components/equipment/Equipment.vue';
import User from './components/user/User.vue';
import Group from './components/group/Group.vue';
import Profile from './components/profile/Profile.vue';
import Server from './components/server/Server.vue';


export const routes = [
    { path: '/equipment', component: Equipment, title: 'equipment', icon: 'nav-icon fas fa-cubes' },
    { path: '/profile', component: Profile, title: 'profile', icon: 'nav-icon fas fa-users' },
    { path: '/user', component: User, title: 'user', icon: 'nav-icon fas fa-users' },
    { path: '/Servers', component: Server, title: 'server', icon: 'nav-icon fas fa-users' },
    { path: '/group', component: Group, title: 'group', icon: 'nav-icon fas fa-object-group' },
];

