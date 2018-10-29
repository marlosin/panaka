import { ImageResult } from '@app/shared/interfaces/image-result'

export function fakeImage(): ImageResult {
  return {
    link: '',
    image: {
      height: 100,
      thumbnailLink: '',
      thumbnailHeight: 50,
      thumbnailWidth: 50,
      width: 100,
    },
  }
}
