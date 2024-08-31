<template>
    <el-card class="box-card">
        <template #header>
            <div class="center">
                <span>Login</span>
            </div>
        </template>
        <el-form
            label-width="70px"
            :model="loginData"
            style="max-width: 460px"
        >
            <el-form-item label="email">
                <el-input v-model="loginData.email" />
            </el-form-item>
            <el-form-item label="password">
                <el-input type="password" v-model="loginData.password" />
            </el-form-item>
            <div class="center">
                <el-button type="primary" @click="login">登录</el-button>
            </div>
            <div class="right">
                <span class="register" @click="register">暂无账号，点击去注册</span>
            </div>
        </el-form>
    </el-card>
</template>
    
<script setup lang='ts'>
    import { reactive } from 'vue';
    import { useRouter } from "vue-router";
    import axios from 'axios';
    import { ElMessage } from 'element-plus';
    const router = useRouter();

    const loginData = reactive({
        email: '',
        password: ''
    } as any);

    const login = () => {
        axios.get('api/user/login',{ params: loginData}).then(res => {
            if(res.data.data === 'OK') {
                // 注册成功
                ElMessage({
                    message: '登录成功',
                    type: 'success',
                })
                const user = res.data.data.user
                console.log(user,'拿到用户信息')
            }else if(res.data.data === 'not') {
                // 已被注册
                ElMessage({
                    message: '用户不存在',
                    type: 'warning',
                })
            }else {
                // 失败
                ElMessage({
                    message: '密码错误',
                    type: 'error',
                })
            }
        })
    }

    const register = () => {
        router.push('/register');
    };
</script>
    
<style scoped>
    .box-card {
        width: 480px;
        margin: 0 auto;
        margin-top: 100px
    }
    .center {
        text-align: center;
    }
    .right {
        text-align: right;
    }
    .register {
        font-size: 12px;
        color: #838383;
        cursor: pointer;
    }
</style>