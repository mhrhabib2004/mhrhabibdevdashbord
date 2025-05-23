export interface Project {
  _id: string;
  title: string;
  liveLink: string;
  image: string;
  descriptions: string;
  githubClient?: string;
  githubServer?: string;
  techStack?: string;
  features?: string;
  category?: string;
  videoDemo?: string;
  isTeamProject?: boolean;
  contributors?: string;
  createdAt?: string;
  updatedAt?: string;
}