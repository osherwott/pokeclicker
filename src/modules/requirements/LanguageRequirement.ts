import { AchievementOption } from '../GameConstants';
import Language from '../translation/Language';
import Requirement from './Requirement';

export default class LanguageRequirement extends Requirement {
    constructor(
        private language: Language[],
        option = AchievementOption.equal,
    ) {
        super(1, option);
    }

    public getProgress() {
        return Number(App.translation.language === this.language);
    }

    public hint(): string {
        return 'The language needs to be in ${(Language[language])}';
    }
}
