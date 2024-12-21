// src/types/telegraf.d.ts
import 'telegraf';
import { Scenes } from 'telegraf';
import { SessionData } from './SessionData';

declare module 'telegraf' {
    interface Context {
        session: Scenes.WizardSession<SessionData>;
    }
}
