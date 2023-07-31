import { UserEntity } from 'src/entities/user.entity';

export type CreateOtpParam = {
  mobile: number;
};

export type CreateOtpResponse = {
  mobile: number;
  code: number;
};

export type CheckOtpParams = {
  mobile: number;
  code: number;
};

export interface AuthenticatedRequest extends Request {
  currentUser: UserEntity;
}

export type CreateBlogParams = {
  content: string;

  slug: string;
  title: string;
};
