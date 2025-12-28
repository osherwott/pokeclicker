import { error } from 'jquery';
import ContestHelper from '../contest/ContestHelper';
import ContestRank from '../enums/ContestRank';
import ContestType from '../enums/ContestType';
import KeyItemType from '../enums/KeyItemType';
import RibbonEnums from '../enums/Ribbons';
import { camelCaseToString, getGymIndex, humanifyString, MAX_AVAILABLE_REGION, Region, RegionGyms } from '../GameConstants';
import ClearGymRequirement from '../requirements/ClearGymRequirement';
import ContestWonRequirement from '../requirements/ContestWonRequirement';
import { TmpPartyPokemonType } from '../TemporaryScriptTypes';
import ContestTypeHelper from '../types/ContestTypeHelper';
import { pokemonMap } from '../pokemons/PokemonList';
import WeatherType from '../weather/WeatherType';
import CustomRequirement from '../requirements/CustomRequirement';
import NullRequirement from '../requirements/NullRequirement';
import MultiRequirement from '../requirements/MultiRequirement';
import GameHelper from '../GameHelper';

export default class RibbonHelper {
    public static isVisible(ribbon: RibbonEnums): boolean {
        switch (ribbon) {
            // Regional Champion
            case RibbonEnums.Champion:
                return new ClearGymRequirement(10, getGymIndex('Champion Blue')).isCompleted();
            case RibbonEnums.Hoenn_Champion:
            case RibbonEnums.Sinnoh_Champion:
            case RibbonEnums.Kalos_Champion:
            case RibbonEnums.Alola_Champion:
            case RibbonEnums.Galar_Champion:
            case RibbonEnums.Paldea_Champion:
                const region = Region[RibbonEnums[ribbon].toString().toLowerCase().split('_')[0]] as number;
                if (region === undefined) {
                    throw error('Region is undefined');
                }
                if (MAX_AVAILABLE_REGION > region) {
                    return false;
                }
                // todo when GymList is module: gym => GymList[gym]?.flags.champion
                return new ClearGymRequirement(10, getGymIndex(RegionGyms[region].find(gym => gym.includes('Champion')))).isCompleted();
            // Contest
            case RibbonEnums.Normal_Cool:
            case RibbonEnums.Normal_Beautiful:
            case RibbonEnums.Normal_Cute:
            case RibbonEnums.Normal_Smart:
            case RibbonEnums.Normal_Tough:
            case RibbonEnums.Super_Cool:
            case RibbonEnums.Super_Beautiful:
            case RibbonEnums.Super_Cute:
            case RibbonEnums.Super_Smart:
            case RibbonEnums.Super_Tough:
            case RibbonEnums.Hyper_Cool:
            case RibbonEnums.Hyper_Beautiful:
            case RibbonEnums.Hyper_Cute:
            case RibbonEnums.Hyper_Smart:
            case RibbonEnums.Hyper_Tough:
            case RibbonEnums.Master_Cool:
            case RibbonEnums.Master_Beautiful:
            case RibbonEnums.Master_Cute:
            case RibbonEnums.Master_Smart:
            case RibbonEnums.Master_Tough:
            case RibbonEnums.Super_Normal_Cool:
            case RibbonEnums.Super_Normal_Beautiful:
            case RibbonEnums.Super_Normal_Cute:
            case RibbonEnums.Super_Normal_Smart:
            case RibbonEnums.Super_Normal_Tough:
            case RibbonEnums.Super_Great_Cool:
            case RibbonEnums.Super_Great_Beautiful:
            case RibbonEnums.Super_Great_Cute:
            case RibbonEnums.Super_Great_Smart:
            case RibbonEnums.Super_Great_Tough:
            case RibbonEnums.Super_Ultra_Cool:
            case RibbonEnums.Super_Ultra_Beautiful:
            case RibbonEnums.Super_Ultra_Cute:
            case RibbonEnums.Super_Ultra_Smart:
            case RibbonEnums.Super_Ultra_Tough:
            case RibbonEnums.Super_Master_Cool:
            case RibbonEnums.Super_Master_Beautiful:
            case RibbonEnums.Super_Master_Cute:
            case RibbonEnums.Super_Master_Smart:
            case RibbonEnums.Super_Master_Tough:
            case RibbonEnums.Spectacular_Cool:
            case RibbonEnums.Spectacular_Beautiful:
            case RibbonEnums.Spectacular_Cute:
            case RibbonEnums.Spectacular_Smart:
            case RibbonEnums.Spectacular_Tough:
            case RibbonEnums.Spectacular_Star:
            case RibbonEnums.Brilliant_Shining_Star:
                let conType = RibbonEnums[ribbon].toString().split('_')[0];
                const conRank = humanifyString(RibbonEnums[ribbon].toString().split('_'.concat(conType))[0]);
                if (conType === 'Star') {
                    conType = 'Balanced';
                }
                const rank = ContestRank[conRank];
                const type = ContestType[conType];
                if (rank === undefined || type === undefined) {
                    throw error('Rank or Type are undefined');
                }
                return new ContestWonRequirement(1, ContestRank[conRank], ContestType[conType]).isCompleted();
            // Misc (available) - Keep these in order when moving from unavailable section
            case RibbonEnums.Effort:
                return App.game.keyItems.hasKeyItem(KeyItemType.Pokerus_virus);
            case RibbonEnums.Artist:
            case RibbonEnums.Alert:
            case RibbonEnums.Shock:
            case RibbonEnums.Downcast:
            case RibbonEnums.Careless:
            case RibbonEnums.Relax:
            case RibbonEnums.Snooze:
            case RibbonEnums.Smile:
            case RibbonEnums.Gorgeous:
            case RibbonEnums.Royal:
            case RibbonEnums.Gorgeous_Royal:
            case RibbonEnums.Legend:
            // Battle Facility
            case RibbonEnums.Winning:
            case RibbonEnums.Victory:
            case RibbonEnums.Ability:
            case RibbonEnums.Great_Ability:
            case RibbonEnums.Double_Ability:
            case RibbonEnums.Multi_Ability:
            case RibbonEnums.Pair_Ability:
            case RibbonEnums.World_Ability:
            case RibbonEnums.Skillful_Battler:
            case RibbonEnums.Expert_Battler:
            case RibbonEnums.Battle_Royal_Master:
            case RibbonEnums.Battle_Tree_Great:
            case RibbonEnums.Battle_Tree_Master:
            case RibbonEnums.Tower_Master:
            // Misc
            case RibbonEnums.Country:
            case RibbonEnums.National:
            case RibbonEnums.Earth:
            case RibbonEnums.World:
            case RibbonEnums.Marine:
            case RibbonEnums.Land:
            case RibbonEnums.Sky:
            case RibbonEnums.Footprint:
            case RibbonEnums.Record:
            case RibbonEnums.Classic:
            case RibbonEnums.Premier:
            case RibbonEnums.History:
            case RibbonEnums.Red:
            case RibbonEnums.Green:
            case RibbonEnums.Blue:
            case RibbonEnums.Festival:
            case RibbonEnums.Carnival:
            case RibbonEnums.Event:
            case RibbonEnums.Birthday:
            case RibbonEnums.Special:
            case RibbonEnums.Souvenir:
            case RibbonEnums.Wishing:
            case RibbonEnums.Battle_Champion:
            case RibbonEnums.Regional_Champion:
            case RibbonEnums.National_Champion:
            case RibbonEnums.World_Champion:
            case RibbonEnums.Contest_Memory:
            case RibbonEnums.Contest_Memory_Gold:
            case RibbonEnums.Battle_Memory:
            case RibbonEnums.Battle_Memory_Gold:
            case RibbonEnums.Best_Friends:
            case RibbonEnums.Training:
            case RibbonEnums.Master_Rank:
            case RibbonEnums.Pioneer:
            case RibbonEnums['Once-in-a-Lifetime']:
            case RibbonEnums.Partner:
            default:
                return false;
        }
    }

