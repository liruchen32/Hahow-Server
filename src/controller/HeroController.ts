import { Controller, Get, Path, Route, Header } from 'tsoa';
import { Hero, AuthHero } from '../interface/Hero';
import { HeroService } from '../service/HeroService';
@Route('heroes')
export class HeroController extends Controller {
  /**
   * Get Hero by hero_id
   *- If "request.headers" have "name" and "password", it will call verification and return with profile.
   * @param heroId The Hero's identifier
   * @param name Auth name
   * @param password Auth password
   * @returns Hero or Hero with profile
   */
  @Get('{heroId}')
  public async getHero(
    @Path() heroId: number,
    @Header('name') name?: string,
    @Header('password') password?: string,
  ): Promise<Hero | AuthHero> {
    if (name && password) {
      return await new HeroService().getAuthHeroByHeroId(String(name), String(password), heroId);
    }
    return await new HeroService().getById(heroId);
  }

  /**
   * Get all Heroes or Heroes with profiles
   *- If "request.headers" have "name" and "password", it will call verification and return with profile.
   * @param name Auth name
   * @param password Auth password
   * @returns Heroes or Heroes with profile
   */
  @Get()
  public async getHeroes(
    @Header('name') name?: string,
    @Header('password') password?: string,
  ): Promise<Hero[] | AuthHero[]> {
    if (name && password) {
      return await new HeroService().getAuthHeroes(String(name), String(password));
    }
    return await new HeroService().getAll();
  }
}
