import React, { useState } from "react";
import { registerUser } from "../services/user.api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      await registerUser(formData);
      navigate("/login");
    } catch (error) {
      const serverMessage =
        error.response?.data?.message || "Registration failed. Try again.";

      setErrorMsg(serverMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Join TaskMaster
          </h2>
          <p className="text-slate-500 mt-2">
            Start managing your workflow today.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-sm text-red-700 font-medium">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              placeholder="name@company.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
