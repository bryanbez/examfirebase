<template>
	<div>
		<table class="table mt-3">
			<thead>
				<tr>
					<th>Student Name</th>
					<th>Date Requested</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="singleStudent in getStudentsEnrolled"
					:key="singleStudent.requestId"
				>
					<td>{{ singleStudent.student_name }}</td>
					<td>{{ singleStudent.dateRequested }}</td>
					<td>{{ singleStudent.status }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
	setup() {
		const storeModule = useStore();

		const getStudentsEnrolled = computed(
			() => storeModule.state.examModule.arrStudentsEnrolled
		);

		return {
			getStudentsEnrolled
		};
	}
};
</script>

<style></style>
