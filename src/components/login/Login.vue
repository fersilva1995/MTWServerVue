<template>
    <b-container>
        <b-row>
            <b-col>
                <form class="center">
                    <div class="login">
                        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                            <h3 class="textCenter">SIGN IN</h3>
                            <b-form-group id="usernameInput" label-for="username" class="form">
                                <b-form-input id="username" v-model="form.username" :placeholder="$i18n.t('usernameLabel')" required class="input"></b-form-input>
                            </b-form-group>
                            <b-form-group id="passwordInput" label-for="password" class="form">
                                <b-form-input id="password" v-model="form.password" type="password" :placeholder="$i18n.t('passwordLabel')" required class="input"></b-form-input>
                            </b-form-group>
                            <myButton type="button" title="Login" buttonStyle="outline-primary" @buttonAction="login()"></myButton>
                            <div>
                                <myLabel :text="$i18n.t('createAccount')"></myLabel>
                            </div>                          
                        </b-form>
                    </div>
                </form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Service from '../../domain/user/UserService'
import Button from '../shared/button/Button.vue'
import Label from '../shared/label/Label.vue'
import Equipment from '../equipment/Equipment.vue';
import User from '../user/User.vue';
import Group from '../group/Group.vue';
import Profile from '../profile/Profile.vue';
import Server from '../server/Server.vue';
import Vehicle from '../vehicle/Vehicle.vue';
import Period from '../period/Period.vue';
import Visitor from '../visitor/Visitor.vue';
import Schedule from '../schedule/Schedule.vue';
import Permanent from '../permanent/Permanent.vue';
import RestrictedPlates from '../restrictedPlates/RestrictedPlates.vue';
import Record from '../record/Record.vue';
import Telemetry from '../telemetry/Telemetry.vue';


