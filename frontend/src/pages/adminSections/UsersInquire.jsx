import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";
import { DeleteConfirmation } from "../../components";
import { useUserInquire } from "../../fetch/useUserInquire";
import { MessageModal } from "../../components";
import toast from "react-hot-toast";

const UsersInquire = () => {
  const {
    userInquires,
    isLoading,
    isFetchLoading,
    getUserInquires,
    deleteUserInquire,
  } = useUserInquire();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [selectedMessage, setSelectedMessage] = useState("");
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUserInquires();
  }, [getUserInquires]);

  const filteredUsers = (userInquires || []).filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user._id?.toLowerCase().includes(query) ||
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
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

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setIsMessageModalOpen(true);
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
    if (selectedUsers.length === 0) {
      toast.error("Please select inquiries to delete");
      return;
    }

    try {
      await deleteUserInquire(selectedUsers);
      setSelectedUsers([]);
      setSelectAll(false);
      setShowConfirmModal(false);
    } catch (error) {
      toast.error("Failed to delete inquiries:", error);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(userInquires.map((user) => user._id));
    }
    setSelectAll(!selectAll);
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
        ) : userInquires?.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full">
            <div className="text-center py-8">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No inquiries available
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery
                  ? "No inquiries found matching your search"
                  : "No inquiries have been submitted yet"}
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
                    <th>Phone</th>
                    <th>Message</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((inquiry) => (
                    <tr
                      key={inquiry._id}
                      className={
                        selectedUsers.includes(inquiry._id) ? "bg-base-200" : ""
                      }
                    >
                      <th>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-info"
                          checked={selectedUsers.includes(inquiry._id)}
                          onChange={() => handleSelectUser(inquiry._id)}
                        />
                      </th>
                      <td className="tabular-nums font-medium">
                        {inquiry._id}
                      </td>
                      <td>{inquiry.name}</td>
                      <td>{inquiry.email}</td>
                      <td>0{inquiry.phone}</td>
                      <td>
                        <button
                          onClick={() => handleViewMessage(inquiry.message)}
                          className="btn btn-sm btn-secondary"
                        >
                          Check Message
                        </button>
                      </td>
                      <td>{formatDateTime(inquiry.createdAt)}</td>
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
                    <div className="flex justify-between items-center">
                      <h2 className="card-title">{user._id}</h2>
                    </div>
                    <div className="divide-y">
                      <div className="py-2">
                        <p className="text-sm font-medium">Customer</p>
                        <p className="text-lg">{user.name}</p>
                      </div>
                      <div className="py-2">
                        <p className="text-sm font-medium">Date</p>
                        <p>{formatDateTime(user.createdAt)} </p>
                      </div>
                      <div className="py-2">
                        <p className="text-sm font-medium mb-2">Message</p>
                        <button
                          onClick={() => handleViewMessage(user.message)}
                          className="btn btn-sm btn-secondary w-full justify-center"
                        >
                          Check Message
                        </button>
                      </div>
                    </div>
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

      <MessageModal
        isOpen={isMessageModalOpen}
        setIsOpen={setIsMessageModalOpen}
        message={selectedMessage}
      />
    </section>
  );
};

export default UsersInquire;
