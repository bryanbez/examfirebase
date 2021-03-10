<template>
	<div>
		<div class="container">
			<div class="row">
				<div class="col col-sm-12">
					<h4>Today Exam Request/s</h4>
				</div>
				<div class="col col-sm-12">
					<div
						class="card mb-2"
						v-for="singleRequestExam in getRequestExamToday"
						:key="singleRequestExam.student_id"
					>
						<div class="card-body">
							<h5 class="card-title">
								{{ singleRequestExam.student_name }}
							</h5>
							<p class="card-text">
								Request Date and Time
								{{ singleRequestExam.dateRequested }}
								{{ singleRequestExam.timeRequested }}
							</p>
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

		const getRequestExamToday = computed(
			() => storeModule.state.examModule.requestToday
		);

		const dateNow = new Date();
		let todayDate =
			dateNow.getMonth() +
			1 +
			"-" +
			dateNow.getDate() +
			"-" +
			dateNow.getFullYear();

		onMounted([
			storeModule.dispatch("fetchRequestToday", {
				field: "dateRequested",
				value: todayDate
			})
		]);

		return {
			getRequestExamToday
		};
	}
};
</script>

<style></style>
