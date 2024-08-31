import { Module } from "@nestjs/common";
import { GoogleModule } from "./google/google.module";
import { MetaModule } from "./meta/meta.module";

@Module({
  imports: [GoogleModule, MetaModule],
})
export class SocialMediaModule {}
