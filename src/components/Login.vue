<template>
	<div class="pb-card-form">
		<div class="p-6 pb-intro-section">
			<h3 class="pb-3">Welcome to the Royal Victoria Docks Community Engagement Portal</h3>
			<p>
				To continue please provide your email address and postcode. Your information will not be used for anything other than contacting you again in the future.
			</p>
			<a class="text-xs" href="https://www.3drepo.io/terms" target="_blank">Terms &amp; Conditions</a>
			<span class="text-xs ml-1">and</span>
			<a class="text-xs ml-1" href="https://www.3drepo.io/privacy" target="_blank">Privacy</a>
		</div>
		<div class="pb-form-section">
			<v-form ref="form" v-model="valid" :lazy-validation="lazy" @submit="handleContinue($event)">
				<div class="p-6 pb-input-container">
					<v-text-field class="pb-2" v-model="email" :rules="emailRules" label="You email address" placeholder="e.g. sally@gmail.com" required></v-text-field>

					<v-text-field v-model="postcode" :rules="postcodeRules" label="Your postcode" placeholder="e.g. SW18" required></v-text-field>
				</div>

				<div class="px-3 py-3 flex justify-end pb-button-bar">
					<v-btn text color="success" type="submit">
						Continue
					</v-btn>
				</div>
			</v-form>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import axios from 'axios';

// TODO: Replace this key with a Planbase registered one after testing
Vue.use(VueReCaptcha, { siteKey: '6LdCmPAUAAAAAC8aFpdhGcMk30OkXYhfJKceH55B' });

export default Vue.extend({
	name: 'Login',

	data: () => ({
		email: 'sally@gmail.com',
		postcode: 'SW18',
		emailRules: [(v: any) => !!v || 'E-mail is required', (v: any) => /.+@.+\..+/.test(v) || 'Please provide a valid email'],
		postcodeRules: [(v: any) => !!v || 'Postcode is required', (v: any) => /[a-z, A-Z]{1,2}[0-9]{1,2}$/.test(v) || 'Please provide a valid postcode'],
		valid: true,
		lazy: true,
	}),

	methods: {
		async handleContinue(event: any) {
			event.preventDefault();
			// (optional) Wait until recaptcha has been loaded.
			await this.$recaptchaLoaded().catch(err => console.log(err));

			const email = this.email;
			const postcode = this.postcode;

			// Execute reCAPTCHA with action "login".
			const jwt = await this.$recaptcha('login').catch(err => console.log(err));

			if (!jwt) return;

			const response = await this.$store.dispatch('verifyRecaptcha', {
				jwt,
				email,
				postcode,
			});

			// const response = await axios({
			// 	method: 'POST',
			// 	url: 'http://localhost:4000/recaptcha',
			// 	// url: 'https://0zi7k1xq57.execute-api.eu-west-1.amazonaws.com/production/recaptcha',
			// 	headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			// 	data: {
			// 		jwt,
			// 		email,
			// 		postcode,
			// 	},
			// }).catch(err => console.log(err));

			console.log(response);

			if (response && response.data.success && email && postcode) {
				const user = { email, postcode, jwt: response.data.jwt };
				// Vue.$cookies.set('user', user, '7d', '', '', true, 'Lax');
				Vue.$cookies.set('user', user);
				this.$store.commit('setUser', user);
				await this.$store.dispatch('addToList', { user, jwt: response.data.jwt }).catch(err => console.log(err));
				this.$router.push({ name: 'overview' });
			}
		},
	},
});
</script>

<style lang="scss" scoped>
.pb-card-form {
	max-width: 400px;
	background-color: #fff;
	box-shadow: 1px 1px 3px 0 rgba(51, 51, 51, 0.5);
}

.pb-intro-section {
	border-bottom: 1px solid #eee;
}

.pb-input-container {
	border-bottom: 1px solid #eee;
}
</style>
