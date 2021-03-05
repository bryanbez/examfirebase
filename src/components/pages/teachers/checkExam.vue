<template>
	<div>
		<div class="container mt-5">
			<div class="row">
				<div class="col col-sm-12 col-lg-9">
					<h3>Checking Exam</h3>
					<p>
						Indentification Type of Questions must confirm if the answer
						is right or wrong.
					</p>
				</div>
				<div class="col col-sm-12 col-lg-1">
					<ModalSubmitCheckedExam
						:requestId="passedRequestId"
					></ModalSubmitCheckedExam>
				</div>
				<div class="col col-sm-12 col-lg-1">
					<button
						type="button"
						class="btn btn-danger"
						@click="backToManageExams()"
					>
						Back
					</button>
				</div>
			</div>

			<hr />
			<NameAndExamTitle></NameAndExamTitle>
			<hr />
			<TableListItemsToCheck :examId="passedExamId"></TableListItemsToCheck>
		</div>
	</div>
</template>

<script>
import ModalSubmitCheckedExam from "../../partials/modals/checkExam.modal";
import TableListItemsToCheck from "../../partials/tables/itemsToBeChecked.table";
import NameAndExamTitle from "../../partials/nameAndExamTitle";
import { useRoute, useRouter } from "vue-router";
export default {
	components: {
		ModalSubmitCheckedExam,
		TableListItemsToCheck,
		NameAndExamTitle
	},
	setup() {
		const route = useRoute();
		const router = useRouter();

		const passedExamId = route.params.examcode;
		const passedRequestId = route.params.request_id;

		function backToManageExams() {
			if (confirm("Are you sure to back to previous page? ")) {
				router.push("/managerequestexam");
			}
		}

		return {
			backToManageExams,
			passedExamId,
			passedRequestId
		};
	}
};
</script>

<style></style>
