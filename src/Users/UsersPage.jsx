import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./users.css";
import axios from "axios";

const API_BASE = process.env.REACT_APP_USERS_API_BASE || "";
const initialForm = { name: "", email: "", phone: "", role: "", city: "" };

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [openForm, setOpenForm] = useState(false); // modal toggle

  const [params] = useSearchParams();
  // NEW: toggle to show/hide the list card
  const [showList, setShowList] = useState(true);

  async function loadUsers() {
    try {
      setErr("");
      const { data } = await axios.get(`${API_BASE}/api/users`);
      setUsers(data || []);
    } catch (e) {
      console.error(
        "GET /api/users failed:",
        e?.response?.status,
        e?.response?.data || e?.message
      );
      setErr("Failed to load users.");
    }
  }

  useEffect(() => {
    if (params.get("new") === "1") {
      setOpenForm(true);
    }
  }, [params]);

  useEffect(() => {
    // Only load if the list is visible
    if (showList) {
      loadUsers();
    }
  }, [showList]);
  useEffect(() => {
    if (params.get("show") === "1") {
      setShowList(true);
    }
  }, [params]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate() {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      return "Valid email is required";
    if (!form.phone.trim()) return "Phone is required";
    return "";
  }

  async function onSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (v) {
      setErr(v);
      return;
    }

    try {
      setLoading(true);
      setErr("");
      await axios.post(`${API_BASE}/api/users`, form);
      setForm(initialForm);
      setOpenForm(false);
      // Refresh the list if it's visible
      if (showList) await loadUsers();
    } catch (e) {
      console.error(
        "POST /api/users failed:",
        e?.response?.status,
        e?.response?.data || e?.message
      );
      setErr(e?.response?.data?.error || "Failed to save user.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="users-wrap">
      <div className="users-headerbar">
        <h1 className="users-title">Users</h1>
        <div style={{ display: "flex", gap: 8 }}>
          {/* Optional: Show List button appears when the list is hidden */}
          {!showList && (
            <button className="btn" onClick={() => setShowList(true)}>
              Show List
            </button>
          )}
          <button className="btn primary" onClick={() => setOpenForm(true)}>
            + Create New User
          </button>
        </div>
      </div>

      {/* Error (load) */}
      {err && !openForm && <div className="error mb8">{err}</div>}

      {/* USER LIST CARD — now closable */}
      {showList && (
        <div className="users-card">
          <div className="users-card-head">
            <h2>User List</h2>
            <button
              className="card-close"
              aria-label="Close list"
              onClick={() => setShowList(false)}
              title="Close list"
            >
              ×
            </button>
          </div>

          <div className="table-wrap">
            <table className="users-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No users yet
                    </td>
                  </tr>
                ) : (
                  users.map((u, i) => (
                    <tr key={u.id || i}>
                      <td>{i + 1}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                      <td>{u.role}</td>
                      <td>{u.city}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal for Create New User */}
      {openForm && (
        <div className="modal-backdrop" onClick={() => setOpenForm(false)}>
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <button
              className="modal-close"
              aria-label="Close"
              onClick={() => setOpenForm(false)}
            >
              ×
            </button>
            <h2>Create New User</h2>

            <form onSubmit={onSubmit} className="users-form">
              <div className="field">
                <label>Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="John Doe"
                />
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="john@example.com"
                />
              </div>
              <div className="field">
                <label>Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="+91-..."
                />
              </div>
              <div className="field">
                <label>Role</label>
                <input
                  name="role"
                  value={form.role}
                  onChange={onChange}
                  placeholder="Engineer"
                />
              </div>
              <div className="field">
                <label>City</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={onChange}
                  placeholder="Hyderabad"
                />
              </div>

              {err && <div className="error">{err}</div>}

              <div className="form-actions">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setOpenForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn primary"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
