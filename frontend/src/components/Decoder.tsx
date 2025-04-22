import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { decodeMessageFromImage } from "../utils/steganography.ts"; // local frontend decoder function
import { useNavigate } from "react-router-dom";

const Decoder = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [decrypt, setDecrypt] = useState(false);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleImageUpload = (file: File | null) => {
    setImage(file);
    setMessage(null); // Clear previous result

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleDecode = async () => {
    if (!image) return;

    setLoading(true);

    const img = new Image();
    img.src = URL.createObjectURL(image);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setMessage("❌ Failed to decode: canvas error.");
        setLoading(false);
        return;
      }

      ctx.drawImage(img, 0, 0);
      try {
        const decoded = decodeMessageFromImage(canvas);
        let finalMessage = decoded;

        if (decrypt && password) {
          try {
            const bytes = CryptoJS.AES.decrypt(decoded, password);
            finalMessage = bytes.toString(CryptoJS.enc.Utf8);
            if (!finalMessage) throw new Error();
          } catch (err) {
            finalMessage = "🔐 Failed to decrypt message. Check password!";
          }
        }

        setMessage(finalMessage);
      } catch (err) {
        setMessage("❌ Failed to decode message.");
      }

      setLoading(false);
    };
  };

  return (
    <div className="flex flex-col max-w-5xl p-6 mx-auto mt-10 bg-white shadow-xl rounded-2xl">
      {/* Redirect Button */}
      <div className="mb-3">
        <button
          onClick={() => navigate("/")}
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl shadow-md transition-all duration-200"
        >
          🔄 Go to Encoder Page
        </button>
      </div>
      <div className="flex min-w-0 border-2 border-solid">
        {/* Upload & Controls */}
        <div className="border-2 flex-1 border-solid">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            🔍 Decode Hidden Message
          </h2>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files?.[0] || null)}
            className="mb-4 block w-full border border-gray-300 rounded p-2"
          />

          {imagePreview && (
            <div className="mb-4">
              <p className="text-gray-700 mb-1 font-semibold">
                Stego Image Preview:
              </p>
              <img
                src={imagePreview}
                alt="To Decode"
                className="w-full h-[300px] object-contain rounded border"
              />
            </div>
          )}

          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              checked={decrypt}
              onChange={(e) => setDecrypt(e.target.checked)}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">
              Decrypt message using AES
            </label>
          </div>

          {decrypt && (
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter decryption password"
              className="w-full mb-4 border p-2 rounded"
            />
          )}

          <button
            onClick={handleDecode}
            disabled={loading}
            className={`w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "⏳ Decoding..." : "🔓 Decode Message"}
          </button>
        </div>

        {/* Output Section */}
        <div className="text-center flex-1 border-2 border-solid">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            📤 Decoded Output
          </h2>
          {message ? (
            <div className="mt-2 p-4 border border-gray-300 bg-gray-50 rounded shadow-sm">
              <p className="text-gray-700 font-semibold mb-2">
                Decoded Message:
              </p>
              <p className="font-mono text-gray-800 whitespace-pre-wrap break-words">
                {message}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No message decoded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Decoder;
