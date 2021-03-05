<template>
	<div>
		<div class="container mt-4">
			<div class="row">
				<div class="col col-sm-12 col-lg-10">
					<h3>Manage Exams</h3>
				</div>
				<div class="col col-sm-12 col-lg-2">
					<router-link to="/createexam" class="btn btn-outline-primary">
						Create Exam
					</router-link>
				</div>
			</div>
			<br />
			<div class="row">
				<TableExamList></TableExamList>
			</div>
		</div>
	</div>
</template>

<script>
import TableExamList from "../../partials/tables/teacherExamList.table";
export default {
	components: {
		TableExamList
	}
};
</script>

<style></style>
