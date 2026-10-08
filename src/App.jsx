import React, { useState } from 'react';

// Mock Data for the Platform
const initialCourses = [
  { id: 1, title: "Advanced React & Next.js", lecturer: "Dr. Sarah Jenkins", progress: 75, grade: "A" },
  { id: 2, title: "Database Systems & Design", lecturer: "Prof. Alan Turing", progress: 40, grade: "B+" },
  { id: 3, title: "Cloud Native Deployment", lecturer: "Eng. Linus O.", progress: 100, grade: "A+", certified: true }
];

const schedulePeriods = [
  { id: 1, time: "09:00 AM - 11:00 AM", course: "Advanced React", room: "Virtual Lab 1", status: "Live" },
  { id: 2, time: "01:00 PM - 02:30 PM", course: "Database Systems", room: "Seminar Hall B", status: "Upcoming" },
  { id: 3, time: "04:00 PM - 05:30 PM", course: "Office Hours / Interaction", room: "Zoom Meet", status: "Upcoming" }
];

export default function SchoolManagementApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [courses, setCourses] = useState(initialCourses);
  const [messages, setMessages] = useState([
    { id: 1, sender: "Dr. Sarah Jenkins", text: "Please review the updated routing assignment before our session today." }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "Student (You)", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-indigo-900 text-white flex flex-col p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-500 rounded-lg text-xl font-bold">🏫</div>
          <h1 className="text-xl font-extrabold tracking-tight">EduSphere OS</h1>
        </div>
        <nav className="flex flex-col gap-2 flex-grow">
          {['dashboard', 'e-learning', 'interaction', 'grades', 'certifications'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left capitalize px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                activeTab === tab 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-indigo-200 hover:bg-indigo-800/50 hover:text-white'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </nav>
        <div className="pt-4 border-t border-indigo-800 text-xs text-indigo-300">
          Logged in as: <span className="font-semibold text-white">Alex Rivera (Student)</span>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        
        {/* HEADER BAR */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 capitalize">{activeTab.replace('-', ' ')} Overview</h2>
            <p className="text-sm text-slate-500">Manage your learning journey, assignments, and structural sessions.</p>
          </div>
          <div className="flex items-center gap-3 bg-indigo-50 px-4 py-2 rounded-full text-indigo-700 text-sm font-semibold">
            <span>📅 Term: Fall 2026</span>
          </div>
        </header>

        {/* DYNAMIC DASHBOARD CONTAINER */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Metrics */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Active Enrollment</span>
                <span className="text-3xl font-extrabold text-slate-900 mt-2">{courses.length} Courses</span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Completed / Certified</span>
                <span className="text-3xl font-extrabold text-emerald-600 mt-2">1 Program</span>
              </div>
            </div>

            {/* Scheduling Period Block */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:row-span-2">
              <h3 className="font-bold text-lg text-slate-900 mb-4">Today's Learning Schedule</h3>
              <div className="flex flex-col gap-4">
                {schedulePeriods.map(period => (
                  <div key={period.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden">
                    {period.status === 'Live' && <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-bl">Live</span>}
                    <p className="text-xs font-semibold text-indigo-600">{period.time}</p>
                    <h4 className="font-bold text-slate-800 text-sm mt-1">{period.course}</h4>
                    <p className="text-xs text-slate-500 mt-1">📍 {period.room}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Course Progress Summary */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-lg text-slate-900 mb-4">Core Progress Matrix</h3>
              <div className="space-y-4">
                {courses.map(course => (
                  <div key={course.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold text-slate-700">{course.title}</span>
                      <span className="text-indigo-600 font-bold">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* E-LEARNING LECTURE MATRIX */}
        {activeTab === 'e-learning' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{course.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Lead Instructor: {course.lecturer}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg">Active Modules</span>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                    Enter Virtual Classroom
                  </button>
                  <span className="text-xs text-slate-400 font-medium">Syllabus Updated</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LECTURER INTERACTION PLATFORM */}
        {activeTab === 'interaction' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-[500px]">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <span className="font-bold text-slate-800">Faculty Chat Support</span>
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
            </div>
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.sender.includes('You') ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] text-slate-400 font-medium mb-1">{msg.sender}</span>
                  <div className={`p-3 rounded-2xl max-w-md text-sm ${msg.sender.includes('You') ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask your lecturer a question..."
                className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-2 rounded-xl transition-colors">
                Send
              </button>
            </form>
          </div>
          </main>
        )}

        {/* GRADE DISTRIBUTION VIEW */}
         