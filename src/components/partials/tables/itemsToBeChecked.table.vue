<template>
	<div>
		<div class="row">
			<div class="col col-sm-12 col-lg-12">
				<table class="table">
					<thead>
						<tr>
							<th>Question</th>
							<th>Exam Answer</th>
							<th>Student Answer</th>
							<th>Result</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="singleItem in getExamAnswers[0].examContent"
							:key="singleItem.questionId"
						>
							<td>{{ singleItem.question }}</td>
							<td>
								{{ singleItem.questionAnswer }}
							</td>
							<td>{{ singleItem.studentAnswer }}</td>

							<td v-if="singleItem.questiontype == 'identification'">
								<input
									type="text"
									class="form-control"
									v-model="singleItem.questionResult"
									placeholder="input if right or wrong"
								/>
							</td>
							<td v-if="singleItem.questiontype != 'identification'">
								{{ singleItem.questionResult }}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
	props: {
		examId: String
	},
	setup(props) {
		const storeModule = useStore();

		const getExamAnswers = computed(
			() => storeModule.state.examModule.singleExamToCompareStudentSide[0]
		);

		onMounted([
			storeModule.dispatch(
				"fetchSingleExamByCode",
				props.examId
			),
			storeModule.dispatch("clearQueryMessage"),
			storeModule.dispatch(
				"getSingleExamInfo",
				getExamAnswers.value[0].exam_id
			)
		]);

		return {
			getExamAnswers
		};
	}
};
</script>

<style></style>
