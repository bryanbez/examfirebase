<template>
	<div>
		<div class="container">
			<div class="row">
				<!-- <h4>Welcome, {{ getProfileInfo }}</h4> -->
			</div>
			<div class="row mt-3">
				<div class="col-col-sm-12">
					<TeacherDashboardCard></TeacherDashboardCard>
				</div>
				<div class="col-col-sm-12 mt-5">
					<TeacherTodayRequest></TeacherTodayRequest>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import { computed } from "vue";
// import { useStore } from "vuex";
import TeacherDashboardCard from "../../partials/cards/dashboardInfoTeacher.card";
import TeacherTodayRequest from "../../partials/cards/teacherTodayRequest";
export default {
	components: {
		TeacherDashboardCard,
		TeacherTodayRequest
	},
	setup() {
		// const storeModule = useStore();
		// const getProfileInfo = computed(
		// 	() => storeModule.state.profileModule.profileInfo[0].userInfo.username
		// );
		// return { getProfileInfo };
	}
};
</script>

<style></style>
