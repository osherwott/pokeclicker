class SpecialWandererPokemon {
    constructor(
        public pokemon: PokemonNameType[],
        public req: Requirement,
    ) {}

    isAvailable(): boolean {
        return this.req.isCompleted();
    }
}
