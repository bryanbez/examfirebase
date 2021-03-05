<template>
	<div>
		<div class="container mt-5">
			<div class="row">
				<div class="col col-sm-12 col-lg-10">
					<h3>Your Exams</h3>
				</div>
				<div class="col col-sm-12 col-lg-2">
					<ModalSearchExam></ModalSearchExam>
				</div>
			</div>
			<div class="row">
				<StudentExamList></StudentExamList>
			</div>
		</div>
	</div>
</template>

<script>
import StudentExamList from "../../partials/tables/studentExamList.table";
import ModalSearchExam from "../../partials/modals/requestExam.modal";

export default {
	components: {
		StudentExamList,
		ModalSearchExam
	},
	setup() {
		// function showGrades(requestId) {
		// 	let nameAndReqId = {
		// 		name:
		// 			profileInfo.value[0].userInfo.last_name +
		// 			", " +
		// 			profileInfo.value[0].userInfo.first_name +
		// 			" " +
		// 			profileInfo.value[0].userInfo.middle_initial,
		// 		requestId: requestId
		// 	};
		// 	//console.log(nameAndReqId);
		// 	storeModule.dispatch("fetchExamResultByReqId", nameAndReqId);
		// }
	}
};
</script>

<style></style>
