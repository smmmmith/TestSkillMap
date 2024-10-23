import React from 'react';
import { SkillCard } from '../components/SkillCard';
import type { Skill } from '../types';

const mockSkills: Skill[] = [
  {
    id: '1',
    title: 'Communication Basics',
    description: 'Master the fundamentals of effective communication',
    level: 1,
    prerequisites: [],
    content: {
      modules: [],
      examples: [],
      exercises: [],
    },
  },
  {
    id: '2',
    title: 'Active Listening',
    description: 'Learn to listen effectively and understand others better',
    level: 1,
    prerequisites: ['1'],
    content: {
      modules: [],
      examples: [],
      exercises: [],
    },
  },
];

export function SkillMap() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Your Skill Map</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSkills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            progress={{
              status: skill.prerequisites.length === 0 ? 'available' : 'locked',
              completedModules: [],
              lastAccessed: new Date().toISOString(),
            }}
            onClick={() => {
              // TODO: Navigate to skill detail page
              console.log('Clicked skill:', skill.id);
            }}
          />
        ))}
      </div>
    </section>
  );
}