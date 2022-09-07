/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="Pokeball.ts" />

class Pokeballs implements Feature {
    name = 'Pokeballs';
    saveKey = 'pokeballs';

    defaults = {
        alreadyCaughtSelection: GameConstants.Pokeball.None,
        alreadyCaughtShinySelection: GameConstants.Pokeball.Pokeball,
        notCaughtSelection: GameConstants.Pokeball.Pokeball,
        notCaughtShinySelection: GameConstants.Pokeball.Pokeball,
        // Types
        typeNormalSelection: GameConstants.Pokeball.None,
        typeFireSelection: GameConstants.Pokeball.None,
        typeWaterSelection: GameConstants.Pokeball.None,
        typeElectricSelection: GameConstants.Pokeball.None,
        typeGrassSelection: GameConstants.Pokeball.None,
        typeIceSelection: GameConstants.Pokeball.None,
        typeFightingSelection: GameConstants.Pokeball.None,
        typePoisonSelection: GameConstants.Pokeball.None,
        typeGroundSelection: GameConstants.Pokeball.None,
        typeFlyingSelection: GameConstants.Pokeball.None,
        typePsychicSelection: GameConstants.Pokeball.None,
        typeBugSelection: GameConstants.Pokeball.None,
        typeRockSelection: GameConstants.Pokeball.None,
        typeGhostSelection: GameConstants.Pokeball.None,
        typeDragonSelection: GameConstants.Pokeball.None,
        typeDarkSelection: GameConstants.Pokeball.None,
        typeSteelSelection: GameConstants.Pokeball.None,
        typeFairySelection: GameConstants.Pokeball.None,
    };

    public pokeballs: Pokeball[];
    public pokeballSelectors: PokeballSelector[];
    
    // Types
    private _typeNormalSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _typeFireSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _typeWaterSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _typeElectricSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _typeGrassSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _typeIceSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _typeFightingSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _typePoisonSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _typeGroundSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _typeFlyingSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _typePsychicSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _typeBugSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _typeRockSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _typeGhostSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _typeDragonSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _typeDarkSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _typeSteelSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _typeFairySelection: KnockoutObservable<GameConstants.Pokeball>;
    // Beast Ball Toggles
    public catchUltraBeast: KnockoutObservable<boolean>;
    public catchUltraBeastShiny: KnockoutObservable<boolean>;

    public selectedSelection: KnockoutObservable<KnockoutObservable<GameConstants.Pokeball>>;
    public selectedTitle: KnockoutObservable<string>;

