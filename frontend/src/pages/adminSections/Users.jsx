import { useState } from "react";
import { MdDelete } from "react-icons/md";

const Users = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "K9b3g@example.com",
      date: "2025-04-26",
      role: "Customer",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "K9b3g@example.com",
      date: "2025-04-22",
      role: "Supervisor",
    },
  ]);

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedUsers.length === 0) {
      return;
    }

    const remainingUsers = users.filter(
      (users) => !selectedUsers.includes(users.id)
    );

    setUsers(remainingUsers);
    setSelectedUsers([]);
    setSelectAll(false);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
    setSelectAll(!selectAll);
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((e) => (e.id === userId ? { ...e, role: newRole } : e))
    );
  };

  const isDeleteDisabled = selectedUsers.length === 0;

  return (
    <section className="flex flex-col h-screen w-full bg-gray-100 p-10 gap-5">
      <h1 className="text-3xl font-bold">Customers</h1>
      <div className="bg-gray-100 md:bg-base-100 md:rounded-box md:shadow-md h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex flex-col md:flex-row gap-5 justify-between items-center px-10 py-5">
          <p className="text-xl font-bold text-gray-700">
            All Customer List:{" "}
            <span className="text-xl text-gray-400">{users.length}</span>
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
              disabled={isDeleteDisabled}
            >
              <MdDelete size={20} />
              <span>
                Delete
                {selectedUsers.length > 0 ? ` (${selectedUsers.length})` : ""}
              </span>
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
              <input type="search" placeholder="Search" />
            </label>
          </div>
        </div>

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
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className={
                    selectedUsers.includes(user.id) ? "bg-base-200" : ""
                  }
                >
                  <th>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-info"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </th>
                  <td className="tabular-nums font-medium">{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.date}</td>
                  <td className="w-50">
                    <select
                      className="select select-bordered select-sm w-full"
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                    >
                      <option>Customer</option>
                      <option>Supervisor</option>
                      <option>Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4 px-4 py-2 overflow-y-auto">
          {users.map((user) => (
            <div
              className={`card bg-base-100 shadow-sm ${
                selectedUsers.includes(user.id) ? "border-2 border-info" : ""
              }`}
              key={user.id}
            >
              <div className="p-4 pb-0">
                <input
                  type="checkbox"
                  className="checkbox checkbox-info"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleSelectUser(user.id)}
                />
              </div>
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <h2 className="card-title">{user.id}</h2>
                  <div className="badge p-3 badge-primary">{user.role}</div>
                </div>
                <div className="divide-y">
                  <div className="py-2">
                    <p className="text-sm font-medium">Customer</p>
                    <p className="text-lg">{user.name}</p>
                  </div>
                  <div className="py-2">
                    <p className="text-sm font-medium">Date</p>
                    <p>{user.date}</p>
                  </div>
                </div>
                <div className="card-actions justify-between">
                  <select
                    className="select select-bordered select-sm"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option>Customer</option>
                    <option>Admin</option>
                    <option>Supervisor</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          {users.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No users available
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Users;
