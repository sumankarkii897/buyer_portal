import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

export interface IProfile {
  _id: string | number;
  username: string;
  email: string;
  role: string;
}

export const Profile = () => {
  const [user, setUser] = useState<IProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/myProfile");
        setUser(res.data.user);
      } catch (error: any) {
        console.error("Error fetching user profile:", error);
        const errorMessage = 
          error.response?.data?.message || 
          error.message || 
          "Failed to fetch user profile";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          My Profile
        </h1>

        <div className="bg-white shadow-md rounded-xl p-6 space-y-5">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 font-medium">Name</p>
              <p className="text-lg font-semibold text-gray-800">
                {user?.username || 'N/A'}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 font-medium">Email</p>
              <p className="text-lg font-semibold text-gray-800">
                {user?.email || 'N/A'}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 font-medium">Role</p>
              <p className="text-lg font-semibold text-gray-800 capitalize">
                {user?.role || 'N/A'}
              </p>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};