<template>
    <div class="container">
        <h1 class="title" id="main-title">
            My posts
            <router-link id="create" to="/posts/create">
                <i class="far fa-plus-square"></i>
            </router-link>
        </h1>
        <p v-if="!products.length">No posts added...</p>
        <AccountsProfile
            v-for="product in products"
            v-bind:key="product.id"
            v-bind:product="product"
            v-on:deleteProduct="deleteProduct"
        />
    </div>
</template>

<script>
import { djangoAPI } from "../axios";
import { toast } from "bulma-toast";
import AccountsProfile from "../components/AccountsProfile.vue";
export default {
    name: "Profile",
    components: {
        AccountsProfile,
    },
    data() {
        return {
            products: [],
        };
    },
    methods: {
        getUserProducts() {
            djangoAPI
                .get("/api/v1/accounts/profile/", {
                    headers: {
                        Authorization: `JWT ${this.$store.state.tokenAccess}`,
                    },
                })
                .then((profileResponse) => {
                    console.log(profileResponse);
                    this.products = profileResponse.data;
                })
                .catch((error) => {
                    console.log(error);
                    if (
                        error.response.status === 403 ||
                        error.response.status === 401
                    ) {
                        this.$store.commit("removeCredentialsState");
                        this.$router.push("/error");
                    }
                });
        },
        deleteProduct(product) {
            this.products = this.products.filter((i) => {
                return i.post_id !== product.post_id;
            });
            toast({
                message: "Post has been successfully deleted!",
                type: "is-success",
                dismissible: true,
                pauseOnHover: true,
                duration: 3000,
                position: "bottom-right",
            });
        },
        setTitle() {
            document.title = "My Posts | MechMarketEU";
        },
    },
    created() {
        this.getUserProducts();
        this.setTitle();
    },
};
</script>

<style scoped>
.container {
    min-height: 100%;
    width: 100%;
    padding: 30px;
}
.title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ededed;
    padding-bottom: 15px;
    margin-bottom: 20px;
}
a#create {
    color: #424242;
}
#create:hover {
    color: black;
}
</style>
