import { Post } from '@prisma/client';

export class PostResponseDto implements Partial<Post> {

  id: number;
  title: string;
  caption?: string;
  location?: string;
  music?: string;
  published?: boolean;
  scheduledDate: Date;
  tags?: string[];
  hashtags?: string[];
  authorId: number;
  fileIds?: number[];

  constructor(post: Partial<Post>) {
    Object.assign(this,post)
  }
}
