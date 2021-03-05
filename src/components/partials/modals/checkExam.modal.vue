<template>
	<div>
		<button
			type="button"
			class="btn btn-primary"
			data-bs-toggle="modal"
			data-bs-target="#modalSubmitExamResult"
			@click="fetchTotalScores()"
		>
			Submit
		</button>

		<teleport to="body">
			<div
				class="modal fade"
				id="modalSubmitExamResult"
				tabindex="-1"
				aria-labelledby="modalSubmitExamResult"
				aria-hidden="true"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
			>
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="modalSubmitExamResultLabel">
								Submit Result
							</h5>
							<button
								type="button"
								class="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>

						<div class="modal-body">
							<div
								class="alert alert-secondary"
								v-if="getSavedExamResultMsg != ''"
							>
								{{ getSavedExamResultMsg }}
							</div>
							<br />
							<p>Please Check if the result is correct</p>

							<NameAndExamTitle></NameAndExamTitle>
							<hr />

							<p>Correct Items: {{ getScoresInfo.right_answers }}</p>
							<hr />
							<p>Wrong Items: {{ getScoresInfo.wrong_answers }}</p>
							<hr />
							<p>Total Items: {{ getScoresInfo.total_items }}</p>
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
							<button
								type="button"
								class="btn btn-primary"
								@click="saveExamResultOnFb()"
								:disabled="disableSubmit == 1"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</teleport>
	</div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import NameAndExamTitle from "../../partials/nameAndExamTitle";
export default {
	components: {
		NameAndExamTitle
	},
	props: {
		requestId: String
	},
	setup(props) {
		const storeModule = useStore();

		let disableSubmit = ref(0);

		const getExamAnswers = computed(
			() => storeModule.state.examModule.singleExamToCompareStudentSide[0]
		);

		const getScoresInfo = computed(
			() => storeModule.state.examModule.listTotalScoreOfStudent
		);

		const getSavedExamResultMsg = computed(
			() => storeModule.state.examModule.queryMessage
		);

		function fetchTotalScores() {
			storeModule.dispatch("getTotalScores", getExamAnswers.value);
		}

		function saveExamResultOnFb() {
			let examResultInfo = {
				request_exam_id: props.requestId,
				total_items: getScoresInfo.value.total_items,
				correct_items: getScoresInfo.value.right_answers,
				wrong_items: getScoresInfo.value.wrong_answers
			};
			storeModule.dispatch("saveExamResult", examResultInfo);
			disableSubmit.value = 1;
		}

		return {
			getExamAnswers,
			fetchTotalScores,
			getScoresInfo,
			getSavedExamResultMsg,
			saveExamResultOnFb,
			disableSubmit
		};
	}
};
</script>

<style></style>