    constructor() {
        this.pokeballs = [
            new Pokeball(GameConstants.Pokeball.Pokeball, () => 0, 1250, 'A standard Poké Ball', undefined, 25),
            new Pokeball(GameConstants.Pokeball.Greatball, () => 5, 1000, '+5% chance to catch'),
            new Pokeball(GameConstants.Pokeball.Ultraball, () => 10, 750, '+10% chance to catch'),
            new Pokeball(GameConstants.Pokeball.Masterball, () => 100, 500, '100% chance to catch'),
            new Pokeball(GameConstants.Pokeball.Fastball, () => 0, 500, 'Reduced catch time', new RouteKillRequirement(10, GameConstants.Region.johto, 34)),
            new Pokeball(GameConstants.Pokeball.Quickball, () => {
                if (App.game.gameState == GameConstants.GameState.fighting && player.route()) {
                    const kills = App.game.statistics.routeKills[GameConstants.Region[player.region]]?.[player.route()]?.() || 0;
                    // between 15 (0 kills) → 0 (4012 kills)
                    return Math.min(15, Math.max(0, Math.pow(16, 1 - Math.pow(Math.max(0, kills - 10), 0.6) / 145) - 1));
                }
                if (App.game.gameState == GameConstants.GameState.dungeon) {
                    return Math.min(15,Math.pow(DungeonRunner.timeLeftPercentage(),2) / 500);
                }
                return 0;
            }, 1000, 'Increased catch rate on routes with less Pokémon defeated', new RouteKillRequirement(10, GameConstants.Region.johto, 34)),
            new Pokeball(GameConstants.Pokeball.Timerball, () => {
                if (App.game.gameState == GameConstants.GameState.fighting && player.route()) {
                    const kills = App.game.statistics.routeKills[GameConstants.Region[player.region]]?.[player.route()]?.() || 0;
                    // between 0 (0 kills) → 15 (9920 kills)
                    return Math.min(15, Math.max(0, Math.pow(16, Math.pow(kills, 0.6) / 250) - 1));
                }
                if (App.game.gameState == GameConstants.GameState.dungeon) {
                    const maxBonus = 15;
                    const timeLeftPercent = DungeonRunner.timeLeftPercentage();
                    const timeLeftPercentWhenMax = 15;
                    return (timeLeftPercentWhenMax < timeLeftPercent) ? (200 / timeLeftPercent - 2) : maxBonus;
                }
                return 0;
            }, 1000, 'Increased catch rate on routes with more Pokémon defeated', new RouteKillRequirement(10, GameConstants.Region.johto, 34)),
            new Pokeball(GameConstants.Pokeball.Duskball, () => {
                const now = new Date();
                // If player in a dungeon or it's night time
                if (App.game.gameState == GameConstants.GameState.dungeon || now.getHours() >= 18 || now.getHours() < 6) {
                    return 15;
                }
                return 0;
            }, 1000, 'Increased catch rate at night time or in dungeons', new RouteKillRequirement(10, GameConstants.Region.johto, 34)),
            // TODO: this needs some sort of bonus, possibly extra dungeon tokens
            new Pokeball(GameConstants.Pokeball.Luxuryball, () => 0, 1250, 'A Luxury Poké Ball', new RouteKillRequirement(10, GameConstants.Region.johto, 34)),

            new Pokeball(GameConstants.Pokeball.Diveball, () => {

                // If area is a water environment,
                if (MapHelper.getCurrentEnvironment() == 'Water') {
                    return 15;
                }
                return 0;
            }, 1250, 'Increased catch rate on water routes', new RouteKillRequirement(10, GameConstants.Region.hoenn, 101)),

            new Pokeball(GameConstants.Pokeball.Lureball, () => {
                const numLandPokemon = Routes.getRoute(player.region,player.route()).pokemon.land.length > 0;
                const isWaterPokemon = Routes.getRoute(player.region,player.route()).pokemon.water.includes(Battle.enemyPokemon().name);

                // If route has Land Pokémon and the current pokémon is a Water Pokémon
                if (numLandPokemon == true && isWaterPokemon == true) {
                    return 15;
                }
                return 0;
            }, 1250, 'Increased catch rate on fished Pokémon', new RouteKillRequirement(10, GameConstants.Region.hoenn, 101)),

            new Pokeball(GameConstants.Pokeball.Nestball, () => {
                const highestRegionRoutes = Routes.getRoutesByRegion(player.highestRegion());
                const maxRoute = MapHelper.normalizeRoute(highestRegionRoutes[highestRegionRoutes.length - 1].number, player.highestRegion());
                const currentRoute = MapHelper.normalizeRoute(player.route(),player.region);

                // Increased rate for earlier routes, scales with regional progression
                return Math.min(15,Math.max(1,player.highestRegion()) * Math.max(1,(maxRoute / currentRoute)));
            }, 1250, 'Increased catch rate on earlier routes', new RouteKillRequirement(10, GameConstants.Region.johto, 34)),

            new Pokeball(GameConstants.Pokeball.Repeatball, () => {
                const amountCaught = App.game.statistics.pokemonCaptured[Battle.enemyPokemon().id]();

                return Math.min(15,Math.pow(amountCaught,2) / 5000);
            }, 1250, 'Increased catch rate and EV gain rate with more catches', new RouteKillRequirement(10, GameConstants.Region.johto, 34)),

            new Pokeball(GameConstants.Pokeball.Beastball, () => {
                return 10;
            }, 1000, 'Can only be used on Ultra Beasts', new TemporaryBattleRequirement('Anabel')),
        ];
        this.pokeballSelectors = [
            new PokeballSelector(GameConstants.PokeballSelector.alreadyCaught, 'Already Caught Pokémon', '', this.defaults.alreadyCaughtSelection),
            new PokeballSelector(GameConstants.PokeballSelector.alreadyCaughtShiny, 'Already Caught Shiny Pokémon', '', this.defaults.alreadyCaughtShinySelection),
            new PokeballSelector(GameConstants.PokeballSelector.notCaught, 'New Pokémon', '', this.defaults.notCaughtSelection),
            new PokeballSelector(GameConstants.PokeballSelector.notCaughtShiny, 'New Shiny Pokémon', '', this.defaults.notCaughtShinySelection),
        ];
        // Types
        this._typeNormalSelection = ko.observable(this.defaults.typeNormalSelection);
        this._typeFireSelection = ko.observable(this.defaults.typeFireSelection);
        this._typeWaterSelection = ko.observable(this.defaults.typeWaterSelection);
        this._typeElectricSelection = ko.observable(this.defaults.typeElectricSelection);
        this._typeGrassSelection = ko.observable(this.defaults.typeGrassSelection);
        this._typeIceSelection = ko.observable(this.defaults.typeIceSelection);
        this._typeFightingSelection = ko.observable(this.defaults.typeFightingSelection);
        this._typePoisonSelection = ko.observable(this.defaults.typePoisonSelection);
        this._typeGroundSelection = ko.observable(this.defaults.typeGroundSelection);
        this._typeFlyingSelection = ko.observable(this.defaults.typeFlyingSelection);
        this._typePsychicSelection = ko.observable(this.defaults.typePsychicSelection);
        this._typeBugSelection = ko.observable(this.defaults.typeBugSelection);
        this._typeRockSelection = ko.observable(this.defaults.typeRockSelection);
        this._typeGhostSelection = ko.observable(this.defaults.typeGhostSelection);
        this._typeDragonSelection = ko.observable(this.defaults.typeDragonSelection);
        this._typeDarkSelection = ko.observable(this.defaults.typeDarkSelection);
        this._typeSteelSelection = ko.observable(this.defaults.typeSteelSelection);
        this._typeFairySelection = ko.observable(this.defaults.typeFairySelection);
        // Beast Ball Toggles
        this.catchUltraBeast = ko.observable(false);
        this.catchUltraBeastShiny = ko.observable(false);

        this.selectedTitle = ko.observable('');
        this.selectedSelection = ko.observable(ko.observable(this.defaults.alreadyCaughtSelection));
    }

