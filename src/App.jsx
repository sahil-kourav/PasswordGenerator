import React, { useCallback, useEffect, useRef, useState } from "react";
import { Key } from "lucide-react";

const App = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAlloud, setNumberAlloud] = useState(false);
  const [charAlloud, setCharAlloud] = useState(false);

  const copyPasswordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdhijklmnopqrstuvwxyz";

    if (numberAlloud) str += "0123456789";
    if (charAlloud) str += "!@#$%^&*-+=~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
    console.log(pass);
  }, [length, numberAlloud, charAlloud, setPassword]);

  const copyPassToClipboard = useCallback(() => {
    copyPasswordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAlloud, charAlloud, passwordGenerator]);

  return (
    <section className="w-full py-28 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-2xl mx-auto space-y-8">
        <h2 className="text-3xl sm:text-3xl md:text-6xl font-serif font-bold text-white leading-tight">
          Password Generator
        </h2>

        <p className="text-lg md:text-xl text-gray-100 font-light max-w-xl mx-auto leading-relaxed">
          Forget weak logins — create{" "}
          <span className="font-semibold text-red-500">
            unbreakable passwords{" "}
          </span>
          in one click and protect what matters most.
        </p>

        <form className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 bg-white border border-gray-300 rounded-lg p-2 shadow-lg max-w-xl mx-auto">
          {/* Password input */}
          <div className="flex items-center w-full px-3 gap-3 bg-gray-50 rounded-md">
            <Key className="text-gray-700 w-5 h-5" />
            <input
              type="text"
              readOnly
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="P@ssw0rd123!"
              className="w-full text-md py-3 px-2 text-gray-900 outline-none placeholder-gray-400 bg-transparent"
              ref={copyPasswordRef}
            />
          </div>

          {/* Copy button */}
          <button
            type="button"
            onClick={copyPassToClipboard}
            className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold rounded-md shadow-md hover:from-green-600 hover:to-green-700 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            COPY
          </button>

          <button
            type="button"
            onClick={passwordGenerator}
            className="w-full sm:w-auto px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            REGENERATE
          </button>
        </form>
        <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 max-w-xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          {/* Length Slider */}
          <div className="flex flex-col w-full sm:w-auto">
            <label className="text-gray-800 font-medium mb-2">
              Length:{" "}
              <span className="text-gray-900 font-semibold">{length}</span>
            </label>
            <input
              type="range"
              min="8"
              max="50"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full sm:w-48 h-2 rounded-lg cursor-pointer accent-blue-600"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col sm:flex-row sm:gap-10 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={numberAlloud}
                onChange={() => setNumberAlloud((prev) => !prev)}
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
              <span className="text-gray-800 font-medium">Numbers</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={charAlloud}
                onChange={() => setCharAlloud((prev) => !prev)}
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
              <span className="text-gray-800 font-medium">Characters</span>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
