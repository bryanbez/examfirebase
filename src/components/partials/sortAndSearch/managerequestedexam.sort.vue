<template>
	<div>
		<div class="row">
			<div class="col col-sm-12">
				<p>Sort By Status</p>
			</div>
			<div class="col-col-sm-12">
				<select
					class="form-control"
					v-model="sortByTextBox"
					@change="sortByField"
				>
					<option value="" selected disabled>Select Status...</option>
					<option value="pending">PENDING</option>
					<option value="accepted">ACCEPTED</option>
					<option value="checking">CHECKING</option>
					<option value="checked">CHECKED</option>
					<option value="resetSort">RESET SORT</option>
				</select>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
	setup() {
		const storeModule = useStore();

		let sortByTextBox = ref("");

		const getEmail = computed(() => storeModule.state.authModule.user_email);

		function sortByField() {
			let queryArrInFetch = {
				field: "teacher_email",
				value: getEmail.value,
				sortBy: sortByTextBox.value
			};
			storeModule.dispatch("sortByFieldAction", queryArrInFetch);
		}

		return { sortByTextBox, sortByField };
	}
};
</script>

<style></style>
