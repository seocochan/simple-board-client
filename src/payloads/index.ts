// common
export interface IPagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

// auth
export interface ILoginRequest {
  usernameOrEmail: string;
  password: string;
}
export interface ISignupReqeust {
  name: string;
  email: string;
  username: string;
  password: string;
}

// user
export interface IUserSummary {
  id: number;
  username: string;
  name: string;
}
export interface IUserProfileResponse extends IUserSummary {
  joinedAt: string;
  pollCount: number;
  voteCount: number;
}

// post
export interface IPostSummary {
  id: number;
  category: string;
  subCategory: string;
  title: string;
  text: string;
  imageUrl: string;
  createdBy: IUserSummary;
  createdAt: Date;
}
export interface IPostResponse extends IPostSummary {
  recommends: number;
  isRecommended: boolean;
}
export interface IPostRequest {
  category: string;
  subCategory: string;
  title: string;
  text: string;
  imageUrl?: string;
}

// comment
export interface ICommentResponse {
  id: number;
  text: string;
  role: string | null;
  post: IPostSummary;
  createdBy: IUserSummary;
  createdAt: Date;
}
export interface ICommentRequest {
  text: string;
  role?: string;
}
