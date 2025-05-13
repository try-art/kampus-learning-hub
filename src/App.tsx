
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
import MyCourses from "./pages/MyCourses";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Root component to handle auth-based redirection
const Root = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return isAdmin() ? <AdminDashboard /> : <UserDashboard />;
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
            <Route path="/courses/:id" element={<div>Course Details (Admin)</div>} />
            <Route path="/courses/new" element={<div>Create Course</div>} />
            <Route path="/users" element={<div>Users Management</div>} />
            <Route path="/materials" element={<div>Materials Management</div>} />
            <Route path="/calendar" element={<div>Admin Calendar</div>} />
            <Route path="/settings" element={<div>Settings</div>} />
            
            {/* User routes */}
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/my-courses/:id" element={<div>Course Details (User)</div>} />
            <Route path="/my-materials" element={<div>My Materials</div>} />
            <Route path="/my-calendar" element={<div>User Calendar</div>} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
