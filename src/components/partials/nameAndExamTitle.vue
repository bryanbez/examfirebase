<template>
	<div>
		<div class="row">
			<div class="col-sm-12 col-lg-16">
				Exam Title: {{ examInfo.examTitle }}
			</div>
			<div class="col-sm-12 col-lg-16">
				Student Name: {{ profileInfo[0].userInfo.last_name }},
				{{ profileInfo[0].userInfo.first_name }}
				{{ profileInfo[0].userInfo.middle_initial }}
			</div>
		</div>
	</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
	setup() {
		const storeModule = useStore();

		const examInfo = computed(
			() => storeModule.state.examModule.singleExam[0]
		);

		const profileInfo = computed(
			() => storeModule.state.profileModule.profileInfo
		);

		return { examInfo, profileInfo };
	}
};
</script>

<style></style>
