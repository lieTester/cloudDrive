const LoadingPage = () => {
   return (
      <div className="flex flex-col items-center justify-center h-screen">
         <div className="animate-spin rounded-full border-t-2 border-b-2 border-blue-500 h-12 w-12"></div>
         <p className="text-gray-700 text-lg mt-4">
            Please wait, the content is loading...
         </p>
      </div>
   );
};

export default LoadingPage;
