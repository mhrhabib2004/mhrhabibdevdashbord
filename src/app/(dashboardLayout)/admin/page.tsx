export default function Page() {
  return (
    <div className="min-h-screen bg-transparent p-0 m-0">
      <h1 className="text-center text-xl font-semibold mt-4 mb-4 relative inline-block mx-auto">
        My Portfolio
        <span className="block h-[2px] w-24 bg-black dark:bg-white mx-auto mt-1 rounded"></span>
      </h1>

      <iframe
        src="https://mhrhabibdev.vercel.app/"
        className="w-full h-[calc(100vh-72px)] block border-0 m-0 p-0"
        frameBorder="0"
        allowFullScreen
        title="Habib's Portfolio"
      />
    </div>
  )
}
