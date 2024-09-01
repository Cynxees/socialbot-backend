import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { YoutubeProfileResponseDto } from './dto/youtube-profile-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UploadYoutubeRequestDto } from './dto/upload-youtube-request.dto';
import { CustomLoggerService } from 'src/_infrastructure/logger/logger.service';

@Controller('youtube')
@ApiTags('Youtube')
@ApiBearerAuth()
export class YoutubeController {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly youtubeService: YoutubeService
  ) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getYoutubeProfile(@CurrentUser() user: JwtUser): Promise<YoutubeProfileResponseDto> {
    this.logger.start();

    const result = await this.youtubeService.getYoutubeProfile(user);

    this.logger.done();
    return result;
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  async uploadVideo(@Body() req: UploadYoutubeRequestDto, @CurrentUser() user: JwtUser) {
    this.logger.start();

    const result = await this.youtubeService.uploadVideo(req.fileId, user);

    this.logger.done();
    return result;
  }


}
