// app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col items-center justify-center text-center px-6">
      
      {/* Logo / App name */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
        🚀 Feydey AI
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">
        Create stunning AI-powered videos, images & voiceovers in seconds.  
      </p>

      {/* Call to Action buttons */}
      <div className="mt-8 flex gap-4">
        <button className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition">
          Try Now
        </button>
        <button className="px-6 py-3 rounded-lg border border-gray-500 text-gray-200 hover:bg-gray-800 transition">
          Learn More
        </button>
      </div>

    </main>
  );
        }
