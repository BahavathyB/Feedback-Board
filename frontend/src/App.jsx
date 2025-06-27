
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SubmitFeedbackPage from "./pages/SubmitFeedbackPage";
import FeedbackDetailPage from "./pages/FeedbackDetailPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/submit" element={<SubmitFeedbackPage />} />
        <Route path="/feedback/:id" element={<FeedbackDetailPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
