


import React, { useEffect, useState } from "react";
import { useExercises } from "../../features/exercises/hooks/useExercises";
import { ExerciseCard } from "./ExerciseCard";
import { fetchExerciseImages } from "../../api/exerciseImages";
import type { Exercise } from "../../features/exercises/type";

export function ExerciseList() {
  const { data, isLoading, error } = useExercises();
  const [images, setImages] = useState<Record<number, string>>({});

  useEffect(() => {
    if (data && data.length > 0) {
      fetchExerciseImages(data.map((e: Exercise) => e.id)).then(imgs => {
        // Ensure all image URLs have protocol
        const fixedImgs: Record<number, string> = {};
        Object.entries(imgs).forEach(([id, url]) => {
          fixedImgs[Number(id)] = url.startsWith('http') ? url : `https:${url}`;
        });
        setImages(fixedImgs);
      });
    }
  }, [data]);

  if (isLoading) return <p>Loading exercises...</p>;
  if (error) return <p>Error loading exercises</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
      {(Array.isArray(data) ? data : [])
        .filter((exercise: Exercise) => images[exercise.id])
        .map((exercise: Exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={{ ...exercise, imageUrl: images[exercise.id] }}
          />
        ))}
    </div>
  );
}
