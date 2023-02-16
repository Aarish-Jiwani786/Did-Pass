import express, { Express } from 'express';
import StudentController from './controllers/StudentController';
// import StudentModel from './models/StudentModel';

const app: Express = express();
const PORT = 2045;

app.use(express.json());

// app.get('/api/students', StudentController.getAllStudents);
app.post('/api/students', StudentController.createNewStudent);
app.get('/api/students/:studentName', StudentController.getStudentByName);
app.get('/api/students/:studentName/finalExam', StudentController.getFinalExamScores);
app.post('/api/students/:studentName/finalExam', StudentController.calcFinalScore);
app.post('/api/students/:studentName/grades/:assignmentName', StudentController.updateGrade);

app.listen(PORT, () => {
  console.log(`Server Listening on http://localhost:${PORT}`);
});
