import React from 'react';
import { AlertTriangle, TrendingUp, Activity } from 'lucide-react';

interface ScoreCardProps {
  title: string;
  score: number;
  type: 'stability' | 'overdraft' | 'creditLine';
}

const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'stability':
        return <Activity className="w-6 h-6 text-blue-500" />;
      case 'overdraft':
        return <AlertTriangle className="w-6 h-6 text-red-500" />;
      case 'creditLine':
        return <TrendingUp className="w-6 h-6 text-green-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        {getIcon()}
      </div>
      <div className="text-3xl font-bold">{score}/10</div>
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              score >= 7
                ? 'bg-green-500'
                : score >= 4
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }`}
            style={{ width: `${score * 10}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;