import { UserEntity } from 'src/entities/user.entity';

export type CreateOtpParam = {
  email: string;
};

export type CreateOtpResponse = {
  email: string;
  code: number;
};

export type CheckOtpParams = {
  email: string;
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