    public static getRequirement(ribbon: RibbonEnums, p: TmpPartyPokemonType) {
        if (!RibbonHelper.isVisible(ribbon)) {
            return new CustomRequirement(ko.observable(false), true, 'You have not discovered this ribbon yet.');
        }
        if (p.ribbons.includes(ribbon)) {
            return new CustomRequirement(ko.observable(false), true, `${p.displayName} already has this ribbon!`);
        }
        switch (ribbon) {
            // // Regional Champion
            case RibbonEnums.Champion:
                return RibbonHelper.getRegionalChampionRibbonReq(p, Region.kanto);
            case RibbonEnums.Hoenn_Champion:
            case RibbonEnums.Sinnoh_Champion:
            case RibbonEnums.Kalos_Champion:
            case RibbonEnums.Alola_Champion:
            case RibbonEnums.Galar_Champion:
            case RibbonEnums.Paldea_Champion:
                const region = Region[RibbonEnums[ribbon].toString().toLowerCase().split('_')[0]] as number;
                if (region === undefined) {
                    throw error('Region is undefined');
                }
                return RibbonHelper.getRegionalChampionRibbonReq(p, region);
            // Contest
            case RibbonEnums.Normal_Cool:
            case RibbonEnums.Normal_Beautiful:
            case RibbonEnums.Normal_Cute:
            case RibbonEnums.Normal_Smart:
            case RibbonEnums.Normal_Tough:
            case RibbonEnums.Super_Cool:
            case RibbonEnums.Super_Beautiful:
            case RibbonEnums.Super_Cute:
            case RibbonEnums.Super_Smart:
            case RibbonEnums.Super_Tough:
            case RibbonEnums.Hyper_Cool:
            case RibbonEnums.Hyper_Beautiful:
            case RibbonEnums.Hyper_Cute:
            case RibbonEnums.Hyper_Smart:
            case RibbonEnums.Hyper_Tough:
            case RibbonEnums.Master_Cool:
            case RibbonEnums.Master_Beautiful:
            case RibbonEnums.Master_Cute:
            case RibbonEnums.Master_Smart:
            case RibbonEnums.Master_Tough:
            case RibbonEnums.Super_Normal_Cool:
            case RibbonEnums.Super_Normal_Beautiful:
            case RibbonEnums.Super_Normal_Cute:
            case RibbonEnums.Super_Normal_Smart:
            case RibbonEnums.Super_Normal_Tough:
            case RibbonEnums.Super_Great_Cool:
            case RibbonEnums.Super_Great_Beautiful:
            case RibbonEnums.Super_Great_Cute:
            case RibbonEnums.Super_Great_Smart:
            case RibbonEnums.Super_Great_Tough:
            case RibbonEnums.Super_Ultra_Cool:
            case RibbonEnums.Super_Ultra_Beautiful:
            case RibbonEnums.Super_Ultra_Cute:
            case RibbonEnums.Super_Ultra_Smart:
            case RibbonEnums.Super_Ultra_Tough:
            case RibbonEnums.Super_Master_Cool:
            case RibbonEnums.Super_Master_Beautiful:
            case RibbonEnums.Super_Master_Cute:
            case RibbonEnums.Super_Master_Smart:
            case RibbonEnums.Super_Master_Tough:
            case RibbonEnums.Spectacular_Cool:
            case RibbonEnums.Spectacular_Beautiful:
            case RibbonEnums.Spectacular_Cute:
            case RibbonEnums.Spectacular_Smart:
            case RibbonEnums.Spectacular_Tough:
            case RibbonEnums.Spectacular_Star:
            case RibbonEnums.Brilliant_Shining_Star:
                let conType = RibbonEnums[ribbon].toString().split('_')[0];
                const conRank = humanifyString(RibbonEnums[ribbon].toString().split('_'.concat(conType))[0]);
                if (conType === 'Star') {
                    conType = 'Balanced';
                }
                const rank = ContestRank[conRank];
                const type = ContestType[conType];
                if (rank === undefined || type === undefined) {
                    throw error('Rank or Type are undefined');
                }
                return RibbonHelper.getContestRibbonReq(p, rank, type);
            // Misc (available) - Keep these in order when moving from unavailable section
            case RibbonEnums.Effort:
                return RibbonHelper.getEffortRibbonReq(p);
            case RibbonEnums.Artist:
            case RibbonEnums.Alert:
            case RibbonEnums.Shock:
            case RibbonEnums.Downcast:
            case RibbonEnums.Careless:
            case RibbonEnums.Relax:
            case RibbonEnums.Snooze:
            case RibbonEnums.Smile:
            case RibbonEnums.Gorgeous:
            case RibbonEnums.Royal:
            case RibbonEnums.Gorgeous_Royal:
            case RibbonEnums.Legend:
            // Battle Facility
            case RibbonEnums.Winning:
            case RibbonEnums.Victory:
            case RibbonEnums.Ability:
            case RibbonEnums.Great_Ability:
            case RibbonEnums.Double_Ability:
            case RibbonEnums.Multi_Ability:
            case RibbonEnums.Pair_Ability:
            case RibbonEnums.World_Ability:
            case RibbonEnums.Skillful_Battler:
            case RibbonEnums.Expert_Battler:
            case RibbonEnums.Battle_Royal_Master:
            case RibbonEnums.Battle_Tree_Great:
            case RibbonEnums.Battle_Tree_Master:
            case RibbonEnums.Tower_Master:
            // Misc
            case RibbonEnums.Country:
            case RibbonEnums.National:
            case RibbonEnums.Earth:
            case RibbonEnums.World:
            case RibbonEnums.Marine:
            case RibbonEnums.Land:
            case RibbonEnums.Sky:
            case RibbonEnums.Footprint:
            case RibbonEnums.Record:
            case RibbonEnums.Classic:
            case RibbonEnums.Premier:
            case RibbonEnums.History:
            case RibbonEnums.Red:
            case RibbonEnums.Green:
            case RibbonEnums.Blue:
            case RibbonEnums.Festival:
            case RibbonEnums.Carnival:
            case RibbonEnums.Event:
            case RibbonEnums.Birthday:
            case RibbonEnums.Special:
            case RibbonEnums.Souvenir:
            case RibbonEnums.Wishing:
            case RibbonEnums.Battle_Champion:
            case RibbonEnums.Regional_Champion:
            case RibbonEnums.National_Champion:
            case RibbonEnums.World_Champion:
            case RibbonEnums.Contest_Memory:
            case RibbonEnums.Contest_Memory_Gold:
            case RibbonEnums.Battle_Memory:
            case RibbonEnums.Battle_Memory_Gold:
            case RibbonEnums.Best_Friends:
            case RibbonEnums.Training:
            case RibbonEnums.Master_Rank:
            case RibbonEnums.Pioneer:
            case RibbonEnums['Once-in-a-Lifetime']:
            case RibbonEnums.Partner:
            default:
                return new NullRequirement();
        }
    }

