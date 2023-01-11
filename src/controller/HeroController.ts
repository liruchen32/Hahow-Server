import { Controller, Get, Path, Route, Header } from 'tsoa';
import { Hero, AuthHero } from '../interface/Hero';
import { HeroService } from '../service/HeroService';
@Route('heros')
export class HeroController extends Controller {
  /**
   * Get Hero by hero_id
   *- If "request.headers" have "name" and "password", it will call verification and return with profile.
   * @param heroId The Hero's identifier
   * @returns Hero or Hero with profile
   */
  @Get('{heroId}')
  public async getHero(
    @Path() heroId: number,
    @Header('name') name?: string,
    @Header('password') password?: string,
  ): Promise<Hero | AuthHero> {
    if (name && password) {
      // const { name, password } = req.headers;
      return new HeroService().getAuthHero(String(name), String(password), heroId);
    }
    return new HeroService().get(heroId);
  }

  /**
   * Get all Heros or Heros with profiles
   *- If "request.headers" have "name" and "password", it will call verification and return with profile.
   * @returns Heros or Heros with profile
   */
  @Get()
  public async getHeros(
    @Header('name') name?: string,
    @Header('password') password?: string,
  ): Promise<Hero[] | AuthHero[]> {
    if (name && password) {
      return new HeroService().getAuthHeros(String(name), String(password));
    }
    return new HeroService().getAll();
  }
}
