function DefaultSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-pulse">
        <button className="bg-orange-500 hover:bg-orange-700 rounded-full w-20 h-10 mr-4 ml-3"></button>
        <button className="bg-purple-500 hover:bg-purple-700 rounded-full w-20 h-10"></button>

        <div className="flex justify-center mt-4 mr-8">
          <div className="mt-4 w-full">
            <label className="text-white text-sm font-bold mb-2 ml-3" htmlFor="prompt">
              &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;
            </label>
            <textarea
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 ml-3 bg-gradient-to-r from-purple-400 to-blue-500 p-4 rounded-md text-white animate-pulse"
              rows={15}
            ></textarea>
          </div>
        </div>
        <div className="mt-2 mb-4 ml-3">
          <div className="bg-gradient-to-r from-purple-400 to-blue-500 p-4 rounded-md text-white">
            <div className="flex items-center ml-3">
              <input
                className="appearance-none rounded-full border-purple-500 w-5 h-5 mr-2 checked:bg-purple-500 checked:border-transparent border-2"
              />
              <label className="text-white text-sm font-bold mb-2 ml-3" htmlFor="prompt">
                &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;
              </label>
              <input
                className="appearance-none rounded-full border-purple-500 w-5 h-5 mr-2 checked:bg-purple-500 checked:border-transparent border-2"
              />
              <label className="text-white text-sm font-bold mb-2 ml-3" htmlFor="prompt">
                &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;
              </label>
            </div>
          </div>
          <div className="flex justify-center mt-4 mb-4 ">
            <button
              className={`bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full items-center animate-pulse`}
            >
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultSkeleton;
