import { Module } from "@nestjs/common";
import { YoutubeModule } from "./youtube/youtube.module";
import { GoogleUserModule } from "./google-user/google_user.module";

@Module({
  imports: [GoogleUserModule, YoutubeModule],
})
export class GoogleModule {}
