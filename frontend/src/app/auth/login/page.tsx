export default function LoginPage() {
  return (
    <div className="flex h-screen flex-col md:flex-row bg-green-900">
      {/* Right Side: a Board (Desktop) / Top (Mobile) */}
      <div className="order-first flex h-2/5 w-full items-center justify-center bg-green-700 md:order-last md:h-auto md:w-2/5 md:rounded-l-[2rem] rounded-b-[2rem]">
        <div className="flex flex-col items-center">
          <img
            src="/images/board.png"
            alt="Board Image"
            className="mb-4 h-32 w-32 md:h-40 md:w-40"
          />
          <h1 className="text-2xl italic text-white">a Board</h1>
        </div>
      </div>

      {/* Left Side: Sign-in (Desktop) / Bottom (Mobile) */}
      <div className="order-last flex h-3/5 w-full items-center justify-center bg-green-900 md:order-first md:h-auto md:w-3/5">
        <div className="w-3/4 max-w-md">
          <h1 className="mb-6 text-3xl text-white">Sign in</h1>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full rounded-md p-3 text-black"
            />
            <button className="w-full rounded-md bg-green-500 p-3 text-white">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
