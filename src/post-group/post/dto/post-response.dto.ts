import { Post } from "../entities/post.entity";

export class PostResponseDto implements Partial<Post> {

  id: number;
  title: string;
  description?: string;
  location?: string;
  published?: boolean;
  tags?: string[];
  hashtags?: string[];
  postGroupId?: number;
  constructor(post: Partial<Post>) {
    Object.assign(this,post)
  }
}
