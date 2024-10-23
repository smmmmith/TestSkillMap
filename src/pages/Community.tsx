import React from 'react';
import { Users, Calendar, MessageSquare } from 'lucide-react';

export function Community() {
  const events = [
    {
      id: 1,
      title: 'Weekly Social Skills Workshop',
      date: '2024-03-20T15:00:00Z',
      attendees: 12,
    },
    {
      id: 2,
      title: 'Communication Practice Group',
      date: '2024-03-22T18:00:00Z',
      attendees: 8,
    },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Community Hub</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-6 h-6 text-indigo-600" />
              <h3 className="text-lg font-semibold">Active Members</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">128</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="w-6 h-6 text-indigo-600" />
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{events.length}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-3 mb-4">
              <MessageSquare className="w-6 h-6 text-indigo-600" />
              <h3 className="text-lg font-semibold">Discussion Topics</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">15</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(event.date).toLocaleDateString()} at{' '}
                    {new Date(event.date).toLocaleTimeString()}
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {event.attendees} attending
                </span>
              </div>
              <button className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Join Event →
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}