import { Post } from '@prisma/client';

export class PostResponseDto implements Partial<Post> {

  id: number;
  title: string;
  description: string;
  location: string;
  music?: string;
  published?: boolean;
  tags?: string[];
  hashtags?: string[];
  fileIds?: number[];
  postGroupId?: number;
  constructor(post: Partial<Post>) {
    Object.assign(this,post)
  }
}
