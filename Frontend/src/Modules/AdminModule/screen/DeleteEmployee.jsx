import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteEmployeeStatus } from "../../../Redux/admin_model/CRUD/deleteEmployeeAction";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const DeleteEmployeePanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state for form inputs
  const [employeeId, setEmployeeId] = useState("");
  const [reason, setReason] = useState("");
  const [role, setRole] = useState("");

  // Redux state for deletion
  const { employee, loading, error } = useSelector(
    (state) => state.deleteEmployee
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchDeleteEmployeeStatus(employeeId, role, reason));
  };

  // Optional: perform side effects on successful deletion
  useEffect(() => {
      if (employee) {
        toast.success("Employee deleted successfully.");
        setRole("")
        setReason("")
        setEmployeeId("")
        setTimeout(() =>{
          navigate("/admins")
      },3000)
      }
    }, [employee, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Delete Employee
        </h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block font-bold text-lg mb-1">Role:</label>
            <select
              className="w-full p-2 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose Role
              </option>
              <option value="employees">Employee</option>
              <option value="managers">Manager</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-bold text-lg mb-1">
              Employee ID:
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-lg mb-1">
              Reason for Deletion:
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>
          {loading ? (
            <div className="text-center text-blue-500">Deleting...</div>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-bold transition duration-200 hover:bg-blue-700"
            >
              Delete Employee
            </button>
          )}
          {error && (
            <div className="text-center text-red-600 mt-3">Error: {error}</div>
          )}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DeleteEmployeePanel;
