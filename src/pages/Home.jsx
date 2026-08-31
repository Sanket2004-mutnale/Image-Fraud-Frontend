import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =========================================
          NAVBAR
      ========================================= */}

      <nav
        className="sticky top-0 z-50
                   bg-white/95 backdrop-blur
                   border-b border-slate-200"
      >

        <div
          className="max-w-7xl mx-auto
                     px-6 lg:px-8
                     py-4
                     flex items-center
                     justify-between"
        >

          {/* Logo */}

          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold
                       text-blue-600
                       cursor-pointer"
          >
            Image Fraud Detection
          </h1>


          {/* Navigation */}

          <div
            className="hidden md:flex
                       items-center gap-8"
          >

            <button
              onClick={() => navigate("/")}
              className="text-blue-600
                         font-semibold"
            >
              Home
            </button>

            <a
              href="#about"
              className="text-slate-600
                         hover:text-blue-600
                         font-medium"
            >
              About
            </a>

            <a
              href="#how-it-works"
              className="text-slate-600
                         hover:text-blue-600
                         font-medium"
            >
              How It Works
            </a>

            <a
              href="#features"
              className="text-slate-600
                         hover:text-blue-600
                         font-medium"
            >
              Features
            </a>

          </div>


          {/* Login / Register */}

          <div className="flex items-center gap-3">

            <button
              onClick={() => navigate("/login")}
              className="text-slate-700
                         font-semibold
                         hover:text-blue-600
                         px-4 py-2"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="bg-blue-600
                         hover:bg-blue-700
                         text-white
                         px-5 py-2
                         rounded-lg
                         font-semibold"
            >
              Get Started
            </button>

          </div>

        </div>

      </nav>


      {/* =========================================
          HERO SECTION
      ========================================= */}

      <section
        className="bg-gradient-to-br
                   from-blue-50
                   via-white
                   to-slate-100"
      >

        <div
          className="max-w-7xl mx-auto
                     px-6 lg:px-8
                     py-20 lg:py-28"
        >

          <div
            className="grid grid-cols-1
                       lg:grid-cols-2
                       gap-12
                       items-center"
          >

            {/* LEFT */}

            <div>

              <div
                className="inline-block
                           bg-blue-100
                           text-blue-700
                           px-4 py-2
                           rounded-full
                           text-sm
                           font-semibold
                           mb-6"
              >
                AI-Powered Image Verification
              </div>


              <h2
                className="text-4xl
                           md:text-5xl
                           lg:text-6xl
                           font-bold
                           text-slate-900
                           leading-tight"
              >
                Detect Image Fraud
                <span className="text-blue-600">
                  {" "}with Confidence
                </span>
              </h2>


              <p
                className="mt-6
                           text-lg
                           text-slate-600
                           leading-relaxed
                           max-w-xl"
              >
                Upload an image and analyze it using
                multiple forensic indicators to identify
                possible manipulation and suspicious
                modifications.
              </p>


              {/* Buttons */}

              <div
                className="mt-8
                           flex flex-col
                           sm:flex-row
                           gap-4"
              >

                <button
                  onClick={() => navigate("/register")}
                  className="bg-blue-600
                             hover:bg-blue-700
                             text-white
                             px-7 py-3
                             rounded-lg
                             font-semibold
                             shadow-md"
                >
                  Start Analyzing
                </button>


                <a
                  href="#how-it-works"
                  className="border
                             border-slate-300
                             bg-white
                             hover:bg-slate-100
                             text-slate-700
                             px-7 py-3
                             rounded-lg
                             font-semibold
                             text-center"
                >
                  How It Works
                </a>

              </div>

            </div>


            {/* RIGHT - VISUAL CARD */}

            <div
              className="flex
                         justify-center"
            >

              <div
                className="bg-white
                           rounded-3xl
                           shadow-2xl
                           p-8
                           w-full
                           max-w-md"
              >

                <div
                  className="bg-blue-50
                             rounded-2xl
                             p-8
                             text-center"
                >

                  <div
                    className="text-6xl mb-5"
                  >
                    🔍
                  </div>

                  <h3
                    className="text-2xl
                               font-bold
                               text-slate-800"
                  >
                    Image Analysis
                  </h3>

                  <p
                    className="text-slate-500
                               mt-3"
                  >
                    Multiple forensic indicators
                    help identify suspicious images.
                  </p>


                  <div
                    className="mt-6
                               space-y-3
                               text-left"
                  >

                    <div
                      className="bg-white
                                 rounded-lg
                                 p-4
                                 flex
                                 justify-between"
                    >
                      <span className="text-slate-600">
                        ELA Analysis
                      </span>

                      <span className="text-green-600 font-bold">
                        ✓
                      </span>
                    </div>


                    <div
                      className="bg-white
                                 rounded-lg
                                 p-4
                                 flex
                                 justify-between"
                    >
                      <span className="text-slate-600">
                        Metadata Analysis
                      </span>

                      <span className="text-green-600 font-bold">
                        ✓
                      </span>
                    </div>


                    <div
                      className="bg-white
                                 rounded-lg
                                 p-4
                                 flex
                                 justify-between"
                    >
                      <span className="text-slate-600">
                        Manipulation Analysis
                      </span>

                      <span className="text-green-600 font-bold">
                        ✓
                      </span>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          ABOUT
      ========================================= */}

      <section
        id="about"
        className="bg-white"
      >

        <div
          className="max-w-7xl mx-auto
                     px-6 lg:px-8
                     py-20"
        >

          <div className="max-w-3xl">

            <p
              className="text-blue-600
                         font-semibold"
            >
              ABOUT THE SYSTEM
            </p>

            <h2
              className="text-3xl
                         md:text-4xl
                         font-bold
                         text-slate-900
                         mt-2"
            >
              Verify images before you trust them.
            </h2>

            <p
              className="text-slate-600
                         text-lg
                         leading-relaxed
                         mt-5"
            >
              Image Fraud Detection is designed to
              help users examine uploaded images for
              possible manipulation. The system analyzes
              different forensic signals and presents
              the results in an easy-to-understand format.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================
          HOW IT WORKS
      ========================================= */}

      <section
        id="how-it-works"
        className="bg-slate-50"
      >

        <div
          className="max-w-7xl mx-auto
                     px-6 lg:px-8
                     py-20"
        >

          <div className="text-center">

            <p
              className="text-blue-600
                         font-semibold"
            >
              HOW IT WORKS
            </p>

            <h2
              className="text-3xl
                         md:text-4xl
                         font-bold
                         text-slate-900
                         mt-2"
            >
              Three simple steps
            </h2>

            <p
              className="text-slate-500
                         mt-4"
            >
              Analyze your image in a few simple steps.
            </p>

          </div>


          <div
            className="grid grid-cols-1
                       md:grid-cols-3
                       gap-7
                       mt-12"
          >

            {/* STEP 1 */}

            <div
              className="bg-white
                         rounded-2xl
                         shadow-md
                         p-7
                         text-center"
            >

              <div
                className="w-14 h-14
                           mx-auto
                           rounded-full
                           bg-blue-100
                           text-blue-600
                           flex items-center
                           justify-center
                           text-xl
                           font-bold"
              >
                1
              </div>

              <h3
                className="text-xl
                           font-bold
                           text-slate-800
                           mt-5"
              >
                Upload Image
              </h3>

              <p
                className="text-slate-500
                           mt-3"
              >
                Select a JPG, JPEG or PNG image
                from your device.
              </p>

            </div>


            {/* STEP 2 */}

            <div
              className="bg-white
                         rounded-2xl
                         shadow-md
                         p-7
                         text-center"
            >

              <div
                className="w-14 h-14
                           mx-auto
                           rounded-full
                           bg-blue-100
                           text-blue-600
                           flex items-center
                           justify-center
                           text-xl
                           font-bold"
              >
                2
              </div>

              <h3
                className="text-xl
                           font-bold
                           text-slate-800
                           mt-5"
              >
                Analyze
              </h3>

              <p
                className="text-slate-500
                           mt-3"
              >
                The system performs forensic analysis
                on the uploaded image.
              </p>

            </div>


            {/* STEP 3 */}

            <div
              className="bg-white
                         rounded-2xl
                         shadow-md
                         p-7
                         text-center"
            >

              <div
                className="w-14 h-14
                           mx-auto
                           rounded-full
                           bg-blue-100
                           text-blue-600
                           flex items-center
                           justify-center
                           text-xl
                           font-bold"
              >
                3
              </div>

              <h3
                className="text-xl
                           font-bold
                           text-slate-800
                           mt-5"
              >
                View Result
              </h3>

              <p
                className="text-slate-500
                           mt-3"
              >
                View the fraud score, risk level and
                forensic indicators.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          FEATURES
      ========================================= */}

      <section
        id="features"
        className="bg-white"
      >

        <div
          className="max-w-7xl mx-auto
                     px-6 lg:px-8
                     py-20"
        >

          <div className="text-center">

            <p
              className="text-blue-600
                         font-semibold"
            >
              FEATURES
            </p>

            <h2
              className="text-3xl
                         md:text-4xl
                         font-bold
                         text-slate-900
                         mt-2"
            >
              What the system provides
            </h2>

          </div>


          <div
            className="grid grid-cols-1
                       md:grid-cols-2
                       lg:grid-cols-3
                       gap-6
                       mt-12"
          >

            <div
              className="border
                         border-slate-200
                         rounded-2xl
                         p-6"
            >

              <div className="text-3xl">
                📊
              </div>

              <h3
                className="text-xl
                           font-bold
                           mt-4"
              >
                Fraud Score
              </h3>

              <p
                className="text-slate-500
                           mt-2"
              >
                Get a numerical indication of possible
                image fraud or manipulation.
              </p>

            </div>


            <div
              className="border
                         border-slate-200
                         rounded-2xl
                         p-6"
            >

              <div className="text-3xl">
                🔬
              </div>

              <h3
                className="text-xl
                           font-bold
                           mt-4"
              >
                ELA Analysis
              </h3>

              <p
                className="text-slate-500
                           mt-2"
              >
                Examine image compression differences
                that may indicate modifications.
              </p>

            </div>


            <div
              className="border
                         border-slate-200
                         rounded-2xl
                         p-6"
            >

              <div className="text-3xl">
                🧾
              </div>

              <h3
                className="text-xl
                           font-bold
                           mt-4"
              >
                Metadata Risk
              </h3>

              <p
                className="text-slate-500
                           mt-2"
              >
                Check image metadata for potentially
                suspicious information.
              </p>

            </div>


            <div
              className="border
                         border-slate-200
                         rounded-2xl
                         p-6"
            >

              <div className="text-3xl">
                ⚠️
              </div>

              <h3
                className="text-xl
                           font-bold
                           mt-4"
              >
                Risk Level
              </h3>

              <p
                className="text-slate-500
                           mt-2"
              >
                Quickly understand whether the image
                has low or higher potential risk.
              </p>

            </div>


            <div
              className="border
                         border-slate-200
                         rounded-2xl
                         p-6"
            >

              <div className="text-3xl">
                🕒
              </div>

              <h3
                className="text-xl
                           font-bold
                           mt-4"
              >
                Analysis History
              </h3>

              <p
                className="text-slate-500
                           mt-2"
              >
                Access your previous image analysis
                results whenever you need them.
              </p>

            </div>


            <div
              className="border
                         border-slate-200
                         rounded-2xl
                         p-6"
            >

              <div className="text-3xl">
                🔐
              </div>

              <h3
                className="text-xl
                           font-bold
                           mt-4"
              >
                Secure Login
              </h3>

              <p
                className="text-slate-500
                           mt-2"
              >
                User authentication protects access
                to your analysis history.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          CTA
      ========================================= */}

      <section
        className="bg-blue-600"
      >

        <div
          className="max-w-5xl mx-auto
                     px-6
                     py-16
                     text-center"
        >

          <h2
            className="text-3xl
                       md:text-4xl
                       font-bold
                       text-white"
          >
            Ready to analyze your image?
          </h2>

          <p
            className="text-blue-100
                       mt-4
                       text-lg"
          >
            Upload an image and get your forensic
            analysis results.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="mt-7
                       bg-white
                       hover:bg-slate-100
                       text-blue-600
                       px-7 py-3
                       rounded-lg
                       font-bold"
          >
            Get Started
          </button>

        </div>

      </section>


      {/* =========================================
          FOOTER
      ========================================= */}

      <footer
        className="bg-slate-900
                   text-slate-300"
      >

        <div
          className="max-w-7xl mx-auto
                     px-6 lg:px-8
                     py-10"
        >

          <div
            className="flex flex-col
                       md:flex-row
                       justify-between
                       gap-6"
          >

            <div>

              <h3
                className="text-xl
                           font-bold
                           text-white"
              >
                Image Fraud Detection
              </h3>

              <p
                className="text-slate-400
                           mt-2
                           max-w-md"
              >
                A web-based image forensic analysis
                system for detecting possible image
                manipulation.
              </p>

            </div>


            <div
              className="flex
                         gap-6"
            >

              <button
                onClick={() => navigate("/login")}
                className="hover:text-white"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="hover:text-white"
              >
                Register
              </button>

            </div>

          </div>


          <div
            className="border-t
                       border-slate-700
                       mt-8
                       pt-6
                       text-sm
                       text-slate-500"
          >
            © 2026 Image Fraud Detection.
            All rights reserved.
          </div>

        </div>

      </footer>

    </div>
  );
}

export default Home;
