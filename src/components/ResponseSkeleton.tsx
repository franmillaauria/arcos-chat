export const ResponseSkeleton = () => {
  return (
    <div className="max-w-[900px] animate-pulse">
      <div className="space-y-3">
        <div className="h-5 bg-muted rounded w-full"></div>
        <div className="h-5 bg-muted rounded w-[95%]"></div>
        <div className="h-5 bg-muted rounded w-[88%]"></div>
        <div className="h-5 bg-muted rounded w-[92%]"></div>
        <div className="h-5 bg-muted rounded w-[78%]"></div>
      </div>
    </div>
  );
};