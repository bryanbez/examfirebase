<template>
	<div>
		<h5>Select Exam Title</h5>
		<select
			class="form-control"
			v-model="selectedExamCode"
			@change="fetchStudentsByExamCode()"
		>
			<option
				v-for="singleExam in fetchExamInfo"
				:key="singleExam.id"
				:value="singleExam.userInfo.exam_code"
			>
				{{ singleExam.userInfo.examTitle }}
			</option>
		</select>
	</div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
export default {
	setup() {
		const storeModule = useStore();

		let selectedExamCode = ref("");

		const fetchExamInfo = computed(
			() => storeModule.state.examModule.examList
		);

		const getEmail = computed(() => storeModule.state.authModule.user_email);

		let queryArrInFetch = {
			field: "teacher_email",
			value: getEmail.value
		};

		function fetchStudentsByExamCode() {
			storeModule.dispatch(
				"fetchStudentsEnrolledInSpecificExam",
				selectedExamCode.value
			);
		}

		onMounted([
			storeModule.dispatch("fetchAllExamsInTeacher", queryArrInFetch)
		]);

		return {
			selectedExamCode,
			fetchExamInfo,
			fetchStudentsByExamCode
		};
	}
};
</script>

<style></style>
