import { cn } from "@/lib/utils";
type M = { children: React.ReactNode; reverse?: boolean; vertical?: boolean; pauseOnHover?: boolean; className?: string };
export function Marquee({ children, reverse, vertical, pauseOnHover, className }: M) {
  return (
    <div className={cn("group flex gap-[var(--gap)] overflow-hidden [--gap:1rem]", vertical ? "flex-col" : "flex-row", className)}>
      {[0, 1].map((i) => (
        <div key={i} aria-hidden={i === 1} className={cn("flex shrink-0 justify-around gap-[var(--gap)]", vertical ? "flex-col animate-marquee-y" : "animate-marquee-x", reverse && "[animation-direction:reverse]", pauseOnHover && "group-hover:[animation-play-state:paused]")}>{children}</div>
      ))}
    </div>
  );
}
