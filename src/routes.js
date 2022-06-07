import Equipment from './components/equipment/Equipment.vue';
import User from './components/user/User.vue';
import Group from './components/group/Group.vue';
import Profile from './components/profile/Profile.vue';
import Server from './components/server/Server.vue';
import Vehicle from './components/vehicle/Vehicle.vue';
import Period from './components/period/Period.vue';
import Visitor from './components/visitor/Visitor.vue';
import Schedule from './components/schedule/Schedule.vue';
import Permanent from './components/permanent/Permanent.vue';
import RestrictedPlates from './components/restrictedPlates/RestrictedPlates.vue';
import Record from './components/record/Record.vue';
import Telemetry from './components/telemetry/Telemetry.vue';


export const routes = [
    { path: '/equipment', component: Equipment, title: 'equipment', icon: 'nav-icon fas fa-cubes' },
    { path: '/profile', component: Profile, title: 'profile', icon: 'nav-icon fas fa-user' },
    { path: '/user', component: User, title: 'user', icon: 'nav-icon fas fa-users' },
    { path: '/servers', component: Server, title: 'server', icon: 'nav-icon fas fa-server' },
    { path: '/group', component: Group, title: 'group', icon: 'nav-icon fas fa-object-group' },
    { path: '/vehicle', component: Vehicle, title: 'vehicle', icon: 'nav-icon fas fa-car' },
    { path: '/period', component: Period, title: 'period', icon: 'nav-icon fas fa-hourglass-start' },
    { path: '/visitor', component: Visitor, title: 'visitor', icon: 'nav-icon fas fa-retweet' },
    { path: '/schedule', component: Schedule, title: 'schedule', icon: 'nav-icon fas fa-calendar' },
    { path: '/permanent', component: Permanent, title: 'permanent', icon: 'nav-icon fas fa-reply-all' },
    { path: '/restrictedPlates', component: RestrictedPlates, title: 'restrictedPlates', icon: 'nav-icon fas fa-ban' },
    { path: '/record', component: Record, title: 'record', icon: 'nav-icon fas fa-clone' },
    { path: '/telemetry', component: Telemetry, title: 'telemetry', icon: 'nav-icon fas fa-clone' },
    
];

