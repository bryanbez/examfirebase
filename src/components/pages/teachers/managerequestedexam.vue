<template>
	<div>
		<div class="container mt-5">
			<div class="row">
				<div class="col col-sm-12 col-lg-6">
					<h3>Manage Student Exams</h3>
				</div>
				<div class="col col-sm-12 col-lg-3">
					<SearchStudent></SearchStudent>
				</div>
				<div class="col col-sm-12 col-lg-3">
					<SortByField></SortByField>
				</div>
			</div>
			<div class="row mt-3">
				<TeacherRequestExamTable></TeacherRequestExamTable>
			</div>
		</div>
	</div>
</template>

<script>
import TeacherRequestExamTable from "../../partials/tables/teacherRequestExam.table";
import SortByField from "../../partials/sortAndSearch/managerequestedexam.sort";
import SearchStudent from "../../partials/sortAndSearch/searchRequestedExam.search";
//import { , onMounted, onUnmounted } from "vue";
export default {
	components: {
		TeacherRequestExamTable,
		SortByField,
		SearchStudent
	}
};
</script>

<style></style>
