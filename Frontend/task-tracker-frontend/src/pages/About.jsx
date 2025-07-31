import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Why Task Tracker?</h1>
      <p className="text-lg mb-4">
        Task Tracker is your personal productivity partner. It helps you manage your time efficiently, prioritize your tasks, and stay organized with a beautiful and easy-to-use interface.
      </p>
      <ul className="list-disc pl-6 text-md space-y-2">
        <li>🎯 Set clear goals and track progress</li>
        <li>🔔 Get timely reminders and status updates</li>
        <li>📊 Boost productivity with task prioritization</li>
        <li>🔒 Secure and personalized task management</li>
      </ul>
    </div>
  );
};

export default About;
