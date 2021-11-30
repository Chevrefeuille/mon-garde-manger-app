<template>
  <div class="container mx-auto p-4 bg-gray-200 rounded-3xl shadow-lg w-1/3">
    <form
      name="form"
      class="flex flex-col justify-between"
      @submit.prevent="login"
    >
      <label for="email">Email</label>
      <input
        v-model="email"
        type="text"
        name="email"
        class="m-2"
        @blur="emailHandleBlur"
      />
      <span v-if="emailError && emailMeta.touched" class="text-red-500">{{
        emailError
      }}</span>
      <label for="password">Password</label>
      <input
        v-model="password"
        type="password"
        name="password"
        class="m-2"
        @blur="passwordHandleBlur"
      />
      <span v-if="passwordError && passwordMeta.touched" class="text-red-500">{{
        passwordError
      }}</span>
      <button class="form-input" @submit="login">Log in</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '../stores/user.store';
import { useForm, useField } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';

export default defineComponent({
  name: 'Login',
  setup() {
    const schema = toFormValidator(
      zod.object({
        email: zod
          .string()
          .nonempty('This is required')
          .email({ message: 'Must be a valid email' }),
        password: zod
          .string()
          .nonempty('This is required')
          .min(8, { message: 'Too short' }),
      }),
    );

    useForm({
      validationSchema: schema,
    });

    const {
      value: email,
      meta: emailMeta,
      errorMessage: emailError,
      handleBlur: emailHandleBlur,
    } = useField<string>('email');
    const {
      value: password,
      meta: passwordMeta,
      errorMessage: passwordError,
      handleBlur: passwordHandleBlur,
    } = useField<string>('password');

    const userStore = useUserStore();

    function login(): void {
      userStore.login({ email: email.value, password: password.value });
    }

    return {
      email,
      emailMeta,
      emailError,
      emailHandleBlur,
      password,
      passwordMeta,
      passwordError,
      passwordHandleBlur,
      login,
    };
  },
});
</script>

<style lang="scss">
.form-input {
  @apply m-2 py-2 px-4 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75;
}
</style>
