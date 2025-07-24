import PokemonType from '../enums/PokemonType';
import { Region } from '../GameConstants';
import WeatherType from '../weather/WeatherType';
import { getPokemonByName } from '../pokemons/PokemonHelper';
import GameHelper from '../GameHelper';
import type { TmpPartyPokemonType } from '../TemporaryScriptTypes';

export default class DamageCalculator {
    public static type = ko.observableArray([PokemonType.None]);
    public static region = ko.observable(Region.none);
    public static subregion = ko.observable(-1);
    public static weather = ko.observable(WeatherType.Clear);
    public static includeBreeding = ko.observable(false);
    public static baseAttackOnly = ko.observable(false);
    public static ignoreLevel = ko.observable(false);
    public static detailType = ko.observableArray([PokemonType.None]);

    public static observableTypeDamageArray = ko.pureComputed(DamageCalculator.getDamageByTypes);
    public static observableTypeDetails = ko.pureComputed(DamageCalculator.getTypeDetail);
    public static observableTotalDamage = ko.pureComputed(DamageCalculator.totalDamage);

    public static initialize(): void {
        DamageCalculator.region.subscribe((value) => {
            const subregion = value == Region.none ? -1 : 0;
            DamageCalculator.subregion(subregion);
        });
    }

    public static totalDamage(): number {
        const ignoreRegionMultiplier = DamageCalculator.region() == Region.none;

        return App.game.party.calculatePokemonAttack(
            DamageCalculator.type(),
            ignoreRegionMultiplier,
            DamageCalculator.region(),
            DamageCalculator.includeBreeding(),
            DamageCalculator.baseAttackOnly(),
            DamageCalculator.weather(),
            DamageCalculator.ignoreLevel(),
            true,
            DamageCalculator.subregion(),
        );
    }

    public static getDamageByTypes(): number[] {
        const typedamage = new Array(GameHelper.enumLength(PokemonType) - 1).fill(0);
        const ignoreRegionMultiplier = DamageCalculator.region() == Region.none;
        const activePokemon  = App.game.party.partyPokemonActiveInSubRegion(DamageCalculator.region(), DamageCalculator.subregion());

        for (const pokemon of activePokemon) {
            const dataPokemon = getPokemonByName(pokemon.name);
            if (dataPokemon.type[0] === PokemonType.None) {
                continue;
            }

            const attack = App.game.party.calculateOnePokemonAttack(pokemon, DamageCalculator.type(), DamageCalculator.region(), ignoreRegionMultiplier,
                DamageCalculator.includeBreeding(), DamageCalculator.baseAttackOnly(), DamageCalculator.weather(), DamageCalculator.ignoreLevel());

            typedamage[dataPokemon.type[0]] += attack / 2;
            const otherType = dataPokemon.type[1] !== PokemonType.None ? dataPokemon.type[1] : dataPokemon.type[0];
            typedamage[otherType] += attack / 2;
        }

        return typedamage;
    }

    // TODO replace temporary type with PartyPokemon type once that class is ported
    public static getOneTypeDetail(pokemon: TmpPartyPokemonType): TypeDetail {
        const ignoreRegionMultiplier = DamageCalculator.region() == Region.none;
        const dataPokemon = getPokemonByName(pokemon.name);
        return {
            id: dataPokemon.id,
            name: dataPokemon.name,
            type: dataPokemon.type,
            damage: App.game.party.calculateOnePokemonAttack(
                pokemon,
                DamageCalculator.type(),
                DamageCalculator.region(),
                ignoreRegionMultiplier,
                DamageCalculator.includeBreeding(),
                DamageCalculator.baseAttackOnly(),
                DamageCalculator.weather(),
                DamageCalculator.ignoreLevel(),
            	true,
            ),
            displayName: pokemon.displayName,
        };
    }

    public static getTypeDetail(): TypeDetail[] {
        return App.game.party.partyPokemonActiveInSubRegion(DamageCalculator.region(), DamageCalculator.subregion()).filter(pokemon => {
            const dataPokemon = getPokemonByName(pokemon.name);
            return dataPokemon.type[0] == DamageCalculator.detailType()[0] || dataPokemon.type[1] == DamageCalculator.detailType()[1];
        }).reduce((details, pokemon) => {
            details.push(DamageCalculator.getOneTypeDetail(pokemon));
            return details;
        }, []).sort((a, b) => b.damage - a.damage);
    }
}

export type TypeDetail = {
    id: number,
    name: string,
    type: PokemonType[],
    damage: number,
    displayName: string,
};
