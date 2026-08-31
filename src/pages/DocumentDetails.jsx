import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function DocumentDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================

  const [document, setDocument] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState("");

  // =========================
  // FETCH DOCUMENT DETAILS
  // =========================

  useEffect(() => {

    const fetchDetails = async () => {

      const token = localStorage.getItem("token");

      // No token
      if (!token) {
        navigate("/login");
        return;
      }

      try {

        // =========================
        // 1. GET DOCUMENT
        // =========================

        const documentResponse = await axios.get(
          `http://localhost:8080/api/documents/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setDocument(documentResponse.data);

        // =========================
        // 2. GET ANALYSIS
        // =========================

        const analysisResponse = await axios.get(
          `http://localhost:8080/api/documents/${id}/analysis`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setAnalysis(analysisResponse.data);

      } catch (err) {

        console.error("Fetch details error:", err);

        // JWT expired / unauthorized
        if (err.response?.status === 401) {

          localStorage.removeItem("token");

          navigate("/login");

        } else {

          setError(
            "Unable to load document details."
          );

        }

      } finally {

        setLoading(false);

      }

    };

    fetchDetails();

  }, [id, navigate]);


  // =========================
  // DELETE DOCUMENT
  // =========================

  const handleDelete = async () => {

    const token = localStorage.getItem("token");

    // No token
    if (!token) {

      navigate("/login");

      return;
    }

    // Confirmation
    const confirmed = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmed) {

      return;

    }

    try {

      setDeleting(true);

      // DELETE API
      await axios.delete(
        `http://localhost:8080/api/documents/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Document deleted successfully.");

      // Go back to history
      navigate("/history");

    } catch (err) {

      console.error("Delete error:", err);

      // Unauthorized
      if (err.response?.status === 401) {

        localStorage.removeItem("token");

        navigate("/login");

      } else {

        alert(
          err.response?.data?.message ||
          "Unable to delete document."
        );

      }

    } finally {

      setDeleting(false);

    }

  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">

        <p className="text-slate-500 text-lg">
          Loading analysis...
        </p>

      </div>
    );

  }


  // =========================
  // ERROR
  // =========================

  if (error) {

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">

        <div className="bg-white rounded-xl shadow p-8 text-center">

          <p className="text-red-600 font-semibold">
            {error}
          </p>

          <button
            onClick={() => navigate("/history")}
            className="mt-5 bg-blue-600 hover:bg-blue-700
                       text-white px-5 py-2 rounded-lg"
          >
            Back to History
          </button>

        </div>

      </div>
    );

  }


  // =========================
  // MAIN UI
  // =========================

  return (

    <div className="min-h-screen bg-slate-50">

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="sticky top-0 z-50 bg-white
                      border-b border-slate-200
                      px-8 py-4">

        <div className="max-w-6xl mx-auto
                        flex items-center justify-between">

          {/* Logo / Title */}

          <h1 className="text-2xl font-bold text-blue-600">
            Image Fraud Detection
          </h1>


          {/* Navbar Buttons */}

          <div className="flex items-center gap-4">

            {/* Back */}

            <button
              onClick={() => navigate("/history")}
              className="text-blue-600 font-semibold
                         hover:underline"
            >
              ← Back to History
            </button>


            {/* Delete */}

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700
                         disabled:bg-gray-400
                         text-white px-5 py-2
                         rounded-lg font-semibold"
            >

              {deleting
                ? "Deleting..."
                : "Delete"
              }

            </button>

          </div>

        </div>

      </nav>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="max-w-5xl mx-auto px-6 py-10">


        {/* PAGE TITLE */}

        <h2 className="text-3xl font-bold text-slate-900">
          Analysis Details
        </h2>

        <p className="text-slate-500 mt-2">
          Detailed forensic analysis of your uploaded image.
        </p>


        {/* =========================
            DOCUMENT INFORMATION
        ========================= */}

        <div className="bg-white rounded-2xl shadow-lg mt-8 p-8">

          <h3 className="text-xl font-bold text-slate-800">
            Document Information
          </h3>


          <div className="grid grid-cols-1 md:grid-cols-2
                          gap-5 mt-6">


            {/* File Name */}

            <div>

              <p className="text-sm text-slate-500">
                File Name
              </p>

              <p className="font-semibold text-slate-800 mt-1">
                {document?.fileName}
              </p>

            </div>


            {/* File Type */}

            <div>

              <p className="text-sm text-slate-500">
                File Type
              </p>

              <p className="font-semibold text-slate-800 mt-1">
                {document?.fileType}
              </p>

            </div>


            {/* Uploaded At */}

            <div>

              <p className="text-sm text-slate-500">
                Uploaded At
              </p>

              <p className="font-semibold text-slate-800 mt-1">

                {document?.uploadedAt
                  ? new Date(
                      document.uploadedAt
                    ).toLocaleString()
                  : "N/A"
                }

              </p>

            </div>

          </div>

        </div>


        {/* =========================
            FRAUD ANALYSIS
        ========================= */}

        {analysis && (

          <div className="bg-white rounded-2xl shadow-lg
                          mt-6 p-8">


            <h3 className="text-xl font-bold text-slate-800">
              Fraud Analysis
            </h3>


            {/* Main Results */}

            <div className="grid grid-cols-1 md:grid-cols-3
                            gap-5 mt-6">


              {/* Fraud Score */}

              <div className="bg-blue-50 rounded-xl p-5">

                <p className="text-sm text-slate-500">
                  Fraud Score
                </p>

                <p className="text-3xl font-bold
                              text-blue-600 mt-2">
                  {analysis.fraudScore}
                </p>

              </div>


              {/* Status */}

              <div className="bg-green-50 rounded-xl p-5">

                <p className="text-sm text-slate-500">
                  Status
                </p>

                <p className="text-2xl font-bold
                              text-green-700 mt-2">
                  {analysis.status}
                </p>

              </div>


              {/* Risk */}

              <div className="bg-slate-100 rounded-xl p-5">

                <p className="text-sm text-slate-500">
                  Risk Level
                </p>

                <p className="text-2xl font-bold
                              text-slate-800 mt-2">
                  {analysis.riskLevel}
                </p>

              </div>

            </div>


            {/* =========================
                FORENSIC INDICATORS
            ========================= */}

            <h3 className="text-xl font-bold
                           text-slate-800 mt-8">

              Forensic Indicators

            </h3>


            <div className="grid grid-cols-1 md:grid-cols-3
                            gap-5 mt-5">


              {/* ELA */}

              <div className="bg-slate-50 rounded-xl p-5">

                <p className="text-sm text-slate-500">
                  ELA Score
                </p>

                <p className="text-2xl font-bold mt-2">
                  {analysis.elaScore}
                </p>

              </div>


              {/* Metadata */}

              <div className="bg-slate-50 rounded-xl p-5">

                <p className="text-sm text-slate-500">
                  Metadata Risk
                </p>

                <p className="text-2xl font-bold mt-2">
                  {analysis.metadataRisk}
                </p>

              </div>


              {/* Manipulation */}

              <div className="bg-slate-50 rounded-xl p-5">

                <p className="text-sm text-slate-500">
                  Manipulation Risk
                </p>

                <p className="text-2xl font-bold mt-2">
                  {analysis.manipulationRisk}
                </p>

              </div>

            </div>


            {/* =========================
                ANALYSIS MESSAGE
            ========================= */}

            <div className="mt-8 bg-slate-50
                            rounded-xl p-6">

              <p className="text-sm text-slate-500">
                Analysis Message
              </p>

              <p className="text-slate-800
                            font-semibold mt-2">

                {analysis.message ||
                 analysis.analysisMessage ||
                 "No analysis message available."
                }

              </p>

            </div>

          </div>

        )}

      </main>

    </div>

  );

}

export default DocumentDetails;