import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';


const url = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'vue-product-list';

// 使用者若無登入直接進入商品頁面，會被導回登入頁面
// 使用者可以查看產品列表
// 使用者可以點擊單一產品，查看詳細資訊

// 1. 建立元件
// 2. 生成 vue 元件
// 3. 渲染至畫面上
const app = {
    data () {
        return {
            products: [],
            tempProduct: {}
        }
    },
    methods: {
        checkLogin() {
            axios.post(`${url}/api/user/check`)
            .then(res => {
                // 驗證成功
                this.getProducts();
            })
            .catch(err => {
                alert(err.data.message);
                window.location = 'index.html';
            });
        },

        getProducts() {
            axios.get(`${url}/api/${apiPath}/admin/products`)
            .then(res => {
                this.products = res.data.products;
            })
            .catch(err => {
                alert(err.data.message);
            })
        },

        getProductDetail(product) {
            this.tempProduct = product;
        }
    },
    mounted() {
        // 取出 cookie 的 token
        const token =  document.cookie.replace(/(?:(?:^|.*;\s*)w2-token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // 加入 header
        axios.defaults.headers.common['Authorization'] = token;
        this.checkLogin();
    }
}

createApp(app).mount('#app');