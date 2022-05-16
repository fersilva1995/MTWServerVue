import Home from './components/home/Home.vue';
import Equipment from './components/equipment/Equipment.vue';
import User from './components/user/User.vue';
import Group from './components/group/Group.vue';
import GroupAdd from './components/group/GroupAdd.vue';


export const routes = [
    { path: '', component: Home, title: 'Home', icon: 'nav-icon fas fa-home' },
    { path: '/equipment', component: Equipment, title: 'Equipamentos', icon: 'nav-icon fas fa-cubes' },
    { path: '/user', component: User, title: 'Usuários', icon: 'nav-icon fas fa-users' },
    { path: '/group', component: Group, title: 'Grupos', icon: 'nav-icon fas fa-object-group' },
    { path: '/groupAdd', component: GroupAdd, title: '', icon: '' }
];


/*
title: 'Adicionar Grupos', icon: 'nav-icon fas fa-object-group'
*/