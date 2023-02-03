const students: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {
  let number = 0;
  let total = 0;
  for (number; number < weights.assignmentWeights.length; number += 1) {
    total +=
      weights.assignmentWeights[number].grade * (weights.assignmentWeights[number].weight / 100);
  }
  const average: number = total / 0.8;
  return average;
}

function calculateWeights(assignmentWeights: CourseGrades): number {
  let subtotal = 0;
  for (let i = 0; i < assignmentWeights.assignmentWeights.length; i += 1) {
    subtotal += assignmentWeights.assignmentWeights[i].weight;
  }
  return subtotal;
}

function addStudent(newStudentData: NewStudentRequest): boolean {
  // Destructure the name and weights
  const { name, weights } = newStudentData;

  // the the name is already in `students`
  // then return false
  if (name in students) {
    return false;
  }

  // Calculate the student's current average (use the function previously defined)

  const newStudent: Student = {
    name,
    weights,
    currentAverage: calculateAverage(weights),
  }; // Create a `Student` object using the `name`, `weights` and `currentAverage`

  // Add the new Student to the `students` object. The student's name is the key
  students[newStudent.name] = newStudent;

  // Finally, return true since the student was added
  return true;
}

function getStudent(studentName: string): Student | undefined {
  // If the student's name is not in `students`
  if (!((studentName as string) in students)) {
    return undefined;
  }
  // then return undefined

  // Return the student's information (their name is the key for `students`)
  return students[studentName];
}

// function getFinalExamScores(studentName: string): FinalExamScore | undefined {
//   const finalScores: FinalExamScore = {
//     neededForA: 0,
//     neededForB: 0,
//     neededForC: 0,
//     neededForD: 0,
//   };
//   if (!((studentName as string) in students)) {
//     return undefined;
//   }
//   const avg: number = students.studentName.currentAverage;
//   let score: number = (90 - avg) / students.studentName.weights.finalExamWeight;
//   finalScores.neededForA = score;
//   score = (80 - avg) / students.studentName.weights.finalExamWeight;
//   finalScores.neededForB = score;
//   score = (70 - avg) / students.studentName.weights.finalExamWeight;
//   finalScores.neededForC = score;
//   score = (60 - avg) / students.studentName.weights.finalExamWeight;
//   finalScores.neededForD = score;
//   return finalScores;
// }

export default { students, addStudent, getStudent, calculateWeights };
