<template>
	<div>
		<div class="container mt-3">
			<div class="row">
				<div class="col col-sm-12">
					<h3>Manage Students Enrolled In Exam</h3>
				</div>
			</div>

			<div class="row">
				<div class="col col-sm-12 mt-3">
					<DropdownExamList></DropdownExamList>
				</div>
			</div>
			<div class="row">
				<div class="col col-sm-12">
					<TableStudentList></TableStudentList>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import DropdownExamList from "../../partials/dropdowns/byExamCode.dropdown";
import TableStudentList from "../../partials/tables/studentsEnrolled.table";
export default {
	components: {
		DropdownExamList,
		TableStudentList
	}
};
</script>

<style></style>
