<template>
	<div>
		<div class="container mt-4">
			<div class="row" v-if="getUserType == 'student'">
				<StudentHomepage></StudentHomepage>
			</div>
			<div class="row" v-if="getUserType == 'teacher'">
				<TeacherHomepage></TeacherHomepage>
			</div>
		</div>
	</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import StudentHomepage from "../pages/students/home";
import TeacherHomepage from "../pages/teachers/home";
export default {
	components: {
		StudentHomepage,
		TeacherHomepage
	},
	setup() {
		const storeModule = useStore();

		const getUserType = computed(
			() => storeModule.state.authModule.user_type
		);

		return {
			getUserType
		};
	}
};
</script>

<style></style>
