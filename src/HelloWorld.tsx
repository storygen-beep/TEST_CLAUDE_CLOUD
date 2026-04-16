import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

export const helloWorldSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
});

export type HelloWorldProps = z.infer<typeof helloWorldSchema>;

export const HelloWorld = ({ title, subtitle }: HelloWorldProps) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const subtitleOpacity = interpolate(
    frame,
    [fps * 0.8, fps * 1.4],
    [0, 1],
    { extrapolateRight: "clamp" },
  );

  const subtitleY = interpolate(
    frame,
    [fps * 0.8, fps * 1.4],
    [20, 0],
    { extrapolateRight: "clamp" },
  );

  const outro = spring({
    frame: frame - (durationInFrames - fps * 0.7),
    fps,
    config: { damping: 200 },
  });
  const groupOpacity = 1 - outro;

  const hue = interpolate(frame, [0, durationInFrames], [220, 280]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, hsl(${hue}, 70%, 20%) 0%, hsl(${hue + 40}, 70%, 35%) 100%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        opacity: groupOpacity,
      }}
    >
      <div
        style={{
          transform: `scale(${titleScale})`,
          color: "white",
          fontSize: 140,
          fontWeight: 800,
          letterSpacing: -4,
        }}
      >
        {title}
      </div>
      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          color: "rgba(255, 255, 255, 0.85)",
          fontSize: 48,
          fontWeight: 400,
          marginTop: 24,
        }}
      >
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};
