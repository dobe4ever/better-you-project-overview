export interface Deployment {
    id: string
    title: string
    status: string
    previewUrl: string
    githubUrl: string
    previewImage: string
    timestamp: string
    comments: Array<{
      text: string
      timestamp: string
    }>
  }