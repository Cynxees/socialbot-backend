import { Post } from '@prisma/client';

export class PostResponseDto implements Partial<Post> {

  id: number;
  title: string;
  caption?: string;
  url: string[];
  media_type: 'image' | 'video' | 'both';
  location?: string;
  music?: string;
  published?: boolean;
  date: string;
  tags?: string[];
  hashtags?: string[];
  authorId?: number;
  

  constructor(post: Partial<Post>) {
    this.id = post.id;
    this.title = post.title;
    this.caption = post.caption;
    this.url = post.url;
    this.media_type = post.media_type;
    this.location = post.location;
    this.music = post.music;
    this.published = post.published;
    this.date = post.date;
    this.tags = post.tags;
    this.hashtags = post.hashtags;
    this.authorId = post.authorId;
  }
}
