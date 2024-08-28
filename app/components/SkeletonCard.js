'use client'

const loadingSPinner = <div className="flex items-center justify-center h-screen">
  <div className="w-16 h-16 border-4 border-t-4 border-gray-500 border-dotted rounded-full animate-spin"></div>
</div>

const loadingSPinner2 = <div className="flex items-center justify-center h-screen">
  <div className="w-6 h-6 border-4 border-t-4 border-gray-500 border-dotted rounded-full animate-spin"></div>
</div>

const SkeletonCard = () => {
  return (
    <div>     
      <div className="grid grid-cols-1 gap-4 p-4 ">
      <div className="w-full h-12 bg-gray-300 rounded animate-pulse flex justify-center items-center  ">{loadingSPinner2}</div>
        </div>
      <div className="grid grid-cols-2 gap-4 p-4">
        {Array(10).fill().map((_, index) => (
          <div
            key={index}
            className="w-full h-56 bg-gray-300 rounded animate-pulse flex justify-center items-center "
          >{loadingSPinner}</div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonCard;