import { Body, Controller, Post } from "@nestjs/common";

import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller("orders")
export class OrdersController {
  constructor() {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createOrderDto: any,
  ) {
    return null;
  }
}