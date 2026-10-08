import React, { useState } from 'react';
import './App.css'; // <--- Imports your clean separated stylesheet structure

// Mock Platform Database
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
    <div className="app-container">
      
      {/* SIDEBAR NAVIGATION PANEL */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">🏫</div>
          <h1 className="logo-text">EduSphere OS</h1>
        </div>
        <nav className="nav-links">
          {['dashboard', 'e-learning', 'interaction', 'grades', 'certifications'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`nav-btn ${activeTab === tab ? 'active' : ''}`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          Logged in as: <br /><strong>Alex Rivera (Student)</strong>
        </div>
      </aside>

      {/* CORE DISPLAY PIPELINE */}
      <main className="main-content">
        
        {/* STRUCTURAL HEADER OVERVIEW */}
        <header className="header-bar">
          <div className="header-title">
            <h2>{activeTab.replace('-', ' ')} Overview</h2>
            <p>Manage your learning journey, assignments, and structural sessions.</p>
          </div>
          <div className="header-badge">
            📅 Term: Fall 2026
          </div>
        </header>

        {/* TAB CONTROLS RENDERING PIPELINE */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-grid">
            <div className="left-column">
              <div className="metrics-row">
                <div className="card">
                  <span className="metric-title">Active Enrollment</span>
                  <span className="metric-value">{courses.length} Courses</span>
                </div>
                <div className="card">
                  <span className="metric-title">Completed / Certified</span>
                  <span className="metric-value success">1 Program</span>
                </div>
              </div>

              <div className="card">
                <h3 className="card-title">Core Progress Matrix</h3>
                <div className="progress-container">
                  {courses.map(course => (
                    <div key={course.id}>
                      <div className="progress-label">
                        <strong>{course.title}</strong>
                        <span style={{color: 'var(--color-primary)', fontWeight: 'bold'}}>{course.progress}%</span>
                      </div>
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Today's Schedule</h3>
              <div className="schedule-list">
                {schedulePeriods.map(period => (
                  <div key={period.id} className="schedule-item">
                    {period.status === 'Live' && <span className="live-tag">Live</span>}
                    <p className="schedule-time">{period.time}</p>
                    <h4 className="schedule-course">{period.course}</h4>
                    <p className="schedule-room">📍 {period.room}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIRTUAL MATRIX PLATFORM */}
        {activeTab === 'e-learning' && (
          <div className="cert-grid">
            {courses.map(course => (
              <div key={course.id} className="card">
                <h3 className="card-title">{course.title}</h3>
                <p className="elearning-sub">Lead Instructor: {course.lecturer}</p>
                <button className="btn-primary" style={{width: '100%'}}>Enter Virtual Classroom</button>
              </div>
            ))}
          </div>
        )}

        {/* LIVE LECTURER CHAT INTERACTION */}
        {activeTab === 'interaction' && (
          <div className="chat-box">
            <div className="chat-header">
              <span>Faculty Chat Support</span>
              <span className="chat-indicator"></span>
            </div>
            <div className="chat-body">
              {messages.map(msg => (
                <div key={msg.id} className={`msg-container ${msg.sender.includes('You') ? 'me' : ''}`}>
                  <span className="msg-sender">{msg.sender}</span>
                  <div className="msg-bubble">{msg.text}</div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="chat-footer">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask your lecturer a question..."
                className="chat-input"
              />
              <button type="submit" className="btn-primary">Send</button>
            </form>
          </div>
        )}

        {/* TRANSCRIPT TRACKING LEDGER */}
        {activeTab === 'grades' && (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Instructor</th>
                  <th>Weighted Score</th>
                  <th>Letter Grade</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id}>
                    <td><strong>{course.title}</strong></td>
                    <td style={{color: 'var(--color-text-muted)'}}>{course.lecturer}</td>
                    <td>{course.progress}% Finished</td>
                    <td><span className="badge-grade">{course.grade}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SECURE BLOCKCHAIN CERTIFICATION PATH */}
        {activeTab === 'certifications' && (
          <div className="cert-grid">
            {courses.filter(c => c.certified).map(course => (
              <div key={course.id} className="cert-card">
                <span className="cert-badge">Official Certificate</span>
                <h3>{course.title}</h3>
                <p style={{fontSize: '12px', color: '#c7d2fe', margin: '0'}}>Verified by {course.lecturer}</p>
                <div className="cert-footer">
                  <span style={{fontSize: '11px', fontFamily: 'monospace', color: '#fbbf24'}}>ID: EDU-2026-09X2</span>
                  <button className="btn-secondary">Download PDF</button>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
