import { useState } from "react";

const WalletProfile = () => {
  const [username, setUsername] = useState("");
  const [suiAddress, setSuiAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate backend interaction that generates a Sui address
    setTimeout(() => {
      const fakeSuiAddress = "0x" + crypto.randomUUID().replace(/-/g, "").slice(0, 40);
      setSuiAddress(fakeSuiAddress);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Wallet Profile</h1>

      {!suiAddress ? (
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full border rounded-xl p-2 border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition"
          >
            {loading ? "Generating Wallet..." : "Create Wallet"}
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-gray-600 mb-2">Welcome, {username}!</p>
          <p className="text-sm text-gray-600">Your Sui Address:</p>
          <div className="bg-gray-100 p-3 mt-1 rounded-xl font-mono text-blue-500 break-words text-sm">
            {suiAddress}
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletProfile;
