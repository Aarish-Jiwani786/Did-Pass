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

// function getFinalScores(req: Request, res: Response): void {
//   const { studentName } = req.params as StudentNameParams; // Assign `req.params` as a `StudentNameParams`;
//   const student = StudentModel.getFinalExamScores(studentName); // get the student's data using function imported from StudentModel

//   if (student === undefined) {
//     res.sendStatus(404);
//     return;
//   }
//   res.json(student);
// }

export default { getAllStudents, createNewStudent, getStudentByName }; // getFinalScores };
