import { useState } from "react";

const Ring: React.FC = () => {
  const [response, setResponse] = useState<"yes" | "no" | null>(null);

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl mb-4">💍 Tuletko vaimokseni?</h2>
      <div className="space-x-4">
        <button
          className="bg-green-400 text-white px-4 py-2 rounded"
          onClick={() => setResponse("yes")}
        >
          Yes
        </button>
        <button
          className="bg-red-400 text-white px-4 py-2 rounded"
          onClick={() => setResponse("no")}
        >
          No
        </button>
      </div>

      {response && (
        <p className="mt-4 text-lg font-semibold">
          {response.toUpperCase() === "YES" && "IHANAA OLLAAN NAIMISISSA ❤️"}
          {response.toUpperCase() === "NO" && "VÄÄRÄ VASTAUS 😡"}
        </p>
      )}
    </div>
  );
};

export default Ring;
