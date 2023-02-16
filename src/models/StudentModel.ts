const students: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {
  let number = 0;
  let total = 0;
  let totalWeight = 0;
  for (number; number < weights.assignmentWeights.length; number += 1) {
    total +=
      weights.assignmentWeights[number].grade * (weights.assignmentWeights[number].weight / 100);
    totalWeight += weights.assignmentWeights[number].weight;
  }
  const average: number = total / totalWeight;
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

function calculateFinalExamScore(
  currentAverage: number,
  finalExamWeight: number,
  targetScore: number
): number {
  // TODO: Calculate the final exam score needed to get the targetScore in the class
  const score: number =
    ((targetScore - currentAverage * (100 - finalExamWeight)) / finalExamWeight) * 100;
  return score;
}

function getLetterGrade(score: number): string {
  // TODO: Return the appropriate letter grade
  let letter: string = '';
  if (score >= 90) {
    letter = 'A';
  } else if (score >= 80) {
    letter = 'B';
  } else if (score >= 70) {
    letter = 'C';
  } else {
    letter = 'D';
  }

  return letter;
}

function updateStudentGrade(
  studentName: string,
  assignmentName: string,
  newGrade: number
): boolean {
  // TODO: Get the student's data from the dataset
  const student = getStudent(studentName);

  // TODO: If the student was not found
  if (!student) {
    // TODO: return false
    return false;
  }

  const assignment = student.weights.assignmentWeights.find((name) => name.name === assignmentName); // TODO: Search the student's `assignmentWeights` and find the assignment with the matching name using the .find() method

  // TODO: If the assignment was not found
  if (!assignment) {
    // TODO: return false
    return false;
  }

  // TODO: Set the assignment's grade to the newGrade
  assignment.grade = newGrade;

  student.currentAverage = calculateAverage(student.weights); // TODO: Then recalculate the student's currentAverage

  // TODO: return true since the update completed successfully
  return true;
}

export default {
  students,
  addStudent,
  getStudent,
  calculateWeights,
  calculateFinalExamScore,
  getLetterGrade,
  updateStudentGrade,
};
