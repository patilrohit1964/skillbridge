import Navbar from "../components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="p-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome to SkillBridge 🚀
        </h2>
        <p className="mt-4 text-gray-600">
          Your journey to becoming a full-stack expert begins here.
        </p>
      </main>
    </>
  );
}
