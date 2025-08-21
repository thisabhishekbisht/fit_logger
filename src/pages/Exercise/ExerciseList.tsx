// Update the import path below to match the actual location and filename of ExerciseList
// For example, if the file is named ExerciseList.tsx in the same folder, use:

import { ExerciseList } from "../../components/ExerciseCard/ExerciseList";

// Or correct the path as needed based on your project structure

export default function ExercisesPage() {
  return (
    <div className="p-6">
  <h1 className="text-2xl font-bold mb-4" style={{ textAlign: 'center' }}>Exercises</h1>
      <ExerciseList />
    </div>
  );
}
