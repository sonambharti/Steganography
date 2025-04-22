import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { encodeMessageInImage } from "../utils/steganography.ts"; // assumes encodeMessageInImage exists here
import { useNavigate } from "react-router-dom";

const Encoder = () => {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [encrypt, setEncrypt] = useState(false);
  const [password, setPassword] = useState("");
  const [encodedImageURL, setEncodedImageURL] = useState<string | null>(null);
  const [originalPreviewURL, setOriginalPreviewURL] = useState<string | null>(
    null
  );

  const navigate = useNavigate();

  const handleEncode = async () => {
    if (!image || !message) {
      alert("Please select an image and enter a message.");
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(image);
    img.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        alert("Canvas context could not be created");
        return;
      }

      ctx.drawImage(img, 0, 0);

      // Encrypt if selected
      let finalMessage = message;
      if (encrypt && password) {
        finalMessage = CryptoJS.AES.encrypt(message, password).toString();
      }

      // Encode message into the canvas
      encodeMessageInImage(canvas, finalMessage); // this function should mutate the canvas

      const stegoDataURL = canvas.toDataURL("image/png");
      setEncodedImageURL(stegoDataURL);
    };
  };

  const handleImageUpload = (file: File | null) => {
    setImage(file);
    setEncodedImageURL(null); // Reset previous output

    if (file) {
      const previewURL = URL.createObjectURL(file);
      setOriginalPreviewURL(previewURL);
    } else {
      setOriginalPreviewURL(null);
    }
  };

  return (
    <div className="p-6 max-w-5xl flex flex-col mx-auto bg-white shadow-xl rounded-2xl">
      {/* Upload & Encode Section */}
      <div className="flex flex-row border-2 border-solid">
        <div className="border-2 flex-1 border-solid">
          <h2 className="text-2xl font-bold mb-4">🖼️ Upload & Encode</h2>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files?.[0] || null)}
            className="mb-4 w-full border border-gray-300 rounded p-2"
          />

          {originalPreviewURL && (
            <div className="mb-4">
              <p className="text-gray-700 mb-1 font-semibold">
                Original Image:
              </p>
              <img
                src={originalPreviewURL}
                alt="Original Preview"
                // className="w-full h-[300px] object-contain rounded border"
                className="w-[300px] h-[300px] object-contain rounded border"
              />
            </div>
          )}

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your secret message..."
            className="w-full h-24 p-3 border rounded mb-4"
          />

          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              checked={encrypt}
              onChange={(e) => setEncrypt(e.target.checked)}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">
              Encrypt message using AES
            </label>
          </div>

          {encrypt && (
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter encryption password"
              className="w-full border p-2 rounded mb-4"
            />
          )}

          <button
            onClick={handleEncode}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            🔐 Encode Message
          </button>
        </div>

        {/* Output Section */}
        <div className="text-center border-2 flex-1 border-solid">
          <h2 className="text-2xl font-bold mb-4">🖼️ Encoded Output</h2>
          {encodedImageURL ? (
            <>
              <img
                src={encodedImageURL}
                alt="Encoded"
                className="w-full h-[300px] object-contain rounded border mb-4"
              />
              <a
                href={encodedImageURL}
                download="stego.png"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                ⬇️ Download Encoded Image
              </a>
            </>
          ) : (
            <p className="text-gray-500">No encoded image yet.</p>
          )}
        </div>
      </div>
      {/* Redirect Button */}
      <div className="relative pt-3 text-right">
        <button
          onClick={() => navigate("/decoder")}
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl shadow-md transition-all duration-200"
        >
          🔄 Go to Decoder Page
        </button>
      </div>
    </div>
  );
};

export default Encoder;

// const data = await encodeImage(formData); // expected: { downloadUrl }

// const response = await fetch(`http://localhost:5000${data.downloadUrl}`);
// if (!response.ok) throw new Error('Failed to fetch encoded image');

// const blob = await response.blob();
// const url = URL.createObjectURL(blob);
// setStegoURL(url);
