import Changelog, { changelogType } from './Changelog';
import ChangelogUpdate from './ChangelogUpdate';

/**
 * Add your changes to the top of the changelog. Please do not increase the version number.
 *
 * MAJOR - Will stay at 0 during development, 1 after the first public release
 * MINOR - Will increment for each feature refactor or large changes to a feature
 * PATCH - Increment for small changes, bugfixes, UI changes.
 */
const ChangelogCrobatItems = [
    // note that month is 0 indexed, that's why -1
    new Changelog(changelogType.DEFAULT, '<div class="w-100 d-flex justify-content-around"><a href="https://github.com/Crobat4/pokeclicker" target="_blank">Repository</a><a href="https://github.com/Crobat4/Pokeclicker-desktop" target="_blank">Desktop build</a><a href="https://github.com/Crobat4/pokeclicker/wiki" target="_blank">Github Wiki</a></div>'),
    new Changelog(changelogType.DEFAULT, 'This will keep being updated as long as the thread is alive...'),
    // ⥂⥄
    // v0.3.5
    new ChangelogUpdate('v0.3.5', new Date(2022, 10 - 1, 22)),
    new Changelog(changelogType.NEW, 'Added Official updates (v0.10.0 - Galar)'),
    new Changelog(changelogType.CHANGE, 'Route Pokémon list: Button moved to the right'),
    new Changelog(changelogType.CHANGE, 'Route Pokémon list: Added Pokérus status'),
    new Changelog(changelogType.CHANGE, 'Underground: Bomb cost reduced'),
    new Changelog(changelogType.FIXED, 'Background not being clickable when draggable gem modal is open'),
    new Changelog(changelogType.FIXED, 'Route Pokémon list: Poké Ball not showing correctly in light themes for uncaught Pokémon'),
    new Changelog(changelogType.FIXED, 'Missing berries previously removed in older Official updates'),
    // v0.3.4
    new ChangelogUpdate('v0.3.4', new Date(2022, 10 - 1, 10)),
    new Changelog(changelogType.NEW, 'Added Official updates (v0.9.17 and v0.9.18)'),
    new Changelog(changelogType.NEW, 'Added draggable container that shows the gem list with their amount'),
    new Changelog(changelogType.CHANGE, 'Misc tooltips and settings text changes'),
    new Changelog(changelogType.CHANGE, 'Poké Balls: Container layout changed'),
    new Changelog(changelogType.CHANGE, 'Underground: Bomb now only works on uncleared tiles'),
    new Changelog(changelogType.CHANGE, 'Underground: Bomb energy cost increased'),
    new Changelog(changelogType.CHANGE, 'Jynx\'s sprites colors changed to match Gen 1/2 colors'),
    new Changelog(changelogType.FIXED, 'Pinkan Butterfree and Ash\'s Butterfree gender types'),
    // v0.3.3
    new ChangelogUpdate('v0.3.3', new Date(2022, 9 - 1, 21)),
    new Changelog(changelogType.NEW, 'Added setting to enable removed berries in dungeons'),
    new Changelog(changelogType.NEW, 'Added setting to enable a confirmation before fighting a dungeon boss'),
    new Changelog(changelogType.FIXED, 'Shortcuts icons not working on the Desktop Build'),
    // v0.3.2
    new ChangelogUpdate('v0.3.2', new Date(2022, 9 - 1, 21)),
    new Changelog(changelogType.NEW, 'Added Official updates (v0.9.16)'),
    new Changelog(changelogType.CHANGE, 'Shortcuts: Layout changed'),
    new Changelog(changelogType.CHANGE, 'Log Book moved to Shortcuts'),
    new Changelog(changelogType.CHANGE, 'Damage Calculator moved to Shortcuts'),
    new Changelog(changelogType.FIXED, 'Pinkan Electabuzz gender ratio'),
    // v0.3.1
    new ChangelogUpdate('v0.3.1', new Date(2022, 9 - 1, 20)),
    new Changelog(changelogType.NEW, 'Added Official updates (v0.9.15)'),
    new Changelog(changelogType.NEW, 'Added list of available Pokémon on routes'),
    new Changelog(changelogType.NEW, 'Added Poké Ball selection for Roaming Pokémon'),
    new Changelog(changelogType.NEW, 'Added Poké Ball selection for Dungeon Boss Pokémon'),
    new Changelog(changelogType.CHANGE, 'Misc tooltip changes'),
    new Changelog(changelogType.CHANGE, 'Poké Balls menu: layout changed'),
    new Changelog(changelogType.CHANGE, 'Pokédex: Sprite width changed'),
    new Changelog(changelogType.FIXED, 'Pinkan Nidoran, Pinkan Nidoking and Spiky-eared Pichu showing wrong gender'),
    // v0.3.0
    new ChangelogUpdate('v0.3.0', new Date(2022, 9 - 1, 4)),
    new Changelog(changelogType.NEW, 'Added Official updates (v0.9.10 - v0.9.14)'),
    new Changelog(changelogType.CHANGE, 'Notification text improved'),
    new Changelog(changelogType.REMOVED, 'Some updates temporarily removed (check changelog in Github wiki)'),
    // v0.2.11
    new ChangelogUpdate('v0.2.11', new Date(2022, 8 - 1, 3)),
    new Changelog(changelogType.NEW, 'Added options to enable the use of Beast Balls (they can still be used if selected in ball selection)'),
    new Changelog(changelogType.CHANGE, 'Beast Balls won\'t be used automatically with any ball selected anymore'),
    new Changelog(changelogType.CHANGE, 'Hatchery: UI changes'),
    new Changelog(changelogType.CHANGE, 'Game optimized when hatchery window closes'),
    new Changelog(changelogType.CHANGE, 'Hatchery now stores Pokémon IDs instead names'),
    new Changelog(changelogType.CHANGE, 'Removed form name from Pokémon with forms in battles'),
    new Changelog(changelogType.CHANGE, 'Nidoran(M) renamed to Nidoran♂'),
    new Changelog(changelogType.CHANGE, 'Nidoran(F) renamed to Nidoran♀'),
    new Changelog(changelogType.FIXED, 'Pokémon in Safari not showing its gender'),
    new Changelog(changelogType.FIXED, 'Fill hatchery button ignoring Pokérus filters'),
    // v0.2.10
    new ChangelogUpdate('v0.2.10', new Date(2022, 7 - 1, 24)),
    new Changelog(changelogType.NEW, 'Pokedex: Pokémon with gender differences can now be filtered'),
    new Changelog(changelogType.NEW, 'Pokedex: Added option to show female sprites'),
    new Changelog(changelogType.NEW, 'Pokedex: Added option to load all Pokémon'),
    new Changelog(changelogType.NEW, 'Profile: Female Pokémon sprite can now be selected'),
    new Changelog(changelogType.CHANGE, 'Pokédex: UI changes'),
    new Changelog(changelogType.CHANGE, 'Profile: UI changes'),
    new Changelog(changelogType.FIXED, 'Battle Frontier damage not working properly'),
    new Changelog(changelogType.FIXED, 'Starter not showing its gender'),
    // v0.2.9
    new ChangelogUpdate('v0.2.9', new Date(2022, 7 - 1, 22)),
    new Changelog(changelogType.CHANGE, 'All Pikachu (Cap) and Ash-Greninja gender type changed'),
    new Changelog(changelogType.CHANGE, 'Both Nidoran\'s name change reverted'),
    new Changelog(changelogType.FIXED, 'Save file not generating'),
    // v0.2.8
    new ChangelogUpdate('v0.2.8', new Date(2022, 7 - 1, 22)),
    new Changelog(changelogType.FIXED, 'Nidoran turning into MissingNo. if you have them in the hatchery prior the update'),
    // v0.2.7
    new ChangelogUpdate('v0.2.7', new Date(2022, 7 - 1, 22)),
    new Changelog(changelogType.NEW, 'Added Official updates (v0.9.8 and v0.9.9)'),
    new Changelog(changelogType.NEW, 'Added Gender feature'),
    new Changelog(changelogType.NEW, 'Gender properties of Gen 1 - Gen 7 Pokémon, Meltan and Melmetal defined'),
    new Changelog(changelogType.NEW, 'Added sprites with gender differences in Pokédex and Pokémon battles'),
    new Changelog(changelogType.NEW, 'Added gender ratio in Pokédex stats'),
    new Changelog(changelogType.CHANGE, 'Nidoran(M) renamed to Nidoran♂'),
    new Changelog(changelogType.CHANGE, 'Nidoran(F) renamed to Nidoran♀'),
    new Changelog(changelogType.CHANGE, 'Pokédex optimized'),
    new Changelog(changelogType.CHANGE, 'Misc Pokédex changes'),
    new Changelog(changelogType.CHANGE, '"Hide shiny image" option moved from Pokédex to Settings'),
    new Changelog(changelogType.CHANGE, 'Evolution Items layout changed'),
    new Changelog(changelogType.REMOVED, 'Setting to increase game width (Official fork added it)'),
    // v0.2.6
    new ChangelogUpdate('v0.2.6', new Date(2022, 6 - 1, 29)),
    new Changelog(changelogType.NEW, 'Added Official update v0.9.7'),
    new Changelog(changelogType.NEW, 'Added button to empty hatchery queue automatically'),
    new Changelog(changelogType.CHANGE, 'Temporarily reverted update: EXP rebalance fix'),
    new Changelog(changelogType.CHANGE, 'Pokémon seen but not caught are now more noticeable in the Pokédex'),
    new Changelog(changelogType.REMOVED, 'Removed codes to refund gems'),
    // v0.2.5
    new ChangelogUpdate('v0.2.5', new Date(2022, 6 - 1, 26)),
    new Changelog(changelogType.NEW, 'Added Official update v0.9.6'),
    new Changelog(changelogType.NEW, 'Added button to fill hatchery queue automatically'),
    new Changelog(changelogType.NEW, 'Added codes to refund gems used on removed flutes (They will be removed after a while)'),
    new Changelog(changelogType.CHANGE, 'Reverted update: EXP rebalance'),
    new Changelog(changelogType.FIXED, 'Shiny checkbox in Profile Card not working properly after the update'),
    // v0.2.4
    new ChangelogUpdate('v0.2.4', new Date(2022, 6 - 1, 14)),
    new Changelog(changelogType.NEW, 'Added setting to increase the game width'),
    new Changelog(changelogType.NEW, 'Pokémon shows Rare Hold Item image in the Pokédex'),
    new Changelog(changelogType.NEW, 'Battle Frontier now shows highest stage cleared before enter'),
    new Changelog(changelogType.CHANGE, 'Discord codes are now generic codes (Check codes <a target="_blank" href="https://github.com/Crobat4/pokeclicker/wiki/Codes">here</a>)'),
    new Changelog(changelogType.CHANGE, 'Rotom (discord) changed to Rotom (Crobat)'),
    new Changelog(changelogType.CHANGE, 'Some Unown letters from Discord codes changed'),
    new Changelog(changelogType.CHANGE, 'Pokédex width increased'),
    new Changelog(changelogType.CHANGE, 'Pokémon seen but not caught are now darkened and greyed out in the Pokédex'),
    new Changelog(changelogType.CHANGE, 'Added ID number to Pokémon list in the Profile menu'),
    new Changelog(changelogType.CHANGE, 'Dock is now locked if you are inside a dungeon'),
    new Changelog(changelogType.CHANGE, 'Added Wimpod to the wild'),
    new Changelog(changelogType.FIXED, 'Pokémon list in Profile is now sorted by ID'),
    new Changelog(changelogType.FIXED, 'Shiny selection in Profile not working correctly'),
    new Changelog(changelogType.REMOVED, 'Removed flashing effect on highlighted locations (quests)'),
    // v0.2.3
    new ChangelogUpdate('v0.2.3', new Date(2022, 6 - 1, 4)),
    new Changelog(changelogType.CHANGE, 'Changed sort icons: ⥂ to <i class="bi bi-sort-up"></i> (asc) and ⥄ to <i class="bi bi-sort-down"></i> (desc)'),
    new Changelog(changelogType.CHANGE, 'Pokémon in Profile Card can now be selected as either normal or shiny (if possible)'),
    new Changelog(changelogType.CHANGE, 'Locations highlighted due to active quest now blinks infinitely'),
    new Changelog(changelogType.CHANGE, 'Dock is now locked if you are inside the Battle Frontier'),
    new Changelog(changelogType.CHANGE, 'Some changes in the styles'),
    new Changelog(changelogType.CHANGE, 'Castform now changes its form depending on the current weather'),
    new Changelog(changelogType.CHANGE, 'Sliggoo now also evolves if the weather is Thunderstorm'),
    new Changelog(changelogType.CHANGE, 'Fomantis/Tyrunt/Yungoos now evolves only at day'),
    new Changelog(changelogType.CHANGE, 'Gligar/Sneasel/Amaura/Alolan Rattata now evolves only at night'),
    new Changelog(changelogType.CHANGE, 'Cubone now evolves into Alolan Marowak only in Alola at night'),
    new Changelog(changelogType.CHANGE, 'Cubone now evolves into Marowak only outside Alola'),
    new Changelog(changelogType.CHANGE, 'Charjabug now evolves in areas with special magnetic field from Sinnoh/Unova/Kalos'),
    // v0.2.2
    new ChangelogUpdate('v0.2.2', new Date(2022, 5 - 1, 26)),
    new Changelog(changelogType.NEW, 'Added Official update v0.9.4 and v0.9.5 (bug fixes)'),
    new Changelog(changelogType.CHANGE, 'Reverted update: Gen 3+ berries removal from dungeon chests'),
    // v0.2.1
    new ChangelogUpdate('v0.2.1', new Date(2022, 5 - 1, 25)),
    new Changelog(changelogType.FIXED, 'Height of dungeon tiles now works as intended in the desktop build'),
    // v0.2.0
    new ChangelogUpdate('v0.2.0', new Date(2022, 5 - 1, 24)),
    new Changelog(changelogType.NEW, 'Added changelog for this fork'),
    new Changelog(changelogType.NEW, 'Trainer ID added (Menu > Save > Generate Trainer ID)'),
    new Changelog(changelogType.CHANGE, 'Added some egg exclusives to the wild (<a href="https://github.com/Crobat4/pokeclicker/blob/master/eggExclusives.md">List</a>)'),
    new Changelog(changelogType.CHANGE, 'Height of dungeons tiles now changes dynamically'),
    new Changelog(changelogType.CHANGE, 'Locked bosses now show the unlock requirement in the tooltip'),
    new Changelog(changelogType.CHANGE, 'Enigma Berry: Discord not required anymore but it requires Trainer ID'),
    new Changelog(changelogType.CHANGE, '"Pokéball (by type)" menu is now collapsed by default'),
    new Changelog(changelogType.CHANGE, '"Uncaptured Shiny Pokémon" ball selection label changed from "✨" to "New✨"'),
    new Changelog(changelogType.CHANGE, 'Pikachu/Exeggcute now evolves into their alolan forms only in Alola'),
    new Changelog(changelogType.CHANGE, 'Pikachu/Exeggcute now evolves into their normal forms only outside Alola'),
    new Changelog(changelogType.REMOVED, 'Removed dungeon loot nerf on earlier regions'),

    // v0.1.0
    new ChangelogUpdate('v0.1.0', new Date(2022, 4 - 1, 28)),
    new Changelog(changelogType.NEW, 'Added "Dock" button to "Shortcuts" menu'),
    new Changelog(changelogType.NEW, 'Added Pokéball selection for each type'),
    new Changelog(changelogType.CHANGE, 'Oak\'s Items loadouts increased from 3 to 6'),
];

export default ChangelogCrobatItems;
