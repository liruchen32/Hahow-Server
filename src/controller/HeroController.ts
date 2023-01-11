import { Request as ExRequest } from 'express';
import { Controller, Get, Path, Route, Request } from 'tsoa';
import { Hero, AuthHero } from '../interface/Hero';
import { HeroService } from '../service/HeroService';
@Route('heros')
export class HeroController extends Controller {
  @Get('{heroId}')
  public async getHero(@Path() heroId: number, @Request() req: ExRequest): Promise<Hero | AuthHero> {
    if (req.headers.name && req.headers.password) {
      const { name, password } = req.headers;
      return new HeroService().getAuthHero(String(name), String(password), heroId);
    }
    return new HeroService().get(heroId);
  }

  @Get()
  public async getHeros(): Promise<Hero[]> {
    return new HeroService().getAll();
  }
}
