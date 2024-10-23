import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const slides = [
  {
    title: 'Welcome to SkillBound',
    description: 'Your journey to personal growth starts here.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Track Your Progress',
    description: 'Follow your growth with interactive skill trees.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Join the Community',
    description: 'Connect with others on similar journeys.',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
  },
];

const goals = [
  'Improve communication skills',
  'Build better relationships',
  'Develop social confidence',
  'Master daily living skills',
  'Enhance emotional intelligence',
];

export function OnboardingFlow() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [step, setStep] = React.useState(0);
  const [selectedGoals, setSelectedGoals] = React.useState<string[]>([]);
  const { user } = useAuth();

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      setStep(1);
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleGoalToggle = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal)
        ? prev.filter((g) => g !== goal)
        : [...prev, goal]
    );
  };

  const handleComplete = () => {
    // TODO: Save user preferences
    console.log('Selected goals:', selectedGoals);
  };

  if (step === 0) {
    return (
      <div className="relative h-[500px] w-full overflow-hidden rounded-xl bg-gray-900">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
              <p className="text-lg mb-4">{slide.description}</p>
              <button
                onClick={nextSlide}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {currentSlide === slides.length - 1 ? "Let's Begin" : 'Next'}
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Welcome, {user?.name || 'there'}! Let's personalize your journey.
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            What are your main goals? (Select all that apply)
          </h3>
          <div className="space-y-3">
            {goals.map((goal) => (
              <label
                key={goal}
                className="flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedGoals.includes(goal)}
                  onChange={() => handleGoalToggle(goal)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">{goal}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleComplete}
          disabled={selectedGoals.length === 0}
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Complete Setup
        </button>
      </div>
    </div>
  );
}