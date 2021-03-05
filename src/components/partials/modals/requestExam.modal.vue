<template>
	<div>
		<button
			class="btn btn-outline-primary"
			data-bs-toggle="modal"
			data-bs-target="#requestExamModal"
		>
			Request Exam
		</button>
		<teleport to="body">
			<div class="modal" tabindex="-1" id="requestExamModal">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">Request Exam</h5>
							<button
								type="button"
								class="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div class="modal-body">
							<label for="">Input Exam Code</label>
							<input
								type="text"
								class="form-control"
								@keyup="searchExamCode()"
								v-model="examCodeToRequest"
							/>
							<br />
							<div class="alert alert-info" v-show="requestExamMessage">
								{{ requestExamMessage }}
							</div>
							<div class="card">
								<div
									class="card-body"
									v-for="examResult in searchCodeResult"
									:key="examResult.exam_id"
								>
									<h5>Exam Title: {{ examResult.examTitle }}</h5>
									<hr />
									<p>Date Created: {{ examResult.dateCreated }}</p>
									<hr />
									<p>
										Teacher Email:
										{{ examResult.teacher_email }}
									</p>
									<hr />
									<button
										v-show="requestExamStatus == 'notfound'"
										class="btn btn-outline-success"
										@click="requestExam()"
									>
										Request
									</button>
									<div
										class="alert alert-secondary"
										v-show="requestExamStatus == 'pending'"
									>
										Status: {{ requestExamStatus }}
									</div>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button
								type="button"
								class="btn btn-secondary"
								data-bs-dismiss="modal"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</teleport>
	</div>
</template>

<script>
import { ref, computed, onUnmounted } from "vue";
import { useStore } from "vuex";
export default {
	setup() {
		const storeModule = useStore();

		let examCodeToRequest = ref("");

		let searchCodeResult = computed(
			() => storeModule.state.examModule.searchResult
		);

		const requestExamMessage = computed(
			() => storeModule.state.examModule.requestExamMsg
		);

		const requestExamStatus = computed(
			() => storeModule.state.examModule.requestStatus
		);

		const profileInfo = computed(
			() => storeModule.state.profileModule.profileInfo
		);

		function searchExamCode() {
			let searchQuery = {
				exam_code: examCodeToRequest.value,
				student_id: profileInfo.value[0].id
			};
			storeModule.dispatch("getStatusOfRequestExam", searchQuery);
			storeModule.dispatch("searchExamCodeAction", examCodeToRequest.value);
		}

		function requestExam() {
			let dateTimeNow = new Date();
			let requestExamInfo = ref({
				dateRequested:
					dateTimeNow.getMonth() +
					1 +
					"-" +
					dateTimeNow.getDate() +
					"-" +
					dateTimeNow.getFullYear(),
				timeRequested:
					dateTimeNow.getHours() +
					":" +
					dateTimeNow.getMinutes() +
					":" +
					dateTimeNow.getSeconds(),
				exam_code: examCodeToRequest.value,
				status_of_request: "pending",
				student_id: profileInfo.value[0].id
			});
			storeModule.dispatch("requestToTakeExam", requestExamInfo.value);
		}

		onUnmounted([
			storeModule.dispatch("searchExamCodeAction", "")
			//storeModule.dispatch("emptyListExams", "")
		]);

		return {
			requestExam,
			searchExamCode,
			requestExamStatus,
			requestExamMessage,
			searchCodeResult,
			examCodeToRequest
		};
	}
};
</script>

<style></style>
