export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] w-full">
      <div className="relative">
        <div className="w-16 h-16 border-2 border-accent/20 rounded-full"></div>
        <div className="absolute inset-0 w-16 h-16 border-t-2 border-accent rounded-full animate-spin"></div>
        <div className="mt-8 text-accent font-serif tracking-widest text-center animate-pulse text-xs">
          SALONPRO
        </div>
      </div>
    </div>
  );
}
