import { Composition } from "remotion";
import { HelloWorld, helloWorldSchema } from "./HelloWorld";

export const RemotionRoot = () => {
  return (
    <Composition
      id="HelloWorld"
      component={HelloWorld}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
      schema={helloWorldSchema}
      defaultProps={{
        title: "Hello, Remotion!",
        subtitle: "Our first test video",
      }}
    />
  );
};
