<template>
    <footer>
        <div class="footer-content">
            <div class="content">
                <p>
                    Have any improvements or found a bug? Let me know below
                    &#128578;
                </p>
                <div class="modalActivate" style="display: inline">
                    <i v-on:click="modalBoolean = true" class="fas fa-at"></i>
                    <div
                        class="modal"
                        v-bind:class="{ 'is-active': modalBoolean }"
                    >
                        <div
                            class="modal-background"
                            v-on:click="modalBoolean = false"
                        ></div>
                        <div class="modal-content">
                            <form class="form" @submit.prevent>
                                <h1 class="title" id="title-modal">
                                    Give feedback
                                    <i class="far fa-address-book"></i>
                                </h1>
                                <div class="field">
                                    <span class="label">Email</span>
                                    <div class="control has-icons-left">
                                        <input
                                            class="input"
                                            type="email"
                                            placeholder="example@example.com"
                                            v-model="email"
                                        />
                                        <span class="icon is-small is-left">
                                            <i class="fas fa-envelope"></i>
                                        </span>
                                    </div>
                                    <p
                                        class="help is-danger"
                                        v-if="errorEmailBoolean"
                                    >
                                        <i
                                            class="fas fa-exclamation-circle"
                                        ></i>
                                        {{ errorMessageEmail }}
                                    </p>
                                </div>
                                <div class="field">
                                    <span class="label">Message</span>
                                    <div class="control">
                                        <textarea
                                            class="textarea"
                                            rows="10"
                                            type="text"
                                            v-model="description"
                                        ></textarea>
                                    </div>
                                    <p
                                        class="help is-danger"
                                        v-if="errorDescriptionBoolean"
                                    >
                                        <i
                                            class="fas fa-exclamation-circle"
                                        ></i>
                                        {{ errorMessageDescription }}
                                    </p>
                                </div>
                                <div class="field">
                                    <div class="control" id="submit">
                                        <button
                                            class="button is-link"
                                            v-on:click="contactAdmin"
                                            v-bind:disabled="submittedBoolean"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <button
                            class="modal-close is-large"
                            v-on:click="modalBoolean = false"
                        ></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div>
                Icons made by
                <a href="https://flat-icons.com/" title="Flat Icons"
                    >Flat Icons</a
                >
                from
                <a href="https://www.flaticon.com/" title="Flaticon"
                    >www.flaticon.com</a
                >
            </div>
            <span
                >Home page images taken from
                <a href="https://www.unsplash.com" title="Unsplash"
                    >www.unsplash.com</a
                ></span
            >
            <router-link class="terms" to="/terms"
                >Terms and Conditions</router-link
            >
            <span>&copy; 2021 mechmarket.eu</span>
        </div>
    </footer>
</template>

<script>
import { djangoAPI } from "../axios";
import { toast } from "bulma-toast";
export default {
    name: "Footer",
    data() {
        return {
            modalBoolean: false,
            email: null,
            description: null,
            errorMessageEmail: null,
            errorMessageDescription: null,

            errorEmailBoolean: false,
            errorDescriptionBoolean: false,
            submittedBoolean: false,
        };
    },
    methods: {
        contactAdmin() {
            if (!this.email) {
                this.errorEmailBoolean = true;
                this.errorMessageEmail = "Email cannot be empty";
                return;
            } else {
                this.errorEmailBoolean = false;
            }
            if (!this.description) {
                this.errorDescriptionBoolean = true;
                this.errorMessageDescription = "Message cannot be empty";
                return;
            } else {
                this.errorDescriptionBoolean = false;
            }
            this.submittedBoolean = true;
            let message = {
                email: this.email,
                description: this.description,
            };
            djangoAPI
                .post(`/api/v1/accounts/user/admin/feedback/`, message)
                .then((contactedAdminResponse) => {
                    console.log(contactedAdminResponse);
                    this.modalBoolean = false;
                    toast({
                        message:
                            "Feedback has been successfully sent. Thank you!",
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
                });
        },
    },
};
</script>

<style scoped>
footer {
    font-weight: 100;
    color: #949494;
    border-top: 1px solid #ededed;
    padding: 15px 30px 15px 30px;
    text-align: center;
}
.footer-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 15px;
    padding-bottom: 15px;
}
.fas.fa-at {
    font-size: 25px;
}
.footer-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.terms,
a:link,
a:visited,
a:active,
a:hover {
    color: inherit;
}
.fas.fa-at {
    cursor: pointer;
}
.modal-content {
    background: white;
    border-radius: 10px;
    padding: 30px;
}
.help.is-danger {
    text-align: left;
}
#title-modal {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}
.input {
    height: 100%;
}
#error {
    text-align: center;
}
.label {
    text-align: left;
}
#submit {
    display: flex;
    justify-content: flex-start;
}
@media (max-width: 1024px) {
    .modal-content {
        border-radius: 0px;
    }
}
</style>
