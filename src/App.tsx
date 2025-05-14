
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Pages
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import MyCourses from "./pages/MyCourses";
import Materials from "./pages/Materials";
import MyMaterials from "./pages/MyMaterials";
import UsersManagement from "./pages/UsersManagement";
import Calendar from "./pages/Calendar";
import MyCalendar from "./pages/MyCalendar";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import InstructorProfile from "./pages/InstructorProfile"; // Add InstructorProfile import

const queryClient = new QueryClient();

// Root component to handle auth-based redirection
const Root = () => {
  const { isAuthenticated, isAdmin, isInstructor } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (isAdmin()) {
    return <AdminDashboard />;
  }
  
  if (isInstructor()) {
    return <Navigate to="/instructor-profile" />;
  }
  
  return <UserDashboard />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            
            {/* Admin routes */}
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/courses/new" element={<div>Create Course</div>} />
            <Route path="/users" element={<UsersManagement />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Instructor routes */}
            <Route path="/instructor-profile" element={<InstructorProfile />} />
            
            {/* User routes */}
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/my-courses/:id" element={<CourseDetails />} />
            <Route path="/my-materials" element={<MyMaterials />} />
            <Route path="/my-calendar" element={<MyCalendar />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
