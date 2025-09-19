import VideoBackground from "./sign-up/component/videoBackground";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full h-screen">
      <VideoBackground />

      {children}
    </div>
  );
}
