/**
 * Datalist of all Pokémon that are encountered on the routes
 * No need to ever use this list, use RouteHelper instead
 * If you ever need to use this list, request changes in RouteHelper instead.
 */

import { PokemonNameType } from '../pokemons/PokemonNameType';
import SpecialRoutePokemon from './SpecialRoutePokemon';

type routeBiomes = {
    bambooForest?: PokemonNameType[];
    beach?: PokemonNameType[];
    cave?: PokemonNameType[];
    caveWater?: PokemonNameType[];
    chargestone?: PokemonNameType[];
    desert?: PokemonNameType[];
    flower?: PokemonNameType[];
    forest?: PokemonNameType[];
    lake?: PokemonNameType[];
    mine?: PokemonNameType[];
    mountain?: PokemonNameType[];
    ocean?: PokemonNameType[];
    olive?: PokemonNameType[];
    prairie?: PokemonNameType[];
    riverside?: PokemonNameType[];
    rockyArea?: PokemonNameType[];
    ruins?: PokemonNameType[];
    snowfield?: PokemonNameType[];
    swamp?: PokemonNameType[];
    town?: PokemonNameType[];
    underground?: PokemonNameType[];
    volcano?: PokemonNameType[];
    wasteland?: PokemonNameType[];
}

export default class RoutePokemon {
    public land: PokemonNameType[];
    public water: PokemonNameType[];
    public headbutt: PokemonNameType[];
    public special: SpecialRoutePokemon[];

    constructor({
        land = [],
        water = [],
        headbutt = [],
        special = [],
    }: {
        land?: PokemonNameType[],
        water?: PokemonNameType[],
        headbutt?: PokemonNameType[],
        special?: SpecialRoutePokemon[],
    },

    public biomes: routeBiomes = {}

    ) {
        this.land = land;
        this.water = water;
        this.headbutt = headbutt;
        this.special = special;
    }
}
