<template>
  <div class="container mx-auto p-4 bg-gray-200 rounded-3xl shadow-lg w-1/3">
    <form
      name="form"
      class="flex flex-col justify-between"
      @submit.prevent="signin"
    >
      <label for="email">Name</label>
      <input
        v-model="name"
        type="text"
        name="name"
        class="m-2"
        @blur="nameHandlerBlur"
      />
      <span v-if="nameError && nameMeta.touched" class="text-red-500">{{
        nameError
      }}</span>
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
      <label for="passwordConfirmation">Password Confirmation</label>
      <input
        v-model="passwordConfirmation"
        type="password"
        name="passwordConfirmation"
        class="m-2"
        @blur="passwordConfirmationHandleBlur"
      />
      <span
        v-if="passwordConfirmationError && passwordConfirmationMeta.touched"
        class="text-red-500"
        >{{ passwordConfirmationError }}</span
      >
      <button class="form-input" @submit="signin">Log in</button>
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
  name: 'Signin',
  setup() {
    const schema = toFormValidator(
      zod
        .object({
          name: zod.string().nonempty('This is required'),
          email: zod
            .string()
            .nonempty('This is required')
            .email({ message: 'Must be a valid email' }),
          password: zod
            .string()
            .nonempty('This is required')
            .min(8, { message: 'Too short' }),
          passwordConfirmation: zod.string().nonempty('This is required'),
        })
        .refine((data) => data.password === data.passwordConfirmation, {
          message: 'Passwords do not match',
          path: ['passwordConfirmation'],
        }),
    );

    useForm({
      validationSchema: schema,
    });

    const {
      value: name,
      meta: nameMeta,
      errorMessage: nameError,
      handleBlur: nameHandleBlur,
    } = useField<string>('name');
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
    const {
      value: passwordConfirmation,
      meta: passwordConfirmationMeta,
      errorMessage: passwordConfirmationError,
      handleBlur: passwordConfirmationHandleBlur,
    } = useField<string>('passwordConfirmation');

    const userStore = useUserStore();

    function signin(): void {
      userStore.signin({
        name: name.value,
        email: email.value,
        password: password.value,
        passwordConfirmation: passwordConfirmation.value,
      });
    }

    return {
      name,
      nameMeta,
      nameError,
      nameHandleBlur,
      email,
      emailMeta,
      emailError,
      emailHandleBlur,
      password,
      passwordMeta,
      passwordError,
      passwordHandleBlur,
      passwordConfirmation,
      passwordConfirmationMeta,
      passwordConfirmationError,
      passwordConfirmationHandleBlur,
      signin,
    };
  },
});
</script>

<style lang="scss">
.form-input {
  @apply m-2 py-2 px-4 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75;
}
</style>
