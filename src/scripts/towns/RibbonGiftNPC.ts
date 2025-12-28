class RibbonGiftNPC extends GiftNPC {
    constructor(
        public name: string,
        public dialog: string[],
        public giftRibbon: RibbonEnums,
        options: NPCOptionalArgument = {}
    ) {
        const giftFunction = () => {
            RibbonHelper.gainPartyRibbons(giftRibbon);
        };
        super(name, dialog, giftFunction, RibbonHelper.getImage(giftRibbon), options);
    }

    public isVisible(): boolean {
        if (!(super.isVisible() ?? false)) {
            return false;
        }
        return App.game.party.caughtPokemon.some(p => RibbonHelper.getRequirement(this.giftRibbon, p).isCompleted());
    }
}
