import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import PropTypes from "prop-types";
import HabitPage from "./pages/HabitPage";
import HabitChartPage from "./pages/HabitChartPage"; 
import SignUpPage from "./pages/Registration/SignUpPage";
import SignInPage from "./pages/SignIn/SignInPage";
import MyNav from "./component/MyNav";

function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/signIn" replace />;
  }

  return (
    <>
      <MyNav />
      {children}
    </>
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HabitPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/habit-chart"
          element={
            <ProtectedRoute>
              <HabitChartPage />
            </ProtectedRoute>
          }
        />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
