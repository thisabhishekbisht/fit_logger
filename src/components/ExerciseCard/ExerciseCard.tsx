import type { Exercise } from '../../features/exercises/type';

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const CARD_WIDTH = 320;
  const CARD_HEIGHT = 420;
  const IMAGE_HEIGHT = 180;
  const shimmer = (
    <div
      style={{
        width: '100%',
        height: IMAGE_HEIGHT,
        borderRadius: 8,
        marginBottom: 16,
        background: 'linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        display: 'block',
      }}
    />
  );

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
      borderRadius: 16,
      boxShadow: '0 4px 24px rgba(60, 72, 88, 0.10)',
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: CARD_HEIGHT,
      maxHeight: CARD_HEIGHT,
      width: CARD_WIDTH,
      maxWidth: CARD_WIDTH,
      margin: 'auto',
      border: '1px solid #e3e8ee',
      boxSizing: 'border-box',
    }}>
      {exercise.imageUrl ? (
        <img
          src={exercise.imageUrl}
          alt={exercise.name}
          style={{ width: '100%', height: IMAGE_HEIGHT, borderRadius: 8, marginBottom: 16, objectFit: 'cover', background: '#e0e0e0', display: 'block' }}
        />
      ) : shimmer}
      <h3 style={{ fontWeight: 700, fontSize: 22, marginBottom: 8, color: '#2d3748', width: '100%', textAlign: 'center' }}>{exercise.name}</h3>
      <div style={{ fontSize: 15, color: '#4a5568', marginBottom: 12, textAlign: 'center', width: '100%' }}>
        {exercise.description && exercise.description.trim() !== ''
          ? exercise.description
          : <span style={{ color: '#b0b7c3' }}>No description available.</span>}
      </div>
      <div style={{ fontSize: 13, color: '#5a6270', marginBottom: 4, width: '100%' }}>
        <strong>Muscles:</strong> {exercise.muscles.length > 0 ? exercise.muscles.join(", ") : "N/A"}
      </div>
      <div style={{ fontSize: 13, color: '#5a6270', width: '100%' }}>
        <strong>Equipment:</strong> {exercise.equipment.length > 0 ? exercise.equipment.join(", ") : "N/A"}
      </div>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
