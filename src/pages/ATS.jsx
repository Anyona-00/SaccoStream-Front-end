import { useState } from "react";

const CheckATSForm = () => {
  const [email, setEmail] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // Handle file input change
  const handleFileChange = (event) => {
    setCvFile(event.target.files[0]);
  };

  // Handle email input change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !cvFile) {
      setResponseMessage("Please provide both email and CV file.");
      return;
    }

    setLoading(true);
    setResponseMessage("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("cv", cvFile);

    try {
      // Replace with your n8n webhook URL
      const webhookUrl =
        "https://shadrack.app.n8n.cloud/webhook/c9ec1cb8-bf67-4922-85c2-6fdaaa39dac9";
      const response = await fetch(webhookUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      // Handle response from the webhook (ATS feedback)
      if (result.success) {
        setResponseMessage(
          "Your CV is being analyzed. You will receive an email with the results soon."
        );
      } else {
        setResponseMessage(
          "There was an error processing your CV. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Check if your CV is ATS-friendly
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="cv" className="block text-sm font-medium">
            Upload Your CV
          </label>
          <input
            type="file"
            id="cv"
            onChange={handleFileChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          {loading ? "Analyzing..." : "Check My CV"}
        </button>
      </form>

      {responseMessage && (
        <p className="mt-4 text-center text-lg">{responseMessage}</p>
      )}
    </div>
  );
};

export default CheckATSForm;
