import { Controller, Get, Path, Route } from 'tsoa';
import { Hero } from '../interface/Hero';
import { HeroService } from '../service/HeroService';

@Route('heroes')
export class HeroController extends Controller {
  @Get('{heroId}')
  public async getHero(@Path() heroId: number): Promise<Hero> {
    return new HeroService().get(heroId);
  }

  @Get()
  public async getHeros(): Promise<Hero[]> {
    return new HeroService().getAll();
  }
}
