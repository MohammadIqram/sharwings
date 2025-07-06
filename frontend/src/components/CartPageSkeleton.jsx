const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-700 rounded ${className}`} />
);

const CartPageSkeleton = () => (
  <div className="py-8 md:py-16">
    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
        {/* Left: Cart Items Skeleton */}
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 md:p-6 flex gap-4"
            >
              <Skeleton className="w-20 h-20 md:w-32 md:h-32" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-7 w-3/5" />
                <Skeleton className="h-5 w-2/5" />
                <Skeleton className="h-5 w-1/3" />
                <div className="flex gap-2 items-center">
                  <Skeleton className="w-6 h-6 rounded-full" />
                  <Skeleton className="w-8 h-6" />
                  <Skeleton className="w-6 h-6 rounded-full" />
                </div>
              </div>
              <div className="w-24 flex flex-col items-end justify-between">
                <Skeleton className="h-7 w-3/4" />
                <Skeleton className="h-5 w-2/4" />
              </div>
            </div>
          ))}
          {/* PeopleAlsoBought Skeleton */}
          <div className="mt-8">
            <Skeleton className="w-full h-28" />
          </div>
        </div>
        {/* Right: Order Summary Skeleton */}
        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
          <div className="rounded-lg border p-6 shadow-sm border-gray-700 bg-gray-800 space-y-4">
            <Skeleton className="h-8 w-3/5" />
            <Skeleton className="h-7 w-2/5" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CartPageSkeleton;