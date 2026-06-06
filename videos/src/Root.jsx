import { Composition } from 'remotion'
import { Day1Python } from './videos/Day1Python'

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Day1Python"
        component={Day1Python}
        durationInFrames={1100}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  )
}