    /**
     * For NPC, Temp battle, or other ribbons given in batch
     */
    public static gainPartyRibbons(r: RibbonEnums) {
        App.game.party.caughtPokemon.forEach(p => {
            RibbonHelper.gainOnePartyPokemonRibbon(r, p);
        });
    }

    public static gainOnePartyPokemonRibbon(r: RibbonEnums, p: TmpPartyPokemonType) {
        if (RibbonHelper.getRequirement(r, p).isCompleted()) {
            p.gainRibbon(r);
        }
    }

    public static gainRegionalChampionRibbons(reg: Region) {
        if (reg === Region.none || reg === Region.final) {
            throw error('Region must be real');
        }
        const r = RibbonEnums[camelCaseToString(Region[reg]).concat('_Champion')] ?? RibbonEnums.Champion;
        App.game.party.caughtPokemon.filter(p => !p.hasRibbon(r)).forEach(p => {
            if (RibbonHelper.getRegionalChampionRibbonReq(p, reg).isCompleted()) {
                p.gainRibbon(r);
            }
        });
    }

    public static getRegionalChampionRibbonReq(p: TmpPartyPokemonType, r: Region) {
        const pAttack = App.game.party.calculateOnePokemonAttack(p, pokemonMap[p.name].type[0], pokemonMap[p.name].type[1], r, false, undefined, undefined, WeatherType.Clear, undefined, false);
        // todo when GymList is module
        // const attackGoal = GymList[RegionGyms[region].find(gym => GymList[gym]?.flags.champion)].getPokemonList().map(p => p.maxHealth).reduce((a, c) => a + c) / MaxIDPerRegion[r]);

        // General guideline: total party HP of champion / MaxIDPerRegion
        let attackGoal = 0;
        switch (r) {
            case Region.kanto:
                attackGoal = 2383;
                break;
            case Region.johto:
                attackGoal = 6313;
                break;
            case Region.hoenn:
                attackGoal = 18308;
                break;
            case Region.sinnoh:
                attackGoal = 42362;
                break;
            case Region.unova:
                attackGoal = 118466;
                break;
            case Region.kalos:
                attackGoal = 346621;
                break;
            case Region.alola:
                attackGoal = 678277;
                break;
            case Region.galar:
                attackGoal = 1223910;
                break;
            case Region.hisui:
                attackGoal = 2310671;
                break;
            case Region.paldea:
                attackGoal = 1189015;
                break;
            case Region.none:
            case Region.final:
            default:
                throw error('Region must be real');
        }

        const gym = RegionGyms[r].find(g => g.includes('Champion'));
        return new CustomRequirement(ko.pureComputed(() => pAttack >= attackGoal), true, `You must defeat ${gym} while your Pokemon has a regional attack of ${attackGoal} or more.`);
    }

