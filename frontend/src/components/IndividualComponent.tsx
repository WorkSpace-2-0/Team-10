"use client";

export default function IndividualComponent() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Individual Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Profile</h3>
          <p className="text-gray-600">Manage your personal profile</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Mood Tracking</h3>
          <p className="text-gray-600">Track your daily mood</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Progress</h3>
          <p className="text-gray-600">View your mood progress</p>
        </div>
      </div>
    </div>
  );
}
