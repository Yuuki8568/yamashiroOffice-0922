export function Logo({ size = 40 }: { size?: number }) {
  return (
    <img
      src="/images/logo.png"
      alt=""
      width={size}
      height={size}
      aria-hidden="true"
      className="shrink-0 select-none"
      draggable={false}
    />
  );
}
