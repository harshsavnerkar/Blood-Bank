import React, { useState } from "react";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import {
  Heart,
  User,
  Droplets,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Plus,
  Search,
  Filter,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
} from "lucide-react";
import ThemeLanguageToggle from "../components/common/ThemeLanguageToggle";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [searchTerm, setSearchTerm] = useState("");
  const [bloodGroupProof, setBloodGroupProof] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(""); // 'success', 'error', 'uploading'

  // Mock user data with PDF links
  const [userData] = useState({
    name: "John Smith",
    email: "john.smith@gmail.com",
    phone: "+1 234 567 8900",
    bloodType: "O+",
    location: "New York, NY",
    lastDonation: "2023-12-01",
    totalDonations: 3,
    nextEligibleDate: "2024-03-01",
    proofStatus: "pending", // 'pending', 'approved', 'rejected',
    proofDocument: {
      name: "Blood_Group_Certificate_John_Smith.pdf",
      url: "/mock-pdfs/john_smith_certificate.pdf",
      uploadedAt: "2024-01-15",
    },
  });

  // Mock donation history
  const [donationHistory] = useState([
    {
      id: 1,
      date: "2023-12-01",
      location: "City Blood Bank",
      units: 1,
      status: "completed",
    },
    {
      id: 2,
      date: "2023-09-15",
      location: "Regional Hospital",
      units: 1,
      status: "completed",
    },
    {
      id: 3,
      date: "2023-06-20",
      location: "Community Center",
      units: 1,
      status: "completed",
    },
  ]);

  // Mock available donation opportunities
  const [donationOpportunities] = useState([
    {
      id: 1,
      title: "Community Blood Drive",
      date: "2024-02-15",
      time: "9:00 AM - 4:00 PM",
      location: "Central Park Community Center",
      organizer: "NYC Blood Bank",
      contact: "+1 212 555 0123",
    },
    {
      id: 2,
      title: "Hospital Blood Collection",
      date: "2024-02-20",
      time: "10:00 AM - 6:00 PM",
      location: "General Hospital",
      organizer: "Medical Center",
      contact: "+1 212 555 0456",
    },
    {
      id: 3,
      title: "Mobile Blood Unit",
      date: "2024-02-25",
      time: "8:00 AM - 5:00 PM",
      location: "Downtown Plaza",
      organizer: "Regional Blood Services",
      contact: "+1 212 555 0789",
    },
  ]);

  const filteredOpportunities = donationOpportunities.filter(
    (opportunity) =>
      opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.organizer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if file is PDF
      if (file.type !== "application/pdf") {
        setUploadStatus("error");
        alert("Please upload a PDF file only");
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUploadStatus("error");
        alert("File size should be less than 5MB");
        return;
      }

      setUploadStatus("uploading");

      // Simulate upload process
      setTimeout(() => {
        setBloodGroupProof({
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(2) + " MB",
          url: URL.createObjectURL(file),
          uploadedAt: new Date().toLocaleDateString(),
        });
        setUploadStatus("success");
        userData.proofStatus = "pending";
      }, 2000);
    }
  };

  const generateBloodGroupPDF = () => {
    // Create a new PDF document
    const doc = new jsPDF();

    // Set document properties
    doc.setProperties({
      title: `Blood Group Certificate - ${userData.name}`,
      subject: "Blood Group Verification Certificate",
      author: "LifeShare Blood Bank Management System",
      keywords: "blood group, certificate, medical, verification",
      creator: "LifeShare System",
    });

    // Add header
    doc.setFillColor(211, 47, 47); // Red background
    doc.rect(0, 0, 210, 25, "F"); // Full width header

    doc.setTextColor(255, 255, 255); // White text
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("BLOOD GROUP CERTIFICATE", 105, 17, { align: "center" });

    // Reset text color
    doc.setTextColor(0, 0, 0); // Black text

    // Add logo/medical symbol
    doc.setFontSize(40);
    doc.setTextColor(211, 47, 47); // Red color
    doc.text("🩸", 105, 45, { align: "center" });

    // Reset text color
    doc.setTextColor(0, 0, 0);

    // Patient Information Section
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("PATIENT INFORMATION", 20, 65);

    doc.setLineWidth(0.5);
    doc.line(20, 67, 190, 67); // Underline

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${userData.name}`, 20, 77);
    doc.text("Patient ID: BG2024001", 20, 85);
    doc.text("Date of Birth: March 15, 1992", 20, 93);
    doc.text(`Blood Type: ${userData.bloodType}`, 20, 101);
    doc.setTextColor(211, 47, 47); // Red for blood type
    doc.setFont("helvetica", "bold");
    doc.text(userData.bloodType, 45, 101);
    doc.setTextColor(0, 0, 0); // Reset to black
    doc.setFont("helvetica", "normal");
    doc.text("Rh Factor: Positive", 20, 109);

    // Testing Details Section
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("TESTING DETAILS", 20, 129);

    doc.setLineWidth(0.5);
    doc.line(20, 131, 190, 131); // Underline

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Laboratory: NYC Medical Diagnostic Center", 20, 141);
    doc.text("Address: 123 Health Street, New York, NY 10001", 20, 149);
    doc.text("Test Date: January 12, 2024", 20, 157);
    doc.text("Report Date: January 15, 2024", 20, 165);

    // Technical Results Section
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("TECHNICAL RESULTS", 20, 185);

    doc.setLineWidth(0.5);
    doc.line(20, 187, 190, 187); // Underline

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`ABO Grouping: Group ${userData.bloodType.charAt(0)}`, 20, 197);
    doc.text("Forward Typing: Anti-A (-), Anti-B (-), Anti-AB (-)", 20, 205);
    doc.text("Reverse Typing: A Cells (+), B Cells (+), O Cells (-)", 20, 213);
    doc.text("Rh Typing: Anti-D (+)", 20, 221);
    doc.text("Antigen Status: D antigen present", 20, 229);

    // Quality Control Section
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("QUALITY CONTROL", 20, 249);

    doc.setLineWidth(0.5);
    doc.line(20, 251, 190, 251); // Underline

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Controls: Within acceptable limits", 20, 261);
    doc.text("Methods: Automated analyzer with manual confirmation", 20, 269);
    doc.text("Technician: Dr. Michael Reynolds", 20, 277);

    // Add second page for certification
    doc.addPage();

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("CERTIFICATION", 20, 30);

    doc.setLineWidth(0.5);
    doc.line(20, 32, 190, 32); // Underline

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const certificationText = [
      `This certifies that the blood group typing for ${userData.name}`,
      "has been performed in accordance with AABB standards and",
      "confirmed by appropriate quality control measures.",
      "",
      `This individual is classified as ${userData.bloodType} blood type`,
      "and is eligible for blood donation.",
    ];

    let yPos = 45;
    certificationText.forEach((line) => {
      doc.text(line, 20, yPos);
      yPos += 8;
    });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("---", 105, 270, { align: "center" });
    doc.text("LifeShare Blood Bank Management System", 105, 277, {
      align: "center",
    });
    doc.text("Mock Certificate - Demonstration Purposes", 105, 282, {
      align: "center",
    });
    doc.text("Certificate ID: CERT-BG-2024-001", 105, 287, { align: "center" });

    // Save the PDF
    doc.save(`Blood_Group_Certificate_${userData.name.replace(" ", "_")}.pdf`);
  };

  const viewMockCertificate = () => {
    // Open the mock certificate in a new tab (HTML version)
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Blood Group Certificate - ${userData.name}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 40px; 
              background: #f5f5f5;
            }
            .certificate { 
              background: white; 
              padding: 30px; 
              border: 2px solid #ddd;
              border-radius: 10px;
              max-width: 800px;
              margin: 0 auto;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            h1 { color: #d32f2f; text-align: center; }
            h2 { color: #333; border-bottom: 2px solid #d32f2f; padding-bottom: 10px; }
            .section { margin: 20px 0; }
            .label { font-weight: bold; color: #555; }
            pre { 
              background: #f8f8f8; 
              padding: 15px; 
              border-radius: 5px;
              white-space: pre-wrap;
              font-family: 'Courier New', monospace;
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <h1>🩸 BLOOD GROUP CERTIFICATE</h1>
            <div class="section">
              <h2>PATIENT INFORMATION</h2>
              <p><span class="label">Name:</span> ${userData.name}</p>
              <p><span class="label">Patient ID:</span> BG2024001</p>
              <p><span class="label">Blood Type:</span> <span style="color: #d32f2f; font-weight: bold;">${
                userData.bloodType
              }</span></p>
              <p><span class="label">Rh Factor:</span> Positive</p>
            </div>
            <div class="section">
              <h2>TESTING DETAILS</h2>
              <p><span class="label">Laboratory:</span> NYC Medical Diagnostic Center</p>
              <p><span class="label">Test Date:</span> January 12, 2024</p>
              <p><span class="label">Report Date:</span> January 15, 2024</p>
            </div>
            <div class="section">
              <h2>TECHNICAL RESULTS</h2>
              <p><span class="label">ABO Grouping:</span> Group ${userData.bloodType.charAt(
                0
              )}</p>
              <p><span class="label">Rh Typing:</span> Anti-D (+)</p>
              <p><span class="label">Antigen Status:</span> D antigen present</p>
            </div>
            <div class="section">
              <h2>CERTIFICATION</h2>
              <p>This certifies that the blood group typing for ${
                userData.name
              } has been performed in accordance with AABB standards and confirmed by appropriate quality control measures.</p>
              <p>This individual is classified as <span style="color: #d32f2f; font-weight: bold;">${
                userData.bloodType
              }</span> blood type and is eligible for blood donation.</p>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #777;">
              <p>LifeShare Blood Bank Management System</p>
              <p>Mock Certificate - Demonstration Purposes</p>
              <p>Certificate ID: CERT-BG-2024-001</p>
            </div>
          </div>
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  const getProofStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-100";
      case "rejected":
        return "text-red-600 bg-red-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getProofStatusText = (status) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      case "pending":
        return "Pending Review";
      default:
        return "Not Uploaded";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Heart className="w-8 h-8 text-red-500" />
              <div>
                <h1 className="text-2xl font-bold text-black">
                  User Dashboard
                </h1>
                <p className="text-gray-600">Blood Bank Management System</p>
              </div>
            </div>
            <ThemeLanguageToggle />
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "profile"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>My Profile</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "history"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Donation History</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("opportunities")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "opportunities"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Droplets className="w-5 h-5" />
                <span>Donate Blood</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-black mb-6">My Profile</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-12 h-12 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-black">
                      {userData.name}
                    </h3>
                    <p className="text-gray-600">Blood Donor</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-black" />
                      <span className="text-black">{userData.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-black" />
                      <span className="text-black">{userData.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Droplets className="w-5 h-5 text-red-500" />
                      <span className="text-black">
                        Blood Type:{" "}
                        <span className="font-semibold text-red-600">
                          {userData.bloodType}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-black" />
                      <span className="text-black">{userData.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats and Info */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <h4 className="text-lg font-semibold text-black mb-4">
                      Donation Statistics
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-black">Total Donations</span>
                        <span className="font-bold text-red-600">
                          {userData.totalDonations}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Last Donation</span>
                        <span className="font-medium">
                          {userData.lastDonation}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Next Eligible Date</span>
                        <span className="font-medium text-green-600">
                          {userData.nextEligibleDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <h4 className="text-lg font-semibold text-black mb-4">
                      Blood Type Info
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-black">Can Donate To:</span>
                        <p className="font-medium text-black">
                          O+, A+, B+, AB+
                        </p>
                      </div>
                      <div>
                        <span className="text-black">Can Receive From:</span>
                        <p className="font-medium text-black">O+, O-</p>
                      </div>
                      <div className="mt-4 p-3 bg-red-50 rounded-lg">
                        <p className="text-sm text-red-800">
                          <span className="font-semibold">
                            Universal Donor:
                          </span>{" "}
                          Your O+ blood can help many patients in emergencies.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blood Group Proof Upload Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-8">
                  <h4 className="text-lg font-semibold text-black mb-4">
                    Blood Group Proof Document
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Download or upload your official blood group certificate
                    (PDF only, max 5MB)
                  </p>

                  <div className="flex items-center space-x-4 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getProofStatusColor(
                        userData.proofStatus
                      )}`}
                    >
                      {getProofStatusText(userData.proofStatus)}
                    </span>
                    {userData.proofStatus === "rejected" && (
                      <span className="text-red-600 text-sm">
                        Please upload a valid document
                      </span>
                    )}
                  </div>

                  {userData.proofDocument ? (
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-red-500" />
                          <div>
                            <p className="font-medium text-black">
                              {userData.proofDocument.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              Uploaded: {userData.proofDocument.uploadedAt}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={viewMockCertificate}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
                          >
                            <FileText className="w-4 h-4" />
                            <span>View</span>
                          </button>
                          <a
                            href={userData.proofDocument.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center space-x-1"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-400 transition-colors mb-4">
                      <input
                        type="file"
                        id="blood-proof-upload"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="blood-proof-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <Upload className="w-12 h-12 text-gray-400 mb-3" />
                        <p className="text-black font-medium mb-1">
                          Click to upload PDF
                        </p>
                        <p className="text-gray-600 text-sm">
                          or drag and drop
                        </p>
                        <p className="text-gray-500 text-xs mt-2">
                          PDF up to 5MB
                        </p>
                      </label>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={generateBloodGroupPDF}
                      className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Generate PDF Certificate</span>
                    </button>
                    <button
                      onClick={viewMockCertificate}
                      className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View Certificate</span>
                    </button>
                  </div>

                  {uploadStatus === "uploading" && (
                    <div className="mt-4 flex items-center space-x-2 text-blue-600">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>Uploading document...</span>
                    </div>
                  )}

                  {uploadStatus === "success" && (
                    <div className="mt-4 flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span>
                        Document uploaded successfully! Awaiting admin review.
                      </span>
                    </div>
                  )}

                  {uploadStatus === "error" && (
                    <div className="mt-4 flex items-center space-x-2 text-red-600">
                      <AlertCircle className="w-5 h-5" />
                      <span>Upload failed. Please try again.</span>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-semibold text-black mb-4">
                    Quick Actions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Request Blood</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors"
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Schedule Donation</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-black mb-6">
              Donation History
            </h2>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-black mb-2">
                  Your Donation Records
                </h3>
                <p className="text-gray-600">
                  Complete history of your blood donations
                </p>
              </div>
              <div className="divide-y divide-gray-200">
                {donationHistory.map((donation) => (
                  <div
                    key={donation.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Calendar className="w-5 h-5 text-black" />
                          <span className="font-medium text-black">
                            {donation.date}
                          </span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {donation.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-black">
                          <MapPin className="w-4 h-4" />
                          <span>{donation.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Droplets className="w-5 h-5 text-red-500" />
                        <span className="font-semibold text-black">
                          {donation.units} unit{donation.units > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {donationHistory.length === 0 && (
                <div className="p-12 text-center">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-black mb-2">
                    No Donation History
                  </h3>
                  <p className="text-gray-500">
                    You haven't made any blood donations yet.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Opportunities Tab */}
        {activeTab === "opportunities" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-black mb-6">Donate Blood</h2>

            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-md">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                <input
                  type="text"
                  placeholder="Search donation opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Opportunities List */}
            <div className="grid gap-6">
              {filteredOpportunities.map((opportunity) => (
                <motion.div
                  key={opportunity.id}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-black mb-2">
                          {opportunity.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-black">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4 text-black" />
                            <span>{opportunity.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-black" />
                            <span>{opportunity.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4 text-black" />
                            <span>{opportunity.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-black">Organized by</p>
                        <p className="font-semibold text-black">
                          {opportunity.organizer}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-2 text-black">
                        <Phone className="w-4 h-4 text-black" />
                        <span>{opportunity.contact}</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                        <span>Register to Donate</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredOpportunities.length === 0 && (
              <div className="text-center py-12">
                <Droplets className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-black mb-2">
                  No Opportunities Found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search criteria.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
