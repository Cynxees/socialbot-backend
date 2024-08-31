import { Controller, Get, UseGuards } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { YoutubeProfileResponseDto } from './dto/youtube-profile-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('youtube')
@ApiTags('Youtube')
@ApiBearerAuth()
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getYoutubeProfile(@CurrentUser() user: JwtUser): Promise<YoutubeProfileResponseDto> {
    return await this.youtubeService.getYoutubeProfile(user);
  }


}