    initialize(): void {
        ([
            this.pokeballSelectors[GameConstants.PokeballSelector.alreadyCaught].pokeball,
            this.pokeballSelectors[GameConstants.PokeballSelector.alreadyCaughtShiny].pokeball,
            this.pokeballSelectors[GameConstants.PokeballSelector.notCaught].pokeball,
            this.pokeballSelectors[GameConstants.PokeballSelector.notCaughtShiny].pokeball,
            // Types
            this._typeNormalSelection,
            this._typeFireSelection,
            this._typeWaterSelection,
            this._typeElectricSelection,
            this._typeGrassSelection,
            this._typeIceSelection,
            this._typeFightingSelection,
            this._typePoisonSelection,
            this._typeGroundSelection,
            this._typeFlyingSelection,
            this._typePsychicSelection,
            this._typeBugSelection,
            this._typeRockSelection,
            this._typeGhostSelection,
            this._typeDragonSelection,
            this._typeDarkSelection,
            this._typeSteelSelection,
            this._typeFairySelection,
        ]).forEach(selection => {
            selection.subscribe(value => {
                // switch to Ultraball if Masterball is selected
                if (value == GameConstants.Pokeball.Masterball && App.game.challenges.list.disableMasterballs.active()) {
                    selection(GameConstants.Pokeball.Ultraball);
                    Notifier.notify({
                        title: 'Challenge Mode',
                        message: 'Master Balls are disabled!',
                        type: NotificationConstants.NotificationOption.danger,
                    });
                } else if (!this.pokeballs[value]?.unlocked()) {
                    selection(GameConstants.Pokeball.None);
                }
            });
        });
    }

