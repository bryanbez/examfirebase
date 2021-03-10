import {
	loadExams,
	fetchSingleExam,
	updateExam,
	deleteExam,
	loadExamsByTeacher,
	searchExamCode,
	requestExamToTeacher,
	getStatusOfRequestExam,
	fetchRequestedExamFb,
	removeExamRequestFb,
	loadStudentsByExamCodeOfTeacher,
	acceptExamRequestFb,
	loadExamsInStudent,
	saveExamTaken,
	fetchSingleExamByExamId,
	fetchStudentExamTakenById,
	saveExamResultFb,
	fetchExamResultByRequestId,
	searchStudent,
	fetchStudentsEnrolledFb,
	fetchCountOfEnrolledStudents,
	countPendingRequest,
	countToCheckRequest,
	fetchRequestTodayFb
} from "@/firebase";
import router from "../../routes/routes";

const getDefaultState = () => {
	return {
		questionRows: [{}],
		examList: [],
		examListStudent: [],
		singleExam: [],
		queryMessage: "",
		searchResult: [],
		requestExamMsg: "",
		requestStatus: "",
		listOfRequestedExam: [],
		studentsEnrollPerExamCode: [],
		singleExamToCompareStudentSide: [],
		listTotalScoreOfStudent: [],
		listSingleExamResult: [],
		arrStudentsEnrolled: [],
		studentsEnrolledCount: "",
		pendingRequestCount: "",
		toCheckExamCount: "",
		requestToday: []
	};
};

const state = getDefaultState();

const getters = {};

