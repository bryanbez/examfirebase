<template>
	<div class="col col-sm-12">
		<div v-show="examMessage != ''" class="alert alert-success">
			{{ examMessage }}
		</div>
		<table class="table" v-show="fetchListOfRequestedExam != 0">
			<thead>
				<tr>
					<th>Date Requested</th>
					<th>Exam Title</th>
					<th>Status</th>
					<th>Options</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="singleExam in fetchListOfRequestedExam"
					:key="singleExam.requestID"
				>
					<td>{{ singleExam.dateRequested }}</td>
					<td>{{ singleExam.examTitle }}</td>
					<td>{{ singleExam.status }}</td>
					<td v-if="singleExam.status == 'checked'">
						<ModalShowStudentGrade
							:requestInfo="{
								id: singleExam.requestID,
								name:
									profileInfo[0].userInfo.last_name +
									', ' +
									profileInfo[0].userInfo.first_name +
									' ' +
									profileInfo[0].userInfo.middle_initial +
									'.'
							}"
						/>
					</td>
					<td v-show="singleExam.status == 'pending'">
						<button
							class="btn btn-outline-danger"
							@click="cancelExamRequest(singleExam.examCode)"
						>
							Cancel Request
						</button>
					</td>
					<td v-show="singleExam.status == 'accepted'">
						<router-link
							:to="{
								name: 'TakeExam',
								params: { examcode: singleExam.examCode }
							}"
							class="btn btn-outline-success"
						>
							Take Exam
						</router-link>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="col col-sm-12" v-show="fetchListOfRequestedExam.length == 0">
			<h3 class="alert alert-secondary text-center">
				No Exam Requested
			</h3>
		</div>
	</div>
</template>

<script>
import { computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import ModalShowStudentGrade from "../../partials/modals/resultInfo.modal";
export default {
	components: {
		ModalShowStudentGrade
	},
	setup() {
		const storeModule = useStore();

		const fetchListOfRequestedExam = computed(
			() => storeModule.state.examModule.listOfRequestedExam
		);

		const profileInfo = computed(
			() => storeModule.state.profileModule.profileInfo
		);

		const examMessage = computed(
			() => storeModule.state.examModule.queryMessage
		);

		function cancelExamRequest(request_id) {
			let toRemoveRequest = {
				requestExamCode: request_id,
				student_id: profileInfo.value[0].id
			};

			if (confirm("Are you sure to cancel this exam request? ")) {
				storeModule.dispatch("cancelExamRequestAction", toRemoveRequest);
			}
		}

		onMounted([
			storeModule.dispatch(
				"fetchAllRequestedExamByStudentId",
				profileInfo.value[0].id
			)
		]);

		onUnmounted([storeModule.dispatch("emptyListExams", "")]);

		return {
			fetchListOfRequestedExam,
			profileInfo,
			examMessage,
			cancelExamRequest
		};
	}
};
</script>

<style></style>
