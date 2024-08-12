import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FacebookService } from './facebook.service';

@Controller('facebook')
@ApiTags('Facebook')
export class FacebookController {
  constructor(private readonly facebookService: FacebookService) {}

  
  

}
