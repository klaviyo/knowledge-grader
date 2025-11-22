interface GradeDisplayProps {
  grade: number;
}

export function GradeDisplay({ grade }: GradeDisplayProps) {
  const getColorClass = () => {
    if (grade >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (grade >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (grade >= 70) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (grade >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-orange-600 bg-orange-50 border-orange-200';
  };

  const getLabel = () => {
    if (grade >= 90) return 'Outstanding Quality';
    if (grade >= 80) return 'Excellent';
    if (grade >= 70) return 'Good';
    if (grade >= 60) return 'Fair';
    return 'Needs Improvement';
  };

  const getMessage = () => {
    if (grade >= 90) return 'Your content is optimized for AI retrieval';
    if (grade >= 80) return 'Minor improvements recommended';
    if (grade >= 70) return 'Some optimizations recommended';
    if (grade >= 60) return 'Several improvements needed';
    return 'Significant improvements needed';
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      {/* Score */}
      <div className={`flex-shrink-0 w-32 h-32 rounded-2xl border-2 ${getColorClass()} flex flex-col items-center justify-center`}>
        <div className="text-5xl font-bold">{grade}</div>
        <div className="text-xs font-semibold opacity-60 mt-1">/ 100</div>
      </div>

      {/* Details */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{getLabel()}</h2>
        <p className="text-gray-600 text-base">{getMessage()}</p>
      </div>
    </div>
  );
}
