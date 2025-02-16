<template>
    <div class="container">
        <form class="form" @submit.prevent>
            <h1 class="title">
                Login
                <i class="far fa-user-circle"></i>
            </h1>
            <div class="notification is-danger" v-if="error">
                <p>Incorrect username or password</p>
            </div>
            <div class="field">
                <div class="control has-icons-left">
                    <input
                        class="input"
                        type="text"
                        placeholder="Username"
                        v-model="username"
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                </div>
            </div>
            <div class="field">
                <div class="control has-icons-left">
                    <input
                        class="input"
                        type="password"
                        placeholder="Password"
                        v-model="password"
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <button
                        class="button is-link"
                        v-on:click="loginUser"
                        v-bind:disabled="submittedBoolean"
                    >
                        Login
                    </button>
                </div>
            </div>
            <p>
                Don't have an account?
                <router-link to="/accounts/register">Register</router-link>
            </p>
        </form>
    </div>
</template>

<script>
import { djangoAPI } from "../axios";
import { toast } from "bulma-toast";
export default {
    name: "Login",
    data() {
        return {
            username: null,
            password: null,
            submittedBoolean: false,
            error: false,
        };
    },
    methods: {
        checkAuthenticated() {
            if (this.$store.authenticated === "true") {
                this.$router.push("/accounts/profile");
            }
        },
        loginUser() {
            this.submittedBoolean = true;
            djangoAPI
                .post("/api/v1/accounts/login/", {
                    username: this.username,
                    password: this.password,
                })
                .then((loginResponse) => {
                    console.log(loginResponse);
                    this.$store.commit(
                        "saveTokenAccessState",
                        loginResponse.data.access
                    );
                    this.$store.commit(
                        "saveTokenRefreshState",
                        loginResponse.data.refresh
                    );
                    this.$store.commit(
                        "saveCurrentUserState",
                        loginResponse.data.username
                    );
                    this.$store.commit("authenticate");
                    this.$router.push("/");
                    toast({
                        message: "You have been successfully logged in!",
                        type: "is-success",
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 3000,
                        position: "bottom-right",
                    });
                })
                .catch((error) => {
                    console.log(error);
                    this.submittedBoolean = false;
                    if (error) {
                        this.error = true;
                    }
                });
        },
        setTitle() {
            document.title = "Login | MechMarketEU";
        },
    },
    created() {
        this.checkAuthenticated();
        this.setTitle();
    },
};
</script>

<style scoped>
.container {
    min-height: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    margin-bottom: 30px;
}
.form {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 10px;
    padding: 30px;
}
.notification.is-danger {
    padding: 20px 27px 20px 24px;
}
p {
    text-align: center;
}
.title {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}
.input {
    height: 100%;
}
@media (max-width: 1024px) {
    .container {
        justify-content: start;
        margin: 0px;
    }
    .form {
        box-shadow: none;
        border-radius: 0px;
    }
}
</style>
