import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";

function History() {

  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH HISTORY
  // ==========================================

  useEffect(() => {

    const fetchHistory = async () => {

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {

        const response = await api.get(
          "/api/documents/my-documents",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("History:", response.data);

        // Sort newest first
        const sortedDocuments = [...response.data].sort(
          (a, b) =>
            new Date(b.uploadedAt) -
            new Date(a.uploadedAt)
        );

        setDocuments(sortedDocuments);

      } catch (err) {

        console.error("History error:", err);

        if (err.response?.status === 401) {

          localStorage.removeItem("token");

          navigate("/login");

        } else {

          setError(
            "Unable to load your analysis history."
          );

        }

      } finally {

        setLoading(false);

      }

    };

    fetchHistory();

  }, [navigate]);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center
                      justify-center bg-slate-50">

        <p className="text-slate-600 text-lg">
          Loading history...
        </p>

      </div>

    );

  }


  // ==========================================
  // LATEST DOCUMENT
  // ==========================================

  const latestDocument =
    documents.length > 0
      ? documents[0]
      : null;


  // ==========================================
  // OLD DOCUMENTS
  // ==========================================

  const oldDocuments =
    documents.length > 1
      ? documents.slice(1)
      : [];


  // ==========================================
  // MAIN UI
  // ==========================================

  return (

    <div className="min-h-screen bg-slate-50">


      {/* =====================================
          STICKY NAVBAR
      ===================================== */}

      <nav
        className="sticky top-0 z-50
                   bg-white border-b border-slate-200
                   px-8 py-4"
      >

        <div
          className="max-w-6xl mx-auto
                     flex items-center justify-between"
        >

          {/* Logo */}

          <h1
            className="text-2xl font-bold
                       text-blue-600 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Image Fraud Detection
          </h1>


          {/* Dashboard */}

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700
                       text-white px-5 py-2
                       rounded-lg font-semibold"
          >
            Dashboard
          </button>

        </div>

      </nav>


      {/* =====================================
          MAIN
      ===================================== */}

      <main
        className="max-w-6xl mx-auto
                   px-6 py-10"
      >


        {/* PAGE TITLE */}

        <h2
          className="text-3xl font-bold
                     text-slate-900"
        >
          Analysis History
        </h2>

        <p className="text-slate-500 mt-2">
          View your previously analyzed images.
        </p>


        {/* =====================================
            ERROR
        ===================================== */}

        {error && (

          <div
            className="mt-6 bg-red-50
                       border border-red-200
                       text-red-600
                       rounded-xl p-4"
          >
            {error}
          </div>

        )}


        {/* =====================================
            EMPTY HISTORY
        ===================================== */}

        {!error && documents.length === 0 && (

          <div
            className="mt-8 bg-white
                       rounded-2xl shadow-lg
                       p-10 text-center"
          >

            <p
              className="text-xl font-semibold
                         text-slate-700"
            >
              No analysis history found.
            </p>

            <p className="text-slate-500 mt-2">
              Upload an image to start your
              first analysis.
            </p>

            <button
              onClick={() => navigate("/dashboard")}
              className="mt-5 bg-blue-600
                         hover:bg-blue-700
                         text-white px-6 py-3
                         rounded-lg font-semibold"
            >
              Analyze Image
            </button>

          </div>

        )}


        {/* =====================================
            LATEST ANALYSIS
        ===================================== */}

        {latestDocument && (

          <div className="mt-8">

            {/* Latest heading */}

            <div className="flex items-center gap-3 mb-4">

              <h3
                className="text-2xl font-bold
                           text-slate-900"
              >
                Latest Analysis
              </h3>

              <span
                className="bg-blue-100
                           text-blue-700
                           text-xs font-bold
                           px-3 py-1
                           rounded-full"
              >
                CURRENT
              </span>

            </div>


            {/* Latest Card */}

            <div
              className="bg-white
                         border-2 border-blue-200
                         rounded-2xl shadow-lg
                         p-7"
            >


              {/* Top section */}

              <div
                className="flex flex-col
                           md:flex-row
                           md:items-center
                           md:justify-between
                           gap-5"
              >


                {/* File */}

                <div>

                  <p
                    className="text-sm
                               text-blue-600
                               font-semibold"
                  >
                    Recently Analyzed
                  </p>

                  <h3
                    className="text-xl
                               font-bold
                               text-slate-800
                               mt-1"
                  >
                    {latestDocument.fileName}
                  </h3>

                  <p
                    className="text-sm
                               text-slate-500
                               mt-1"
                  >
                    Uploaded:{" "}
                    {new Date(
                      latestDocument.uploadedAt
                    ).toLocaleString()}
                  </p>

                </div>


                {/* Status */}

                <span
                  className={`px-4 py-2
                              rounded-full
                              text-sm font-bold
                              ${
                                latestDocument.status ===
                                "GENUINE"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                >
                  {latestDocument.status}
                </span>

              </div>


              {/* Results */}

              <div
                className="grid grid-cols-1
                           sm:grid-cols-3
                           gap-5 mt-7"
              >


                {/* Fraud Score */}

                <div
                  className="bg-blue-50
                             rounded-xl p-5"
                >

                  <p
                    className="text-sm
                               text-slate-500"
                  >
                    Fraud Score
                  </p>

                  <p
                    className="text-3xl
                               font-bold
                               text-blue-600
                               mt-2"
                  >
                    {latestDocument.fraudScore}
                  </p>

                </div>


                {/* Risk Level */}

                <div
                  className="bg-slate-50
                             rounded-xl p-5"
                >

                  <p
                    className="text-sm
                               text-slate-500"
                  >
                    Risk Level
                  </p>

                  <p
                    className="text-xl
                               font-bold
                               text-slate-800
                               mt-2"
                  >
                    {latestDocument.riskLevel}
                  </p>

                </div>


                {/* File Type */}

                <div
                  className="bg-slate-50
                             rounded-xl p-5"
                >

                  <p
                    className="text-sm
                               text-slate-500"
                  >
                    File Type
                  </p>

                  <p
                    className="text-xl
                               font-bold
                               text-slate-800
                               mt-2"
                  >
                    {latestDocument.fileType}
                  </p>

                </div>

              </div>


              {/* Analysis message */}

              <div
                className="mt-6 pt-5
                           border-t
                           border-slate-200"
              >

                <p
                  className="text-sm
                             text-slate-500"
                >
                  Analysis
                </p>

                <p
                  className="text-slate-700
                             mt-1"
                >
                  {latestDocument.analysisMessage}
                </p>

              </div>


              {/* View details */}

              <button
                onClick={() =>
                  navigate(
                    `/document/${latestDocument.id}`
                  )
                }
                className="mt-6
                           bg-blue-600
                           hover:bg-blue-700
                           text-white
                           px-6 py-3
                           rounded-lg
                           font-semibold"
              >
                View Latest Analysis →
              </button>

            </div>

          </div>

        )}


        {/* =====================================
            PREVIOUS ANALYSES
        ===================================== */}

        {oldDocuments.length > 0 && (

          <div className="mt-10">

            <h3
              className="text-2xl font-bold
                         text-slate-900 mb-5"
            >
              Previous Analyses
            </h3>


            <div className="space-y-5">


              {oldDocuments.map((document) => (

                <div
                  key={document.id}
                  className="bg-white
                             rounded-2xl
                             shadow-lg
                             p-6"
                >


                  {/* Top */}

                  <div
                    className="flex flex-col
                               md:flex-row
                               md:items-center
                               md:justify-between
                               gap-5"
                  >


                    {/* File */}

                    <div>

                      <h3
                        className="text-lg
                                   font-bold
                                   text-slate-800"
                      >
                        {document.fileName}
                      </h3>

                      <p
                        className="text-sm
                                   text-slate-500
                                   mt-1"
                      >
                        Uploaded:{" "}
                        {new Date(
                          document.uploadedAt
                        ).toLocaleString()}
                      </p>

                    </div>


                    {/* Status */}

                    <span
                      className={`px-4 py-2
                                  rounded-full
                                  text-sm font-bold
                                  ${
                                    document.status ===
                                    "GENUINE"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-red-100 text-red-700"
                                  }`}
                    >
                      {document.status}
                    </span>

                  </div>


                  {/* Information */}

                  <div
                    className="grid
                               grid-cols-1
                               sm:grid-cols-3
                               gap-5 mt-6"
                  >


                    {/* Fraud */}

                    <div>

                      <p
                        className="text-sm
                                   text-slate-500"
                      >
                        Fraud Score
                      </p>

                      <p
                        className="text-2xl
                                   font-bold
                                   text-blue-600"
                      >
                        {document.fraudScore}
                      </p>

                    </div>


                    {/* Risk */}

                    <div>

                      <p
                        className="text-sm
                                   text-slate-500"
                      >
                        Risk Level
                      </p>

                      <p
                        className="font-bold
                                   text-slate-800"
                      >
                        {document.riskLevel}
                      </p>

                    </div>


                    {/* File Type */}

                    <div>

                      <p
                        className="text-sm
                                   text-slate-500"
                      >
                        File Type
                      </p>

                      <p
                        className="font-bold
                                   text-slate-800"
                      >
                        {document.fileType}
                      </p>

                    </div>

                  </div>


                  {/* Message */}

                  <div
                    className="mt-5 pt-5
                               border-t
                               border-slate-200"
                  >

                    <p
                      className="text-sm
                                 text-slate-500"
                    >
                      Analysis
                    </p>

                    <p
                      className="text-slate-700
                                 mt-1"
                    >
                      {document.analysisMessage}
                    </p>

                  </div>


                  {/* Details */}

                  <button
                    onClick={() =>
                      navigate(
                        `/document/${document.id}`
                      )
                    }
                    className="mt-5
                               text-blue-600
                               font-semibold
                               hover:underline"
                  >
                    View Details →
                  </button>

                </div>

              ))}

            </div>

          </div>

        )}

      </main>

    </div>

  );

}

export default History;