    /**
     * Checks the players preferences to see what pokéball needs to be used on the next throw.
     * Checks from the players pref to the most basic ball to see if the player has any.
     * @param id the pokemon we are trying to catch.
     * @param isShiny if the Pokémon is shiny.
     * @returns {GameConstants.Pokeball} pokéball to use.
     */
    public calculatePokeballToUse(id: number, isShiny: boolean): GameConstants.Pokeball {
        const alreadyCaught = App.game.party.alreadyCaughtPokemon(id);
        const alreadyCaughtShiny = App.game.party.alreadyCaughtPokemon(id, true);
        const pokemon = PokemonHelper.getPokemonById(id);
        let pref: GameConstants.Pokeball;

        // just check against alreadyCaughtShiny as this returns false when you don't have the pokemon yet.

        if (isShiny) {
            if (!alreadyCaughtShiny) {
                pref = this.pokeballSelectors[GameConstants.PokeballSelector.notCaughtShiny].pokeball();
            } else {
                pref = this.pokeballSelectors[GameConstants.PokeballSelector.alreadyCaughtShiny].pokeball();
            }
        } else {
            if (!alreadyCaught) {
                pref = this.pokeballSelectors[GameConstants.PokeballSelector.notCaught].pokeball();
            } else {
                pref = this.pokeballSelectors[GameConstants.PokeballSelector.alreadyCaught].pokeball();
            }
        }

        // Types
        if (pokemon.type1 == PokemonType.Normal || pokemon.type2 == PokemonType.Normal) {
            pref = Math.max(pref, this.typeNormalSelection);
        }
        if (pokemon.type1 == PokemonType.Fire || pokemon.type2 == PokemonType.Fire) {
            pref = Math.max(pref, this.typeFireSelection);
        }
        if (pokemon.type1 == PokemonType.Water || pokemon.type2 == PokemonType.Water) {
            pref = Math.max(pref, this.typeWaterSelection);
        }
        if (pokemon.type1 == PokemonType.Electric || pokemon.type2 == PokemonType.Electric) {
            pref = Math.max(pref, this.typeElectricSelection);
        }
        if (pokemon.type1 == PokemonType.Grass || pokemon.type2 == PokemonType.Grass) {
            pref = Math.max(pref, this.typeGrassSelection);
        }
        if (pokemon.type1 == PokemonType.Ice || pokemon.type2 == PokemonType.Ice) {
            pref = Math.max(pref, this.typeIceSelection);
        }
        if (pokemon.type1 == PokemonType.Fighting || pokemon.type2 == PokemonType.Fighting) {
            pref = Math.max(pref, this.typeFightingSelection);
        }
        if (pokemon.type1 == PokemonType.Poison || pokemon.type2 == PokemonType.Poison) {
            pref = Math.max(pref, this.typePoisonSelection);
        }
        if (pokemon.type1 == PokemonType.Ground || pokemon.type2 == PokemonType.Ground) {
            pref = Math.max(pref, this.typeGroundSelection);
        }
        if (pokemon.type1 == PokemonType.Flying || pokemon.type2 == PokemonType.Flying) {
            pref = Math.max(pref, this.typeFlyingSelection);
        }
        if (pokemon.type1 == PokemonType.Psychic || pokemon.type2 == PokemonType.Psychic) {
            pref = Math.max(pref, this.typePsychicSelection);
        }
        if (pokemon.type1 == PokemonType.Bug || pokemon.type2 == PokemonType.Bug) {
            pref = Math.max(pref, this.typeBugSelection);
        }
        if (pokemon.type1 == PokemonType.Rock || pokemon.type2 == PokemonType.Rock) {
            pref = Math.max(pref, this.typeRockSelection);
        }
        if (pokemon.type1 == PokemonType.Ghost || pokemon.type2 == PokemonType.Ghost) {
            pref = Math.max(pref, this.typeGhostSelection);
        }
        if (pokemon.type1 == PokemonType.Dragon || pokemon.type2 == PokemonType.Dragon) {
            pref = Math.max(pref, this.typeDragonSelection);
        }
        if (pokemon.type1 == PokemonType.Dark || pokemon.type2 == PokemonType.Dark) {
            pref = Math.max(pref, this.typeDarkSelection);
        }
        if (pokemon.type1 == PokemonType.Steel || pokemon.type2 == PokemonType.Steel) {
            pref = Math.max(pref, this.typeSteelSelection);
        }
        if (pokemon.type1 == PokemonType.Fairy || pokemon.type2 == PokemonType.Fairy) {
            pref = Math.max(pref, this.typeFairySelection);
        }

        let use: GameConstants.Pokeball = GameConstants.Pokeball.None;

        if (pref == GameConstants.Pokeball.Beastball) {
            if (GameConstants.UltraBeastType[pokemon.name] != undefined && this.pokeballs[GameConstants.Pokeball.Beastball].quantity() > 0) {
                return GameConstants.Pokeball.Beastball;
            } else {
                return GameConstants.Pokeball.None;
            }
        } else if (GameConstants.UltraBeastType[pokemon.name] != undefined) {
            if (this.pokeballs[GameConstants.Pokeball.Beastball].quantity() > 0) {
                if (this.catchUltraBeast()) {
                    return GameConstants.Pokeball.Beastball;
                } else if (isShiny && this.catchUltraBeastShiny()) {
                    return GameConstants.Pokeball.Beastball;
                } else {
                    return GameConstants.Pokeball.None;
                }
            } else {
                return GameConstants.Pokeball.None;
            }
        }

        if (this.pokeballs[pref]?.quantity()) {
            return pref;
        } else if (pref <= GameConstants.Pokeball.Masterball) {
            // Check which Pokeballs we have in stock that are of equal or lesser than selection (upto Masterball)
            for (let i: number = pref; i >= 0; i--) {
                if (this.pokeballs[i].quantity() > 0) {
                    use = i;
                    break;
                }
            }
            return use;
        } else {
            // Use a normal Pokeball or None if we don't have Pokeballs in stock
            return this.pokeballs[GameConstants.Pokeball.Pokeball].quantity() ? GameConstants.Pokeball.Pokeball : GameConstants.Pokeball.None;
        }
    }

