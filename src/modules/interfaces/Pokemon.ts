import PokemonType from '../enums/PokemonType';

export default interface PokemonInterface {
    name: string;
    id: number;
    type: PokemonType[];
    shiny?: boolean;
}
