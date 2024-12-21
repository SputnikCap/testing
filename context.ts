import { Scenes, Context as TelegrafContext } from 'telegraf';
import { SessionData } from './SessionData';

export interface MyContext extends TelegrafContext {
    scene: Scenes.SceneContextScene<MyContext, SessionData>;
    wizard: Scenes.WizardContextWizard<MyContext>;
}