    calculateCatchTime(ball: GameConstants.Pokeball): number {
        return this.pokeballs[ball].catchTime;
    }

    gainPokeballs(ball: GameConstants.Pokeball, amount: number, purchase = true): void {
        GameHelper.incrementObservable(this.pokeballs[ball].quantity, amount);
        GameHelper.incrementObservable(App.game.statistics.pokeballsObtained[ball],amount);
        if (purchase === true) {
            GameHelper.incrementObservable(App.game.statistics.pokeballsPurchased[ball],amount);
        }
    }

    usePokeball(ball: GameConstants.Pokeball): void {
        GameHelper.incrementObservable(this.pokeballs[ball].quantity, -1);
        GameHelper.incrementObservable(App.game.statistics.pokeballsUsed[ball]);
    }

    getCatchBonus(ball: GameConstants.Pokeball): number {
        return this.pokeballs[ball].catchBonus();
    }

    getBallQuantity(ball: GameConstants.Pokeball): number {
        const pokeball = this.pokeballs[ball];
        return pokeball ? pokeball.quantity() : 0;
    }

    getEPBonus(ball: GameConstants.Pokeball): number {
        const pokeballType = this.pokeballs[ball].type;
        return pokeballType == GameConstants.Pokeball.Repeatball ? GameConstants.REPEATBALL_EP_MODIFIER : 1;
    }

