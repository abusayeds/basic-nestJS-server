import { Controller, Get, Res } from '@nestjs/common';
import { sendResponse } from './utils/sendResponse';

@Controller()
export class AppController {
    @Get()
    getRoot(@Res() res) {
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Server is running ',
            data: null,
        });
    }
}