const actions = {
	addQuestion({ commit }, arrayQuestionInfo) {
		commit("ADD_QUESTION_INFO", arrayQuestionInfo);
	},
	removeQuestionNumber({ state }, questionNumber) {
		for (var i = 0; i < state.questionRows.length; i++) {
			if (state.questionRows[i].uniqueId == questionNumber) {
				state.questionRows.splice(i, 1);
			}
		}
	},
	async fetchAllExams({ commit }) {
		let fetchListFromDb = await loadExams();
		commit("PUSH_EXAM_LIST_ARR", fetchListFromDb);
	},
	async fetchAllExamsInTeacher({ commit }, queryArr) {
		let fetchExamListByTeacherEmail = await loadExamsByTeacher(queryArr);
		console.log(fetchExamListByTeacherEmail);
		commit("PUSH_EXAM_LIST_ARR", fetchExamListByTeacherEmail.value);
	},
	async fetchAllExamsInStudent({ commit }, queryArr) {
		// current
		let fetchExamListByTeacherEmail = await loadExamsInStudent(queryArr);
		let fetchRequestedExam = await fetchRequestedExamFb(queryArr);
		let arrExamInfoAndRequestInfo = {
			exam_info: fetchExamListByTeacherEmail.value,
			request_info: fetchRequestedExam
		};

		commit("PUSH_EXAM_LIST_ARR_IN_STUDENT", arrExamInfoAndRequestInfo);
	},
	async getSingleExamInfo({ commit }, docId) {
		let singleExamInfo = await fetchSingleExam(docId);
		commit("PUSH_SINGLE_EXAM_INFO", singleExamInfo);
	},
	async updateExam({ commit }, updatedExamAndDocid) {
		let updateExamInfo = await updateExam(updatedExamAndDocid);
		commit("EXAM_MESSAGE", updateExamInfo);
	},
	async removeExam({ commit }, docid) {
		let deleteExamInfo = await deleteExam(docid);
		commit("EXAM_MESSAGE", deleteExamInfo);
	},
	async searchExamCodeAction({ commit }, examCode) {
		let fetchResultOfSearchedCode = await searchExamCode(examCode);

		commit("PUT_SEARCH_RESULT", fetchResultOfSearchedCode);
	},
	async requestToTakeExam({ commit, dispatch }, exam_info) {
		let requestExam = await requestExamToTeacher(exam_info);
		dispatch("fetchAllRequestedExamByStudentId", exam_info.student_id);
		dispatch("getStatusOfRequestExam", exam_info);
		commit("REQUEST_MESSAGE", requestExam);
		setTimeout(() => {
			commit("REQUEST_MESSAGE", "");
		}, 3000);
	},
	async getStatusOfRequestExam({ commit }, requestInfo) {
		let getRequestInfo = await getStatusOfRequestExam(requestInfo);
		commit("STATUS_OF_REQUEST", getRequestInfo);
	},
	async fetchAllRequestedExamByStudentId({ commit }, student_id) {
		let listOfExamsRequested = [];
		let studentIdQuery = {
			field: "student_id",
			value: student_id
		};
		let fetchAllRequestedExam = await fetchRequestedExamFb(studentIdQuery);
		if (fetchAllRequestedExam == "") {
			commit("PUT_ALL_REQUESTED_EXAM_BY_STUDENT_ID", "");
		} else {
			fetchAllRequestedExam.forEach(value => {
				searchExamCode(value.examCode).then(result => {
					listOfExamsRequested.push({
						requestID: value.requestID,
						examCode: value.examCode,
						examTitle: result[0].examTitle,
						dateRequested: value.dateRequested,
						status: value.status_of_request
					});
				});
			});
		}

		setTimeout(() => {
			commit("PUT_ALL_REQUESTED_EXAM_BY_STUDENT_ID", listOfExamsRequested);
		}, 3000);
	},
	async cancelExamRequestAction({ commit, dispatch }, request_info) {
		await removeExamRequestFb(request_info.requestExamCode).then(() => {
			commit("EXAM_MESSAGE", "Request Exam Cancelled");

			setTimeout(() => {
				dispatch(
					"fetchAllRequestedExamByStudentId",
					request_info.student_id
				);
				commit("EXAM_MESSAGE", "");
			}, 3000);
		});
	},
	async acceptRequestToTakeExam({ commit }, requestId) {
		let acceptExam = await acceptExamRequestFb(requestId);
		commit("EXAM_MESSAGE", acceptExam);
		setTimeout(() => {
			commit("EXAM_MESSAGE", "");
		}, 3000);
	},
	async submitExamToTeacher({ commit }, examContent) {
		let submitExamMessage = await saveExamTaken(examContent);
		commit("EXAM_MESSAGE", submitExamMessage);
		setTimeout(() => {
			commit("EXAM_MESSAGE", "");
			router.push("/exams");
		}, 3000);
	},
	async fetchSingleExamByCode({ commit }, examcode) {
		//commit("SINGLE_EXAM_INFO_TO_COMPARE_STUDENT_SIDE", "");
		let fetchSingleExamId = await fetchSingleExamByExamId(examcode);
		let fetchExamTakenInfoById = await fetchStudentExamTakenById(
			fetchSingleExamId
		);
		commit(
			"SINGLE_EXAM_INFO_TO_COMPARE_STUDENT_SIDE",
			fetchExamTakenInfoById
		);
	},
	async getTotalScores({ commit }, examInfo) {
		let resultInfo = {
			total_items: 0,
			right_answers: 0,
			wrong_answers: 0
		};
		examInfo[0].examContent.forEach(element => {
			if (element.questionResult != "") {
				resultInfo.total_items++;
			}
			if (element.questionResult == "right") {
				resultInfo.right_answers++;
			}
			if (element.questionResult == "wrong") {
				resultInfo.wrong_answers++;
			}
		});
		commit("SET_SCORES_INFO", resultInfo);
	},
	async saveExamResult({ commit }, examResultInfo) {
		const examResult = await saveExamResultFb(examResultInfo);
		commit("EXAM_MESSAGE", examResult);
		setTimeout(() => {
			commit("EXAM_MESSAGE", "");
		}, 3000);
	},
	async fetchExamResultByReqId({ commit }, nameAndReqId) {
		let fetchResult = await fetchExamResultByRequestId(nameAndReqId);
		commit("PUT_SINGLE_RESULT_INFO", fetchResult);
	},
	async fetchAllExamsByExamCode({ commit }, queryArr) {
		let fetchExamListByCode = await loadStudentsByExamCodeOfTeacher(queryArr);
		commit("PUSH_EXAM_LIST_BY_EXAMCODE_ARR", fetchExamListByCode);
	},
	async sortByFieldAction({ commit }, queryArr) {
		let getSortResult = await loadStudentsByExamCodeOfTeacher(queryArr);
		commit("PUSH_EXAM_LIST_BY_EXAMCODE_ARR", getSortResult);
	},
	async searchStudent({ commit }, searchKeyword) {
		let getSortResult = await searchStudent(searchKeyword);
		commit("PUSH_EXAM_LIST_BY_EXAMCODE_ARR", getSortResult);
	},
	async fetchStudentsEnrolledInSpecificExam({ commit }, examCode) {
		let getStudentsEnrolled = await fetchStudentsEnrolledFb(examCode);
		commit("PUSH_STUDENTS_ENROLLED", getStudentsEnrolled);
	},
	// for dashboard
	async getStudentCountEnrolled({ commit }, teacherEmail) {
		let getCountOfEnrolledStudents = await fetchCountOfEnrolledStudents(
			teacherEmail
		);
		commit("SET_ENROLLED_STUENTS_COUNT", getCountOfEnrolledStudents);
	},
	async fetchAllPendingRequest({ commit }, arrQuery) {
		let getPendingRequestCount = await countPendingRequest(arrQuery);
		commit("PENDING_REQUEST_COUNT", getPendingRequestCount);
	},
	async fetchAllToCheckExam({ commit }, arrQuery) {
		let getToRequestCount = await countToCheckRequest(arrQuery);
		commit("TO_CHECK_COUNT", getToRequestCount);
	},
	async fetchRequestToday({ commit }, arrQuery) {
		let getRequestToday = await fetchRequestTodayFb(arrQuery);
		commit("PUSH_REQUEST_TODAY", getRequestToday);
	},
	emptyListExams({ commit }) {
		commit("PUT_ALL_REQUESTED_EXAM_BY_STUDENT_ID", []);
	},
	clearSingleExamArr({ commit }) {
		commit("PUSH_SINGLE_EXAM_INFO", "");
	},
	clearQueryMessage({ commit }) {
		commit("EXAM_MESSAGE", "");
	},
	emptyQuestionList({ commit }) {
		commit("REMOVE_ALL_QUESTIONS", "");
	},
	clearAllInExamAfterLogout({ commit }) {
		commit("RESET_STATE");
	}
};

