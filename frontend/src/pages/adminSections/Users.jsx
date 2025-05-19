import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useAdmin } from "../../fetch/useAdmin";
import { useEffect } from "react";
import { DeleteConfirmation } from "../../components";
import { useUserAuth } from "../../fetch/useUserAuth";

const Users = () => {
  const {
    users,
    getUsers,
    isFetchLoading,
    deleteUsers,
    updateUserRole,
    isLoading,
  } = useAdmin();
  const { user: currentUser } = useUserAuth();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [pendingChanges, setPendingChanges] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user._id.toLowerCase().includes(query) ||
      user.fullname.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  const formatDateTime = (isoString) => {
    const dt = new Date(isoString);
    return dt.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getEmptyStateMessage = () => {
    if (currentUser.role === "supervisor") {
      return "No customers available";
    }
    if (currentUser.role === "admin") {
      return "No customers or supervisors available";
    }
    return "No users available";
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedUsers.length === 0) return;
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUsers(selectedUsers);
      setSelectedUsers([]);
      setSelectAll(false);
      setShowConfirmModal(false);
    } catch (error) {
      console.error("Failed to delete users:", error);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user._id));
    }
    setSelectAll(!selectAll);
  };

  const handleRoleChange = (userId, newRole) => {
    setUserState((prev) =>
      prev.map((e) => (e.id === userId ? { ...e, role: newRole } : e))
    );
  };

  const initiateRoleChange = (userId, newRole) => {
    setPendingChanges({
      ...pendingChanges,
      [userId]: newRole,
    });
  };

  const confirmRoleChange = async (userId) => {
    try {
      await updateUserRole(userId, pendingChanges[userId]);
      const updatedChanges = { ...pendingChanges };
      delete updatedChanges[userId];
      setPendingChanges(updatedChanges);
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  const cancelRoleChange = (userId) => {
    const updatedChanges = { ...pendingChanges };
    delete updatedChanges[userId];
    setPendingChanges(updatedChanges);
  };

  const isDeleteDisabled = selectedUsers.length === 0;

  return (
    <section className="flex flex-col h-screen w-full bg-gray-100 p-10 gap-5">
      <h1 className="text-3xl font-bold">Customers</h1>
      <div className="bg-gray-100 md:bg-base-100 md:rounded-box md:shadow-md h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex flex-col md:flex-row gap-5 justify-between items-center px-10 py-5">
          <p className="text-xl font-bold text-gray-700">
            All Customer List:{" "}
            <span className="text-xl text-gray-400">
              {filteredUsers.length}
            </span>
            {selectedUsers.length > 0 && (
              <span className="text-xl text-secondary">
                {" "}
                ({selectedUsers.length} selected)
              </span>
            )}
          </p>
          <div className="flex flex-row gap-5">
            <button
              className={`btn btn-error ${
                isDeleteDisabled ? "opacity-50" : ""
              }`}
              onClick={handleDeleteSelected}
              disabled={isDeleteDisabled || isLoading}
            >
              <MdDelete size={20} />
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <span>
                  Delete
                  {selectedUsers.length > 0 ? ` (${selectedUsers.length})` : ""}
                </span>
              )}
            </button>
            <label className="input lg:w-64">
              <svg
                className="h-4 opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                placeholder="Search by ID, name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full focus:outline-none"
              />
            </label>
          </div>
        </div>

        {isFetchLoading ? (
          <div className="flex justify-center items-center h-full">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full">
            <div className="text-center py-8">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {getEmptyStateMessage()}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {currentUser.role === "supervisor"
                  ? "No customers have been added to your account yet."
                  : "No users have been added to the system yet."}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto flex-1 pl-10 pr-5 hidden md:block">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-info"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th>Customer ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date Joining</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className={
                        selectedUsers.includes(user._id) ? "bg-base-200" : ""
                      }
                    >
                      <th>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-info"
                          checked={selectedUsers.includes(user._id)}
                          onChange={() => handleSelectUser(user._id)}
                        />
                      </th>
                      <td className="tabular-nums font-medium">{user._id}</td>
                      <td>{user.fullname}</td>
                      <td>{user.email}</td>
                      <td>{formatDateTime(user.createdAt)}</td>
                      <td className="w-50">
                        <select
                          className="select select-bordered select-sm w-full"
                          value={pendingChanges[user._id] || user.role}
                          onChange={(e) =>
                            initiateRoleChange(user._id, e.target.value)
                          }
                          disabled={isLoading}
                        >
                          <option value="user">Customer</option>
                          <option value="supervisor">Supervisor</option>
                        </select>
                        {pendingChanges[user._id] && (
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs">
                              Change to{" "}
                              <span className="font-semibold">
                                {pendingChanges[user._id]}
                              </span>
                              ?
                            </span>
                            <div className="flex gap-1">
                              <button
                                className="btn btn-xs btn-success"
                                onClick={() => confirmRoleChange(user._id)}
                                disabled={isLoading}
                              >
                                {isLoading ? (
                                  <span className="loading loading-spinner loading-xs"></span>
                                ) : (
                                  "✓"
                                )}
                              </button>
                              <button
                                className="btn btn-xs btn-error"
                                onClick={() => cancelRoleChange(user._id)}
                                disabled={isLoading}
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4 px-4 py-2 overflow-y-auto">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className={`card bg-base-100 shadow-sm ${
                    selectedUsers.includes(user._id)
                      ? "border-2 border-info"
                      : ""
                  }`}
                >
                  <div className="p-4 pb-0">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-info"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => handleSelectUser(user._id)}
                    />
                  </div>
                  <div className="card-body">
                    <div className="flex flex-col gap-2">
                      <h2 className="card-title">{user._id}</h2>
                      <div className="badge p-3 badge-primary">{user.role}</div>
                    </div>
                    <div className="divide-y">
                      <div className="py-2">
                        <p className="text-sm font-medium">Customer</p>
                        <p className="text-lg">{user.fullname}</p>
                      </div>
                      <div className="py-2">
                        <p className="text-sm font-medium">Date</p>
                        <p>{formatDateTime(user.createdAt)} </p>
                      </div>
                    </div>
                    <div className="card-actions justify-between">
                      <select
                        className="select select-bordered select-sm"
                        value={pendingChanges[user._id] || user.status}
                        onChange={(e) =>
                          initiateStatusChange(user._id, e.target.value)
                        }
                      >
                        <option>Customer</option>
                        <option>Admin</option>
                        <option>Supervisor</option>
                      </select>
                    </div>
                    {pendingChanges[user._id] && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs">
                          Change to{" "}
                          <span className="font-semibold">
                            {pendingChanges[user._id]}
                          </span>
                          ?
                        </span>
                        <div className="flex gap-1">
                          <button
                            className="btn btn-xs btn-success"
                            onClick={() => confirmStatusChange(user._id)}
                          >
                            ✓
                          </button>
                          <button
                            className="btn btn-xs btn-error"
                            onClick={() => cancelStatusChange(user._id)}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  {searchQuery
                    ? "No users found matching your search"
                    : "No users available"}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <DeleteConfirmation
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
        selectedOrders={selectedUsers}
        confirmDelete={confirmDelete}
        sectionName="user"
        isLoading={isLoading}
      />
    </section>
  );
};

export default Users;