    canAccess(): boolean {
        return true;
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        if (json.pokeballs != null) {
            json.pokeballs.map((amt: number, type: number) => this.pokeballs[type].quantity(amt));
        }
        if (json.pokeballSelectors != null) {
            json.pokeballSelectors.map((pokeball: GameConstants.Pokeball, type: number) => this.pokeballSelectors[type].pokeball(pokeball));
        }
        // Types
        this.typeNormalSelection = json.typeNormalSelection ?? this.defaults.typeNormalSelection;
        this.typeFireSelection = json.typeFireSelection ?? this.defaults.typeFireSelection;
        this.typeWaterSelection = json.typeWaterSelection ?? this.defaults.typeWaterSelection;
        this.typeElectricSelection = json.typeElectricSelection ?? this.defaults.typeElectricSelection;
        this.typeGrassSelection = json.typeGrassSelection ?? this.defaults.typeGrassSelection;
        this.typeIceSelection = json.typeIceSelection ?? this.defaults.typeIceSelection;
        this.typeFightingSelection = json.typeFightingSelection ?? this.defaults.typeFightingSelection;
        this.typePoisonSelection = json.typePoisonSelection ?? this.defaults.typePoisonSelection;
        this.typeGroundSelection = json.typeGroundSelection ?? this.defaults.typeGroundSelection;
        this.typeFlyingSelection = json.typeFlyingSelection ?? this.defaults.typeFlyingSelection;
        this.typePsychicSelection = json.typePsychicSelection ?? this.defaults.typePsychicSelection;
        this.typeBugSelection = json.typeBugSelection ?? this.defaults.typeBugSelection;
        this.typeRockSelection = json.typeRockSelection ?? this.defaults.typeRockSelection;
        this.typeGhostSelection = json.typeGhostSelection ?? this.defaults.typeGhostSelection;
        this.typeDragonSelection = json.typeDragonSelection ?? this.defaults.typeDragonSelection;
        this.typeDarkSelection = json.typeDarkSelection ?? this.defaults.typeDarkSelection;
        this.typeSteelSelection = json.typeSteelSelection ?? this.defaults.typeSteelSelection;
        this.typeFairySelection = json.typeFairySelection ?? this.defaults.typeFairySelection;
        // Beast Ball
        this.catchUltraBeast(json.catchUltraBeast ?? false);
        this.catchUltraBeastShiny(json.catchUltraBeastShiny ?? false);
    }

    toJSON(): Record<string, any> {
        return {
            'pokeballs': this.pokeballs.map(p => p.quantity()),
            'pokeballSelectors': this.pokeballSelectors.map(ps => ps.pokeball()),
            // Types
            'typeNormalSelection': this.typeNormalSelection,
            'typeFireSelection': this.typeFireSelection,
            'typeWaterSelection': this.typeWaterSelection,
            'typeElectricSelection': this.typeElectricSelection,
            'typeGrassSelection': this.typeGrassSelection,
            'typeIceSelection': this.typeIceSelection,
            'typeFightingSelection': this.typeFightingSelection,
            'typePoisonSelection': this.typePoisonSelection,
            'typeGroundSelection': this.typeGroundSelection,
            'typeFlyingSelection': this.typeFlyingSelection,
            'typePsychicSelection': this.typePsychicSelection,
            'typeBugSelection': this.typeBugSelection,
            'typeRockSelection': this.typeRockSelection,
            'typeGhostSelection': this.typeGhostSelection,
            'typeDragonSelection': this.typeDragonSelection,
            'typeDarkSelection': this.typeDarkSelection,
            'typeSteelSelection': this.typeSteelSelection,
            'typeFairySelection': this.typeFairySelection,
            // Beast Ball Toggles
            'catchUltraBeast': this.catchUltraBeast(),
            'catchUltraBeastShiny': this.catchUltraBeastShiny(),
        };
    }

