import { PostGroup } from "../entities/post-group.entity";

export class PostGroupResponseDto implements Partial<PostGroup> {

  id: number;
  authorId: number;
  scheduledDate: Date;
  isPublished: boolean;
  postIds: number[];
  fileIds?: number[];
  musicId?: number;

  constructor(postGroup: Partial<PostGroup>) {
    Object.assign(this, postGroup);
  }
}
