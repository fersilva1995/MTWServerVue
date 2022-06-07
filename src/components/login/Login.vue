<template>
    <b-container>
        <b-row>
            <b-col>
                <form class="center">
                    <div class="login">
                        <h3>SIGN IN</h3>
                        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                            <b-form-group id="usernameInput" label-for="username" class="form">
                                <b-form-input id="username" v-model="form.name" :placeholder="$i18n.t('usernameLabel')" required class="input"></b-form-input>
                            </b-form-group>
                            <b-form-group id="passwordInput" label-for="password" class="form">
                                <b-form-input id="password" v-model="form.email" type="password" :placeholder="$i18n.t('passwordLabel')" required class="input"></b-form-input>
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
import {i18n} from '../../lang/lang';
import Button from '../shared/button/Button.vue'
import Label from '../shared/label/Label.vue'


export default {

    components: {
        'myButton' : Button,
        'myLabel': Label,
    },

    data() {
        return{
            form: {
                email: '',
                name: '',
                food: null,
                checked: []
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
            // Reset our form values
            this.form.email = ''
            this.form.name = ''
            this.form.food = null
            this.form.checked = []
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })

        },

        login() {
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
        top: 35%;
        right: 0px;
        bottom: 0px;
        left: 0px;
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