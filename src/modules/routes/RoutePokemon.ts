/**
 * Datalist of all Pokémon that are encountered on the routes
 * No need to ever use this list, use RouteHelper instead
 * If you ever need to use this list, request changes in RouteHelper instead.
 */

import { PokemonNameType } from '../pokemons/PokemonNameType';
import SpecialRoutePokemon from './SpecialRoutePokemon';

export default class RoutePokemon {
    public land: PokemonNameType[];
    public water: PokemonNameType[];
    public headbutt: PokemonNameType[];
    public eggExclusive: PokemonNameType[];
    public afterJohtoLeague: PokemonNameType[];
    public special: SpecialRoutePokemon[];

    constructor({
        land = [],
        water = [],
        headbutt = [],
        eggExclusive = [],
        afterJohtoLeague = [],
        special = [],
    }: {
        land?: PokemonNameType[],
        water?: PokemonNameType[],
        headbutt?: PokemonNameType[],
        eggExclusive?: PokemonNameType[],
        afterJohtoLeague?: PokemonNameType[],
        special?: SpecialRoutePokemon[],
    }) {
        this.land = land;
        this.water = water;
        this.headbutt = headbutt;
        this.eggExclusive = eggExclusive;
        this.afterJohtoLeague = afterJohtoLeague;
        this.special = special;
    }
}