    public static gainContestRibbons(rank: ContestRank, type: ContestType) {
        if (!GameHelper.enumNumbers(ContestRank).includes(rank) || !GameHelper.enumNumbers(ContestType).includes(type)) {
            throw error('Parameters must be within the range of their enums');
        }
        const r = RibbonEnums[ContestRank[rank].replace(' ', '_').concat('_').concat(type != ContestType.Balanced ? ContestType[type] : 'Star')];
        App.game.party.caughtPokemon.filter(p => !p.hasRibbon(r)).forEach(p => {
            if (RibbonHelper.getContestRibbonReq(p, rank, type).isCompleted()) {
                p.gainRibbon(r);
            }
        });
    }

    private static getContestRibbonReq(p: TmpPartyPokemonType, r: ContestRank, t: ContestType) {
        const appealGoal = ContestHelper.rankAppeal[r];
        const pAppeal = p.contestAppeal * ContestTypeHelper.getAppealModifier(p.currentContestTypes, [t]);
        let contestReqs = [];

        contestReqs.push(new CustomRequirement(ko.pureComputed(() => pAppeal >= appealGoal), true,
            `Your Pokemon must compete in and win a ${ContestRank[r]} ${ContestType[t]} contest while it has an appeal of ${appealGoal} or more.`));

        switch (r) {
            case ContestRank.Practice:
                return new NullRequirement();
            case ContestRank.Super:
            case ContestRank['Super Great']:
            case ContestRank.Hyper:
            case ContestRank['Super Ultra']:
            case ContestRank.Master:
            case ContestRank['Super Master']:
            case ContestRank['Brilliant Shining']:
                const rib = RibbonEnums[ContestRank[r - 1].replace(' ', '_').concat('_').concat(t != ContestType.Balanced ? ContestType[t] : 'Star')];
                contestReqs.push(new CustomRequirement(ko.pureComputed(() => p.hasRibbon(rib)), true, `Your Pokemon must have the ${RibbonEnums[rib]} Ribbon.`));
                break;
            case ContestRank.Spectacular:
                if (t === ContestType.Balanced) {
                    const specTypes = GameHelper.enumNumbers(ContestType).filter(ct => ct != ContestType.Balanced);
                    contestReqs.push(new CustomRequirement(ko.pureComputed(() => specTypes.every(ct => p.hasRibbon(RibbonEnums['Spectacular_'.concat(ContestType[ct])]))), true,
                        'Your Pokemon must have all regular Spectacular Ribbons.'));
                }
            case ContestRank.Normal:
            case ContestRank['Super Normal']:
            default:
                break;
        }

        return new MultiRequirement(contestReqs);
    }

    private static getEffortRibbonReq(p: TmpPartyPokemonType) {
        const evs = 100;
        return new CustomRequirement(ko.pureComputed(() => (p.effortPoints / 1000) >= evs), true, `Your Pokemon must have ${evs} or more EVs.`);
    }

}
