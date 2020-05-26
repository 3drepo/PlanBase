<template>
	<div class="pb-home-container">
		<QuestionsList />
	</div>
</template>

<script>
// Components
import QuestionsList from '@/components/QuestionsList';

export default {
	name: 'home',
	components: {
		QuestionsList,
	},
};
</script>

<style lang="scss" scoped>
.pb-home-container {
	height: 100%;
	width: 100%;
	background-image: url('../assets/images/3drepo_bg.jpg');
	background-size: cover;
	background-position: center;
}
</style>
