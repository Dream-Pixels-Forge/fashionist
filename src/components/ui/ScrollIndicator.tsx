export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span className="text-[0.625rem] uppercase tracking-[0.2em] text-off-white/60">
        Scroll
      </span>
      <div className="w-px h-10 bg-off-white/30" />
    </div>
  );
}
