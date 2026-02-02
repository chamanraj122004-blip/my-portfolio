export default function Home() {
  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <h1 className="text-3xl font-bold">Welcome to My Portfolio</h1>

      {/* Image: drop your photo into the project public folder as /chaman.jpeg */}
      <img
        src="/chaman.jpeg"
        alt="Profile"
        className="w-40 h-40 rounded-full object-cover shadow-lg ring-2 ring-offset-2 ring-gray-200"
      />
    </div>
  );
}
