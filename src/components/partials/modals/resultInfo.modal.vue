<template>
	<div>
		<button
			class="btn btn-outline-success"
			data-bs-toggle="modal"
			data-bs-target="#modalShowExamResult"
			@click="showGrades()"
		>
			Check Grade
		</button>

		<!-- modal -->
		<teleport to="body">
			<div
				class="modal fade"
				id="modalShowExamResult"
				tabindex="-1"
				aria-labelledby="modalSubmitExamResult"
				aria-hidden="true"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
			>
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="modalShowExamResultLabel">
								Grade Info
							</h5>
							<button
								type="button"
								class="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>

						<div
							class="modal-body"
							v-if="fetchGradesOfRequestedExam.length != 0"
						>
							<p>
								Name:
								{{ fetchGradesOfRequestedExam[1].stud_name }}
							</p>
							<hr />
							<p>
								Correct Items:
								{{ fetchGradesOfRequestedExam[0].correct_items }}
							</p>
							<hr />
							<p>
								Wrong Items:
								{{ fetchGradesOfRequestedExam[0].wrong_items }}
							</p>
							<hr />
							<p>
								Total items:
								{{ fetchGradesOfRequestedExam[0].total_items }}
							</p>
							<hr />
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

		<!-- end modal -->
	</div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
	props: {
		requestInfo: Object
	},
	setup(props) {
		const storeModule = useStore();

		const fetchGradesOfRequestedExam = computed(
			() => storeModule.state.examModule.listSingleExamResult
		);

		function showGrades() {
			let nameAndReqId = {
				name: props.requestInfo.name,
				requestId: props.requestInfo.id
			};
			storeModule.dispatch("fetchExamResultByReqId", nameAndReqId);
		}

		return { fetchGradesOfRequestedExam, showGrades };
	}
};
</script>

<style></style>
