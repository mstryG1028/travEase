import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ListingDetails from "../pages/listing/ListingDetails";
import Wishlist from "../pages/favorite/Wishlist";
import Profile from "../pages/profile/Profile";
import EditProfile from "../pages/profile/EditProfile";
import ChangePassword from "../pages/profile/ChangePassword";
import Dashboard from "../pages/dashboard/Dashboard";
import PublicRoute from "./PublicRoute";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import BookingDetails from "../pages/booking/BookingDetails";
import MyBookings from "../pages/booking/MyBookings";
import CreateListing from "../pages/listing/CreateListing";
import BecomeHost from "../pages/listing/BecomeHost";

import MyListings from "../pages/listing/MyListings";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/become-host"
        element={
          <ProtectedRoute>
            <MainLayout>
              <BecomeHost />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-listing"
        element={
          <ProtectedRoute roles={["owner"]}>
            <CreateListing />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-listings"
        element={
          <ProtectedRoute roles={["owner"]}>
            <MyListings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/listings/:id"
        element={
          <MainLayout>
            <ListingDetails />
          </MainLayout>
        }
      />

      <Route
        path="/listings/edit/:id"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <MainLayout>
              <CreateListing />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookings/:id"
        element={
          <ProtectedRoute>
            <MainLayout>
              <BookingDetails />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <MainLayout>
              <MyBookings />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <MainLayout>
              <Login />
            </MainLayout>
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <MainLayout>
              <Register />
            </MainLayout>
          </PublicRoute>
        }
      />

      {/* Protected Routes */}

      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <MainLayout>
              <EditProfile />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/password"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ChangePassword />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Owner Only */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
