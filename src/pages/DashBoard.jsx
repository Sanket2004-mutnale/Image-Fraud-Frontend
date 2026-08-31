import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";

function Dashboard() {

  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {

    const file = e.target.files[0];

    setError("");
    setResult(null);

    if (!file) {
      return;
    }

    setSelectedFile(file);
  };


const handleAnalyze = async () => {

  if (!selectedFile) {
    setError("Please select an image first.");
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  try {

    setLoading(true);
    setError("");
    setResult(null);

    // =========================
    // 1. UPLOAD IMAGE
    // =========================

    const formData = new FormData();

    formData.append("file", selectedFile);

    const uploadResponse = await api.post(
      "/api/documents/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("Upload Response:", uploadResponse.data);

    const documentId = uploadResponse.data.id;


    // =========================
    // 2. ANALYZE IMAGE
    // =========================

    const analysisResponse = await api.get(
      `/api/documents/${documentId}/analysis`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(
      "Analysis Response:",
      analysisResponse.data
    );

    setResult(analysisResponse.data);

  } catch (err) {

  console.error("FULL ERROR:", err);

  if (err.response) {

    console.error("STATUS:", err.response.status);
    console.error("DATA:", err.response.data);

    setError(
      err.response.data?.message ||
      err.response.data ||
      `Backend error: ${err.response.status}`
    );

  } else {

    console.error("NO RESPONSE FROM SERVER:", err.message);

    setError("Unable to connect to the backend.");

  }

} finally {

    setLoading(false);

  }
};


  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };


  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= NAVBAR ================= */}

     <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">

        <h1 className="text-2xl font-bold text-blue-600">
          Image Fraud Detection
        </h1>

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/history")}
            className="text-slate-700 font-semibold hover:text-blue-600"
          >
            History
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white
                       px-5 py-2 rounded-lg font-semibold"
          >
            Logout
          </button>

        </div>

      </nav>


      {/* ================= MAIN ================= */}

      <main className="max-w-6xl mx-auto px-6 py-10">

        <h2 className="text-3xl font-bold text-slate-900">
          Image Analysis Dashboard
        </h2>

        <p className="text-slate-500 mt-2">
          Upload an image to check for possible manipulation and fraud.
        </p>


        {/* ================= UPLOAD CARD ================= */}

        <div className="bg-white rounded-2xl shadow-lg mt-8 p-8">

          <h3 className="text-xl font-bold text-slate-800">
            Upload New Image
          </h3>

          <div className="mt-6 border-2 border-dashed border-slate-300
                          rounded-xl p-10 text-center">

            <div className="text-5xl mb-4">
              📁
            </div>

            <p className="text-slate-600 mb-5">
              Select JPG, JPEG or PNG image
            </p>

            <label
              className="inline-block bg-blue-600 hover:bg-blue-700
                         text-white px-6 py-3 rounded-lg
                         font-semibold cursor-pointer"
            >
              Select Image

              <input
                type="file"
                accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                onChange={handleFileChange}
                className="hidden"
              />

            </label>


            {/* Selected File */}

            {selectedFile && (

              <div className="mt-5">

                <p className="text-green-600 font-semibold">
                  Selected:
                </p>

                <p className="text-slate-600 mt-1">
                  {selectedFile.name}
                </p>


                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="mt-5 bg-green-600 hover:bg-green-700
                             disabled:bg-gray-400
                             text-white px-8 py-3 rounded-lg
                             font-semibold"
                >

                  {loading
                    ? "Analyzing..."
                    : "Analyze Image"
                  }

                </button>

              </div>

            )}


            {/* Error */}

            {error && (

              <p className="mt-5 text-red-600 font-semibold">
                {error}
              </p>

            )}

          </div>

        </div>


        {/* ================= RESULT ================= */}

        {result && (

          <div className="bg-white rounded-2xl shadow-lg mt-8 p-8">

            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Analysis Result
            </h3>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">


              {/* Fraud Score */}

              <div className="bg-slate-50 rounded-xl p-5">

                <p className="text-slate-500">
                  Fraud Score
                </p>

                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {result.fraudScore}
                </p>

              </div>


              {/* Status */}

              <div className="bg-slate-50 rounded-xl p-5">

                <p className="text-slate-500">
                  Status
                </p>

                <p className="text-2xl font-bold mt-2">
                  {result.status}
                </p>

              </div>


              {/* Risk Level */}

              <div className="bg-slate-50 rounded-xl p-5">

                <p className="text-slate-500">
                  Risk Level
                </p>

                <p className="text-2xl font-bold mt-2">
                  {result.riskLevel}
                </p>

              </div>


              
              

            </div>


            

           

          </div>

        )}

      </main>

    </div>
  );
}

export default Dashboard;