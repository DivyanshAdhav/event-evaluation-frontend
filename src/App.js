import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CreateEvent from "./pages/CreateEvent";
import AddJudge from "./pages/AddJudge";
import AddParticipants from "./pages/AddParticipants";
import JudgeDashboard from "./pages/JudgeDashboard";
import EventParticipants from "./pages/EventParticipants";
import EvaluateParticipant from "./pages/EvaluateParticipant";
import JudgeReport from "./pages/JudgeReports"
import Leaderboard from "./pages/Leaderboard"
import EvaluateRounds from "./pages/EvaluateRounds"
import Coordinator from "./pages/AddCoordinator"
import CoordinatorDashboard from "./pages/CoordinatorDashboard"
import ProtectedRoute from "./components/ProtectedRoute"


function App() {

  return (

    <Router>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<ProtectedRoute> <AdminDashboard /> </ProtectedRoute>} />

        <Route path="/create-event" element={<ProtectedRoute> <CreateEvent /> </ProtectedRoute>} />

        <Route path="/add-judge" element={<ProtectedRoute> <AddJudge /> </ProtectedRoute>} />

        <Route path="/add-participants" element={<ProtectedRoute> <AddParticipants /> </ProtectedRoute>} />

        <Route path="/judge" element={<ProtectedRoute> <JudgeDashboard /> </ProtectedRoute>} />

        <Route path="/judge/event/:eventId" element={<ProtectedRoute><EventParticipants /></ProtectedRoute>} />

        <Route path="/evaluate/:participantId" element={<ProtectedRoute><EvaluateParticipant /></ProtectedRoute>} />

        <Route path="/judge-report" element={<ProtectedRoute><JudgeReport/></ProtectedRoute>}/>

        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard/></ProtectedRoute>}/>

        <Route path="/evaluate/:participantId" element={<ProtectedRoute><EvaluateRounds/></ProtectedRoute>}/>

        <Route path="/coordinator" element={<ProtectedRoute><Coordinator /></ProtectedRoute>} />

        <Route path="/coordinator-dashboard" element={<ProtectedRoute><CoordinatorDashboard/></ProtectedRoute>}/>


      </Routes>

    </Router>

  );

}

export default App;