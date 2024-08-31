<template>
    <el-card class="box-card">
        <template #header>
            <div class="center">
                <span>Register</span>
            </div>
        </template>
        <el-form
            ref="ruleFormRef"
            label-width="70px"
            :model="fromData"
            :rules="rules"
            style="max-width: 460px"
        >
            <el-form-item label="name" prop="name">
                <el-input v-model="fromData.name" />
            </el-form-item>
            <el-form-item label="email" prop="email">
                <el-input v-model="fromData.email" />
            </el-form-item>
            <el-form-item label="password" prop="password">
                <el-input type="password" v-model="fromData.password" />
            </el-form-item>
            <div class="center">
                <el-button type="primary" @click="register(ruleFormRef)">注册</el-button>
            </div>
        </el-form>
    </el-card>
</template>
    
<script setup lang='ts'>
    import { ElMessage } from 'element-plus'
    import type { FormInstance, FormRules } from 'element-plus'
    import { ref, reactive } from 'vue';
    import { useRouter } from "vue-router";
    import axios from 'axios'
    const router = useRouter();

    const fromData = reactive({
        name: '',
        email: '',
        password: ''
    } as any);
    const rules = reactive({
        name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
        ]
    })
    const ruleFormRef = ref<FormInstance>()

    const register = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.validate((valid, fields) => {
            if (!valid) {
                ElMessage({
                    message: '请先填写注册信息',
                    type: 'warning',
                })
            }else {
                axios.post('api/user/register',fromData).then(res => {
                    if(res.data.data === 'OK') {
                        // 注册成功
                        ElMessage({
                            message: '注册成功',
                            type: 'success',
                        })
                        router.push('/login')
                    }else if(res.data.data === 'registered') {
                        // 已被注册
                        ElMessage({
                            message: '当前邮箱已被注册，请换一个邮箱',
                            type: 'warning',
                        })
                    }else {
                        // 失败
                        ElMessage({
                            message: '注册失败',
                            type: 'error',
                        })
                    }
                })
            }
        })
    }
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