export default {

    props: {
        routes: [],
    },

    components: {
        'myButton' : Button,
        'myLabel': Label,
    },

    data() {
        return{
            form: {
                username: '',
                password: '',
            },
            show: true,
        }
    },

    methods: {
        onSubmit(event) {
            event.preventDefault()
            alert(JSON.stringify(this.form))
        },

        onReset(event) {
            event.preventDefault()
            this.form.username = ''
            this.form.password = ''
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })

        },

        login() {

            console.log(this.form);
            
            this.service.search(this.form.username, this.form.password)
            .then(function(element) {
                
                console.log(element);
                
                if(element.id > 0) {

                    console.log("route");
                    console.log(this.$router.options.routes);
                    console.log(element);

                    if(element.id == 1) {
                     
                        this.$router.addRoutes([
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
                            { path: '/telemetry', component: Telemetry, title: 'telemetry', icon: 'nav-icon fas fa-clone' }
                        ]);
                      
                        this.$router.options.routes.push({ path: '/equipment', component: Equipment, title: 'equipment', icon: 'nav-icon fas fa-cubes' });
                        this.$router.options.routes.push({ path: '/profile', component: Profile, title: 'profile', icon: 'nav-icon fas fa-user' });
                        this.$router.options.routes.push({ path: '/user', component: User, title: 'user', icon: 'nav-icon fas fa-users' });
                        this.$router.options.routes.push({ path: '/servers', component: Server, title: 'server', icon: 'nav-icon fas fa-server' });
                        this.$router.options.routes.push({ path: '/group', component: Group, title: 'group', icon: 'nav-icon fas fa-object-group' });
                        this.$router.options.routes.push({ path: '/vehicle', component: Vehicle, title: 'vehicle', icon: 'nav-icon fas fa-car' });
                        this.$router.options.routes.push({ path: '/period', component: Period, title: 'period', icon: 'nav-icon fas fa-hourglass-start' });
                        this.$router.options.routes.push({ path: '/visitor', component: Visitor, title: 'visitor', icon: 'nav-icon fas fa-retweet' });
                        this.$router.options.routes.push({ path: '/schedule', component: Schedule, title: 'schedule', icon: 'nav-icon fas fa-calendar' });
                        this.$router.options.routes.push({ path: '/permanent', component: Permanent, title: 'permanent', icon: 'nav-icon fas fa-reply-all' });
                        this.$router.options.routes.push({ path: '/restrictedPlates', component: RestrictedPlates, title: 'restrictedPlates', icon: 'nav-icon fas fa-ban' });
                        this.$router.options.routes.push({ path: '/record', component: Record, title: 'record', icon: 'nav-icon fas fa-clone' });
                        this.$router.options.routes.push({ path: '/telemetry', component: Telemetry, title: 'telemetry', icon: 'nav-icon fas fa-clone' });

                    } else {
                        if(element.profile.lprRecord) {}
                        if(element.profile.acessRecord) {}
                        if(element.profile.acessPermanent) {this.$router.options.routes.push({ path: '/permanent', component: Permanent, title: 'permanent', icon: 'nav-icon fas fa-reply-all' });}
                        if(element.profile.acessVisitor) {this.$router.options.routes.push({ path: '/visitor', component: Visitor, title: 'visitor', icon: 'nav-icon fas fa-retweet' });}
                        if(element.profile.acessModel) {this.$router.options.routes.push({ path: '/vehicle', component: Vehicle, title: 'vehicle', icon: 'nav-icon fas fa-car' });}
                        if(element.profile.acessPeriod) {this.$router.options.routes.push({ path: '/period', component: Period, title: 'period', icon: 'nav-icon fas fa-hourglass-start'});}
                        if(element.profile.acessSchedule) {this.$router.options.routes.push({ path: '/schedule', component: Schedule, title: 'schedule', icon: 'nav-icon fas fa-calendar' });}
                        if(element.profile.acessOrigin) {}
                        if(element.profile.acessAction) {}
                        if(element.profile.acessRestrictedPlate) { console.log('restricted'); this.$router.options.routes.push({ path: '/restrictedPlates', component: RestrictedPlates, title: 'restrictedPlates', icon: 'nav-icon fas fa-ban' });}
                        if(element.profile.acessLpr) {}
                        if(element.profile.acessAnalyzer) {}
                        if(element.profile.acessCameraControl ) {}
                        if(element.profile.acessMasterEye) {}
                        if(element.profile.acessTelemetry) {this.$router.options.routes.push({ path: '/telemetry', component: Telemetry, title: 'telemetry', icon: 'nav-icon fas fa-clone' });}
                        if(element.profile.acessRecordVideo) {this.$router.options.routes.push({ path: '/record', component: Record, title: 'record', icon: 'nav-icon fas fa-clone' });}
                        if(element.profile.acessAlarm) {}
                        if(element.profile.acessAddEquipament) {}
                        if(element.profile.acessRemoveEquipment) {}
                        if(element.profile.acessEditEquipment) {}
                        if(element.profile.acessAddGroup) {}
                        if(element.profile.acessRemoveGroup) {}
                        if(element.profile.acessEditGroup) {}

                        this.$router.addRoutes(this.$router.options.routes);
                    }

                    console.log(this.$router.options.routes);
  
                    this.$emit('logginAttempt', true);     
                    this.$session.set('loggedId', element.id);               
                    setTimeout(() => {
                       this.$router.push({ path: '/equipment' });
                    }, 1000)
                }
            })
        }
    },

    created() {
        this.service = new Service(this.$resource);
        if(this.$session.get('logged')) {
            this.$router.push({ path: '/equipment' });
        }

    }

}

</script>

<style scoped>

    h3 {
        color: darkgrey;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-weight: 700;
    }

    .logoTop {
        width: 450px;
        margin-top: 5em;
    }
    
    .logoFooter {
        width: 200px;
        margin-top: 5em;
    }


    .center {
        position: absolute;
        margin-top: 30%;
        right: 0px;
        left: 0px;
    }

    .textCenter {
        left: 100px;
    }

    .center .login {
        min-width: 200px;
        min-height: 200px;
        margin-left: 35%;
        margin-right: 35%;
        width: 30%;
    }

    .form {
        padding: 10px;
    }

    .input {
        max-width: 300px;
        margin: 0 auto;
        background-color: transparent;
        border-radius: 10px;
        border-color: gray;
        color: gray;
        text-align: center;
    }
</style>