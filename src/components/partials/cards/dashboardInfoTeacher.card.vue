<template>
	<div>
		<div class="container">
			<div class="row">
				<div class="col col-sm-12 col-lg-6">
					<div class="card bg-secondary">
						<div class="card-body text-white">
							<h5>Total Student Enrolled</h5>
							<div class="container" style="font-size: 4em;">
								<i class="fas fa-user"></i>
								{{ countOfEnrolledStudent }}
							</div>
						</div>
					</div>
				</div>
				<div class="col col-sm-12 col-lg-6">
					<div class="card bg-secondary">
						<div class="card-body text-white">
							<h5>Total Exams Created</h5>
							<div class="container" style="font-size: 4em;">
								<i class="fas fa-file-alt"></i> {{ getAllExamCount }}
							</div>
						</div>
					</div>
				</div>
			</div>
			<br />
			<div class="row">
				<div class="col col-sm-12 col-lg-6">
					<div class="card bg-secondary">
						<div class="card-body text-white">
							<h5>Pending Exam Request</h5>
							<div class="container" style="font-size: 4em;">
								<i class="fas fa-user"></i> {{ countOfPendingRequest }}
							</div>
						</div>
					</div>
				</div>
				<div class="col col-sm-12 col-lg-6">
					<div class="card bg-secondary">
						<div class="card-body text-white">
							<h5>Exam/s To Check</h5>
							<div class="container" style="font-size: 4em;">
								<i class="fas fa-user-edit"></i>
								{{ countOfToCheckExam }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
export default {
	setup() {
		const storeModule = useStore();

		const countOfEnrolledStudent = computed(() => {
			if (!storeModule.state.examModule.studentsEnrolledCount) {
				return;
			} else {
				return storeModule.state.examModule.studentsEnrolledCount.filter(
					(item, index) =>
						storeModule.state.examModule.studentsEnrolledCount.indexOf(
							item
						) === index
				).length;
			}
		});

		const getAllExamCount = computed(
			() => storeModule.state.examModule.examList.length
		);

		const studentsPerExamCode = computed(
			() => storeModule.state.examModule.studentsEnrollPerExamCode
		);

		const countOfPendingRequest = computed(() => {
			return storeModule.state.examModule.pendingRequestCount.length;
		});

		const countOfToCheckExam = computed(
			() => storeModule.state.examModule.toCheckExamCount.length
		);

		const getEmail = computed(() => storeModule.state.authModule.user_email);

		onMounted([
			storeModule.dispatch("getStudentCountEnrolled", getEmail.value),
			storeModule.dispatch("fetchAllExamsInTeacher", {
				field: "teacher_email",
				value: getEmail.value
			}),
			storeModule.dispatch("fetchAllPendingRequest", {
				field: "teacher_email",
				value: getEmail.value,
				sortBy: "pending"
			}),
			storeModule.dispatch("fetchAllToCheckExam", {
				field: "teacher_email",
				value: getEmail.value,
				sortBy: "checking"
			})
		]);

		return {
			countOfEnrolledStudent,
			getAllExamCount,
			studentsPerExamCode,
			countOfPendingRequest,
			countOfToCheckExam
		};
	}
};
</script>

<style></style>