const mutations = {
	ADD_QUESTION_INFO: (state, question) => state.questionRows.push(question),
	PUSH_EXAM_LIST_ARR: (state, examListArr) => (state.examList = examListArr),
	PUSH_EXAM_LIST_ARR_IN_STUDENT: (state, examList) =>
		(state.examListStudent = examList),
	PUSH_SINGLE_EXAM_INFO: (state, response) => [
		(state.singleExam = []),
		state.singleExam.push(response)
	],
	EXAM_MESSAGE: (state, response) => (state.queryMessage = response),
	REMOVE_ALL_QUESTIONS: state => (state.questionRows = [{}]),
	PUT_SEARCH_RESULT: (state, response) => (state.searchResult = response),
	REQUEST_MESSAGE: (state, response) => (state.requestExamMsg = response),
	STATUS_OF_REQUEST: (state, response) => (state.requestStatus = response),
	PUT_ALL_REQUESTED_EXAM_BY_STUDENT_ID: (state, response) => {
		state.listOfRequestedExam = response;
	},
	PUSH_EXAM_LIST_BY_EXAMCODE_ARR: (state, exams) =>
		(state.studentsEnrollPerExamCode = exams),
	SINGLE_EXAM_INFO_TO_COMPARE_STUDENT_SIDE: (state, response) => [
		(state.singleExamToCompareStudentSide = []),
		state.singleExamToCompareStudentSide.push(response)
	],
	SET_SCORES_INFO: (state, response) => {
		state.listTotalScoreOfStudent = response;
	},

	PUT_SINGLE_RESULT_INFO: (state, response) => {
		state.listSingleExamResult = response;
	},
	PUSH_STUDENTS_ENROLLED: (state, response) => {
		state.arrStudentsEnrolled = response;
	},
	SET_ENROLLED_STUENTS_COUNT: (state, count) => {
		return (state.studentsEnrolledCount = count);
	},
	PENDING_REQUEST_COUNT: (state, count) => (state.pendingRequestCount = count),
	TO_CHECK_COUNT: (state, count) => (state.toCheckExamCount = count),
	PUSH_REQUEST_TODAY: (state, response) => (state.requestToday = response),
	RESET_STATE: state => {
		Object.assign(state, getDefaultState());
	}
	//REMOVE_QUESTION: (state, questionNumber) => ({ })
};

export default {
	state,
	getters,
	actions,
	mutations
};
