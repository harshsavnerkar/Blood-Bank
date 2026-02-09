import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Users,
  UserCheck,
  UserX,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Droplets,
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText,
  Download,
  ExternalLink,
} from "lucide-react";
import ThemeLanguageToggle from "../components/common/ThemeLanguageToggle";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  // Mock data for registered users with proof documents
  const [registeredUsers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@gmail.com",
      phone: "+1 234 567 8900",
      bloodType: "O+",
      location: "New York, NY",
      registrationDate: "2024-01-15",
      status: "pending",
      lastDonation: "2023-12-01",
      proofDocument: {
        name: "Blood_Group_Certificate_John_Smith.pdf",
        url: "/mock-pdfs/john_smith_certificate.pdf",
        uploadedAt: "2024-01-15",
      },
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@gmail.com",
      phone: "+1 345 678 9012",
      bloodType: "A-",
      location: "Los Angeles, CA",
      registrationDate: "2024-01-10",
      status: "approved",
      lastDonation: "2024-01-05",
      proofDocument: {
        name: "Medical_Report_Sarah_Johnson.pdf",
        url: "/mock-pdfs/sarah_johnson_report.pdf",
        uploadedAt: "2024-01-10",
      },
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@email.com",
      phone: "+1 456 789 0123",
      bloodType: "B+",
      location: "Chicago, IL",
      registrationDate: "2024-01-20",
      status: "pending",
      lastDonation: null,
      proofDocument: null, // No document uploaded yet
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@mail.com",
      phone: "+1 567 890 1234",
      bloodType: "AB+",
      location: "Houston, TX",
      registrationDate: "2024-01-05",
      status: "approved",
      lastDonation: "2023-11-20",
      proofDocument: {
        name: "Lab_Report_Emily_Davis.pdf",
        url: "/mock-pdfs/emily_davis_certificate.pdf",
        uploadedAt: "2024-01-05",
      },
    },
  ]);

  // Mock data for blood donation requests
  const [donationRequests] = useState([
    {
      id: 1,
      patientName: "Robert Wilson",
      bloodType: "O+",
      unitsNeeded: 2,
      hospital: "City General Hospital",
      location: "New York, NY",
      urgency: "high",
      requestDate: "2024-01-22",
      contact: "+1 234 567 8900",
      status: "pending",
    },
    {
      id: 2,
      patientName: "Lisa Anderson",
      bloodType: "A-",
      unitsNeeded: 1,
      hospital: "Medical Center",
      location: "Los Angeles, CA",
      urgency: "medium",
      requestDate: "2024-01-21",
      contact: "+1 345 678 9012",
      status: "approved",
    },
    {
      id: 3,
      patientName: "David Miller",
      bloodType: "B+",
      unitsNeeded: 3,
      hospital: "Regional Hospital",
      location: "Chicago, IL",
      urgency: "critical",
      requestDate: "2024-01-23",
      contact: "+1 456 789 0123",
      status: "pending",
    },
  ]);

  const handleUserApproval = (userId, approve) => {
    // Mock approval logic
    console.log(`${approve ? "Approved" : "Rejected"} user ID: ${userId}`);
    // In real app, you would update the user status in the backend
  };

  const handleRequestApproval = (requestId, approve) => {
    // Mock approval logic
    console.log(
      `${approve ? "Approved" : "Rejected"} request ID: ${requestId}`
    );
    // In real app, you would update the request status in the backend
  };

  const viewUserProof = (user) => {
    setSelectedUser(user);
    setShowPDFViewer(true);
  };

  const downloadUserProof = (user) => {
    if (user.proofDocument) {
      // For demo purposes, we'll create a simple PDF viewer
      const newWindow = window.open("", "_blank");
      newWindow.document.write(`
        <html>
          <head>
            <title>${user.proofDocument.name}</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                margin: 40px; 
                background: #f5f5f5;
              }
              .document { 
                background: white; 
                padding: 30px; 
                border: 1px solid #ddd;
                border-radius: 5px;
                max-width: 800px;
                margin: 0 auto;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              }
              h1 { color: #d32f2f; text-align: center; }
              h2 { color: #333; border-bottom: 1px solid #d32f2f; padding-bottom: 10px; }
              .section { margin: 20px 0; }
              .label { font-weight: bold; color: #555; }
            </style>
          </head>
          <body>
            <div class="document">
              <h1>🩸 BLOOD GROUP DOCUMENT</h1>
              <div class="section">
                <h2>DOCUMENT INFORMATION</h2>
                <p><span class="label">Patient:</span> ${user.name}</p>
                <p><span class="label">Blood Type:</span> ${user.bloodType}</p>
                <p><span class="label">Document:</span> ${user.proofDocument.name}</p>
                <p><span class="label">Uploaded:</span> ${user.proofDocument.uploadedAt}</p>
              </div>
              <div class="section">
                <h2>NOTE</h2>
                <p>In a real application, this would display the actual PDF document content.</p>
                <p>This is a mock representation for demonstration purposes.</p>
              </div>
            </div>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "rejected":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "critical":
        return "text-red-600";
      case "high":
        return "text-orange-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const filteredUsers = registeredUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.bloodType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredRequests = donationRequests.filter((request) => {
    const matchesSearch =
      request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.bloodType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || request.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Heart className="w-8 h-8 text-red-500" />
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Admin Dashboard
                </h1>
                <p className="text-gray-300">Blood Bank Management System</p>
              </div>
            </div>
            <ThemeLanguageToggle />
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-8 border-b border-gray-700">
            <button
              onClick={() => setActiveTab("users")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "users"
                  ? "border-red-500 text-red-400"
                  : "border-transparent text-gray-400 hover:text-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Registered Users</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "requests"
                  ? "border-red-500 text-red-400"
                  : "border-transparent text-gray-400 hover:text-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Droplets className="w-5 h-5" />
                <span>Blood Requests</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            <input
              type="text"
              placeholder="Search by name, email, or blood type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-600 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-black" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-black focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Users Tab */}
        {activeTab === "users" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Registered Users
            </h2>
            <div className="grid gap-6">
              {filteredUsers.map((user) => (
                <motion.div
                  key={user.id}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-black">
                          {user.name}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            user.status
                          )}`}
                        >
                          {user.status.charAt(0).toUpperCase() +
                            user.status.slice(1)}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-black" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-black" />
                          <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Droplets className="w-4 h-4 text-black" />
                          <span>
                            Blood Type:{" "}
                            <span className="text-red-600 font-medium">
                              {user.bloodType}
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-black" />
                          <span>{user.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-black" />
                          <span>Registered: {user.registrationDate}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Heart className="w-4 h-4 text-black" />
                          <span>
                            {user.lastDonation
                              ? `Last Donation: ${user.lastDonation}`
                              : "No previous donations"}
                          </span>
                        </div>
                      </div>

                      {/* Blood Group Proof Section */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-medium text-black mb-2">
                          Blood Group Proof:
                        </h4>
                        {user.proofDocument ? (
                          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <FileText className="w-5 h-5 text-red-500" />
                              <div>
                                <p className="text-black font-medium">
                                  {user.proofDocument.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Uploaded: {user.proofDocument.uploadedAt}
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => viewUserProof(user)}
                                className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                              >
                                <Eye className="w-4 h-4" />
                                <span>View</span>
                              </button>
                              <button
                                onClick={() => downloadUserProof(user)}
                                className="flex items-center space-x-1 text-green-600 hover:text-green-800 text-sm"
                              >
                                <Download className="w-4 h-4" />
                                <span>Download</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm">
                            No proof document uploaded
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {user.status === "pending" && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleUserApproval(user.id, true)}
                            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            <UserCheck className="w-4 h-4" />
                            <span>Approve</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleUserApproval(user.id, false)}
                            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            <UserX className="w-4 h-4" />
                            <span>Reject</span>
                          </motion.button>
                        </>
                      )}
                      {user.status === "approved" && (
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <span>Approved</span>
                        </div>
                      )}
                      {user.status === "rejected" && (
                        <div className="flex items-center space-x-2 text-red-600">
                          <XCircle className="w-5 h-5" />
                          <span>Rejected</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Requests Tab */}
        {activeTab === "requests" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Blood Donation Requests
            </h2>
            <div className="grid gap-6">
              {filteredRequests.map((request) => (
                <motion.div
                  key={request.id}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-black">
                          {request.patientName}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(
                            request.urgency
                          )}`}
                        >
                          {request.urgency.charAt(0).toUpperCase() +
                            request.urgency.slice(1)}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            request.status
                          )}`}
                        >
                          {request.status.charAt(0).toUpperCase() +
                            request.status.slice(1)}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
                        <div className="flex items-center space-x-2">
                          <Droplets className="w-4 h-4 text-black" />
                          <span>
                            Required:{" "}
                            <span className="text-red-600 font-medium">
                              {request.bloodType}
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Heart className="w-4 h-4 text-black" />
                          <span>Units Needed: {request.unitsNeeded}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-black" />
                          <span>
                            {request.hospital}, {request.location}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-black" />
                          <span>{request.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-black" />
                          <span>Requested: {request.requestDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {request.status === "pending" && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              handleRequestApproval(request.id, true)
                            }
                            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Approve</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              handleRequestApproval(request.id, false)
                            }
                            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Reject</span>
                          </motion.button>
                        </>
                      )}
                      {request.status === "approved" && (
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <span>Approved</span>
                        </div>
                      )}
                      {request.status === "rejected" && (
                        <div className="flex items-center space-x-2 text-red-600">
                          <XCircle className="w-5 h-5" />
                          <span>Rejected</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Document Viewer Modal */}
      {showPDFViewer && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-black">
                Blood Group Proof: {selectedUser.name}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => downloadUserProof(selectedUser)}
                  className="flex items-center space-x-1 text-green-600 hover:text-green-800"
                >
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => setShowPDFViewer(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-4 bg-gray-100">
              <div className="bg-white border border-gray-300 rounded-lg h-[70vh] overflow-auto">
                <div className="p-6">
                  <div className="text-center mb-6">
                    <FileText className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-black mb-2">
                      Blood Group Certificate
                    </h4>
                    <p className="text-gray-600">
                      Patient: {selectedUser.name}
                    </p>
                    <p className="text-gray-600">
                      Blood Type: {selectedUser.bloodType}
                    </p>
                  </div>

                  <div className="text-left space-y-4 text-black">
                    <div>
                      <h5 className="font-semibold text-lg mb-2">
                        Patient Information
                      </h5>
                      <p>
                        <strong>Name:</strong> {selectedUser.name}
                      </p>
                      <p>
                        <strong>Blood Type:</strong>{" "}
                        <span className="text-red-600 font-medium">
                          {selectedUser.bloodType}
                        </span>
                      </p>
                      <p>
                        <strong>Registration Date:</strong>{" "}
                        {selectedUser.registrationDate}
                      </p>
                    </div>

                    <div>
                      <h5 className="font-semibold text-lg mb-2">
                        Document Details
                      </h5>
                      <p>
                        This is a mock blood group certificate for demonstration
                        purposes.
                      </p>
                      <p>
                        The document confirms the blood type as verified by
                        medical professionals.
                      </p>
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Note:</strong> In a real application, this
                          would display the actual PDF document content.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        <strong>Document:</strong>{" "}
                        {selectedUser.proofDocument?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Uploaded:</strong>{" "}
                        {selectedUser.proofDocument?.uploadedAt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
