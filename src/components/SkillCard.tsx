import React from 'react';
import { ChevronRight, Lock, CheckCircle } from 'lucide-react';
import type { Skill, SkillProgress } from '../types';

interface SkillCardProps {
  skill: Skill;
  progress: SkillProgress;
  onClick: () => void;
}

export function SkillCard({ skill, progress, onClick }: SkillCardProps) {
  const statusColors = {
    incomplete: 'bg-gray-100',
    completed: 'bg-green-100',
    locked: 'bg-red-100',
    available: 'bg-blue-100',
  };

  const StatusIcon = () => {
    switch (progress.status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-red-600" />;
      default:
        return <ChevronRight className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div
      onClick={progress.status !== 'locked' ? onClick : undefined}
      className={`${
        statusColors[progress.status]
      } p-6 rounded-lg shadow-md transition-transform hover:scale-102 cursor-pointer`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{skill.title}</h3>
          <p className="mt-2 text-sm text-gray-600">{skill.description}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-white text-gray-700">
              Level {skill.level}
            </span>
            {progress.completedModules.length > 0 && (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white text-gray-700">
                {progress.completedModules.length} modules completed
              </span>
            )}
          </div>
        </div>
        <StatusIcon />
      </div>
    </div>
  );
}