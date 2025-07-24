class PokedexPokemon implements PokemonInterface {
    name: string;
    id: number;
    type: PokemonType[];
    kills: number;
    catches: number;
    shiny: boolean;

    constructor(name: string, id: number, type: PokemonType[], kills: number, catches: number, shiny: boolean) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.kills = kills;
        this.catches = catches;
        this.shiny = shiny;
    }
}
