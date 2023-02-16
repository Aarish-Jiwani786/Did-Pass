import { Request, Response } from 'express';
import StudentModel from '../models/StudentModel';

function getAllStudents(req: Request, res: Response): void {
  res.json(StudentModel.students);
}

function createNewStudent(req: Request, res: Response): void {
  const studentData = req.body as NewStudentRequest; // Assign `req.body` as a `NewStudentRequest`
  const total =
    StudentModel.calculateWeights(studentData.weights) + studentData.weights.finalExamWeight;
  if (total !== 100) {
    res.sendStatus(400);
    return;
  }
  const didAddStudent = StudentModel.addStudent(studentData); // Call the `addStudent` function using the student's data

  // If the student's data was not added successfully
  if (!didAddStudent) {
    res.sendStatus(409); // Responds with status 409 (This means 409 Conflict)
    // return from the function
    return;
  }

  res.sendStatus(201); // Send status 201 (This means 201 Created)
}

function getStudentByName(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParams; // Assign `req.params` as a `StudentNameParams`;
  const student = StudentModel.getStudent(studentName); // get the student's data using function imported from StudentModel

  // If `student` is undefined
  if (!student) {
    // respond with status 404 (Which means 404 Not Found)
    res.sendStatus(404);
    // return immediately
    return;
  }
  // Respond with the student's information as json
  res.json(student);
}

function getFinalExamScores(req: Request, res: Response): void {
  // TODO: Get the student name from the path params
  const { studentName } = req.params as StudentNameParams;
  // TODO: Get the student's data from the dataset
  const student = StudentModel.getStudent(studentName);
  // TODO: If the student was not found
  if (!student) {
    // TODO: responds with status 404 Not Found
    res.sendStatus(404);
    // TODO: terminate the function
    return;
  }
  // TODO: Get the current average and weights from the student's data
  const { currentAverage } = student;
  const { finalExamWeight } = student.weights;
  // TODO: Calculate the grade needed on the final to score a 90 in the class (this is the grade needed for an A)
  const gradeA: number = StudentModel.calculateFinalExamScore(currentAverage, finalExamWeight, 90);
  // TODO: Calculate the grade needed on the final to score a 80 in the class (this is the grade needed for a B)
  const gradeB: number = StudentModel.calculateFinalExamScore(currentAverage, finalExamWeight, 80);
  // TODO: Calculate the grade needed on the final to score a 70 in the class (this is the grade needed for a C)
  const gradeC: number = StudentModel.calculateFinalExamScore(currentAverage, finalExamWeight, 70);
  // TODO: Calculate the grade needed on the final to score a 60 in the class (this is the grade needed for a D)
  const gradeD: number = StudentModel.calculateFinalExamScore(currentAverage, finalExamWeight, 60);
  // TODO: Send a JSON response with an object containing the grades needed for an A through D
  const needed: FinalExamScore = {
    neededForA: gradeA,
    neededForB: gradeB,
    neededForC: gradeC,
    neededForD: gradeD,
  };
  res.json(needed);
}

function calcFinalScore(req: Request, res: Response): void {
  // TODO: Get the student name from the path params
  const { studentName } = req.params as StudentNameParams;

  // TODO: Get the student's data from the dataset
  const student = StudentModel.getStudent(studentName);

  // TODO: If the student was not found
  if (!student) {
    // TODO: responds with status 404 Not Found
    res.sendStatus(404);
    // TODO: terminate the function
    return;
  }

  // TODO: Get the grade data from the request body as the `AssignmentGrade` type
  const grade = req.body as AssignmentGrade;

  // TODO: Get the current average and weights from the student's data
  const { currentAverage } = student;
  const { finalExamWeight } = student.weights;
  const overall =
    currentAverage * (1 - finalExamWeight / 100) * 100 + grade.grade * (finalExamWeight / 100); // TODO: Calculate the final score that would receive using their current average and the hypothetical final exam grade.
  const letterGrade = StudentModel.getLetterGrade(overall); // TODO: Get the letter grade they would receive given this score

  // TODO: Send back a JSON response containing their `overallScore` and `letterGrade.
  const FinalScore: FinalGrade = {
    overallScore: overall,
    letterGrade,
  };
  res.json(FinalScore);
}

function updateGrade(req: Request, res: Response): void {
  // TODO: Get the student's name and assignment name from the path parameters as a `GradeUpdateParams`
  const { studentName, assignmentName } = req.params as GradeUpdateParams;

  // TODO: Get the grade from the request body as an `AssignmentGrade`
  const grade = req.body as AssignmentGrade;

  // TODO: Update the student's grade
  const updated = StudentModel.updateStudentGrade(studentName, assignmentName, grade.grade);

  // TODO: If the update did not complete (this means the student or the assignment wasn't found)
  if (!updated) {
    // TODO: respond with status 404 Not Found
    res.sendStatus(404);
    // TODO: terminate the function immediately
    return;
  }

  // TODO: Respond with status 200 OK
  res.sendStatus(200);
}

export default {
  getAllStudents,
  createNewStudent,
  getStudentByName,
  getFinalExamScores,
  calcFinalScore,
  updateGrade,
};
