import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const Authorization = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    request.user = request.path;
    return request.user;
  }
)