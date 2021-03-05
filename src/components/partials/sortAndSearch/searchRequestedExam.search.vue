<template>
	<div>
		<div class="row">
			<div class="col col-sm-12">
				<p>Search Student</p>
			</div>
			<div class="col col-sm-12">
				<input
					type="text"
					v-model="searchText"
					@keyup="searchStudent()"
					class="form-control"
					readonly
					placeholder="On hold, use Algolia"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
	setup() {
		const storeModule = useStore();

		let searchText = ref();

		//const getEmail = computed(() => storeModule.state.authModule.user_email);

		function searchStudent() {
			storeModule.dispatch("searchStudent", searchText.value);
		}

		return { searchText, searchStudent };
	}
};
</script>

<style></style>