    update(delta: number): void {
        // This method intentionally left blank
    }

    // Types
    get typeNormalSelection() {
        return this._typeNormalSelection();
    }
    set typeNormalSelection(ball: GameConstants.Pokeball) {
        this._typeNormalSelection(ball);
    }

    get typeFireSelection() {
        return this._typeFireSelection();
    }
    set typeFireSelection(ball: GameConstants.Pokeball) {
        this._typeFireSelection(ball);
    }

    get typeWaterSelection() {
        return this._typeWaterSelection();
    }
    set typeWaterSelection(ball: GameConstants.Pokeball) {
        this._typeWaterSelection(ball);
    }

    get typeElectricSelection() {
        return this._typeElectricSelection();
    }
    set typeElectricSelection(ball: GameConstants.Pokeball) {
        this._typeElectricSelection(ball);
    }

    get typeGrassSelection() {
        return this._typeGrassSelection();
    }
    set typeGrassSelection(ball: GameConstants.Pokeball) {
        this._typeGrassSelection(ball);
    }

    get typeIceSelection() {
        return this._typeIceSelection();
    }
    set typeIceSelection(ball: GameConstants.Pokeball) {
        this._typeIceSelection(ball);
    }

    get typeFightingSelection() {
        return this._typeFightingSelection();
    }
    set typeFightingSelection(ball: GameConstants.Pokeball) {
        this._typeFightingSelection(ball);
    }

    get typePoisonSelection() {
        return this._typePoisonSelection();
    }
    set typePoisonSelection(ball: GameConstants.Pokeball) {
        this._typePoisonSelection(ball);
    }

    get typeGroundSelection() {
        return this._typeGroundSelection();
    }
    set typeGroundSelection(ball: GameConstants.Pokeball) {
        this._typeGroundSelection(ball);
    }

    get typeFlyingSelection() {
        return this._typeFlyingSelection();
    }
    set typeFlyingSelection(ball: GameConstants.Pokeball) {
        this._typeFlyingSelection(ball);
    }

    get typePsychicSelection() {
        return this._typePsychicSelection();
    }
    set typePsychicSelection(ball: GameConstants.Pokeball) {
        this._typePsychicSelection(ball);
    }

    get typeBugSelection() {
        return this._typeBugSelection();
    }
    set typeBugSelection(ball: GameConstants.Pokeball) {
        this._typeBugSelection(ball);
    }

    get typeRockSelection() {
        return this._typeRockSelection();
    }
    set typeRockSelection(ball: GameConstants.Pokeball) {
        this._typeRockSelection(ball);
    }

    get typeGhostSelection() {
        return this._typeGhostSelection();
    }
    set typeGhostSelection(ball: GameConstants.Pokeball) {
        this._typeGhostSelection(ball);
    }

    get typeDragonSelection() {
        return this._typeDragonSelection();
    }
    set typeDragonSelection(ball: GameConstants.Pokeball) {
        this._typeDragonSelection(ball);
    }

    get typeDarkSelection() {
        return this._typeDarkSelection();
    }
    set typeDarkSelection(ball: GameConstants.Pokeball) {
        this._typeDarkSelection(ball);
    }

    get typeSteelSelection() {
        return this._typeSteelSelection();
    }
    set typeSteelSelection(ball: GameConstants.Pokeball) {
        this._typeSteelSelection(ball);
    }

    get typeFairySelection() {
        return this._typeFairySelection();
    }
    set typeFairySelection(ball: GameConstants.Pokeball) {
        this._typeFairySelection(ball);
    }
}
