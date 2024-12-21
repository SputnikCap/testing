// src/types/SessionData.ts
import { Scenes } from 'telegraf';

export interface RaffleData {
    text: string;
    image: string;
    tokens: number;
    winners: number;
    distribution: 'equal' | 'custom';
    customDistribution?: number[];
    durationHours: number;
    isPinned: boolean;
}

export interface AdminSendTokensData {
    addresses?: string[];
    tokens?: number;
    batchId?: string;
}

export interface SendTransactionData {
    amount?: number;
}

export interface SessionData extends Scenes.WizardSessionData {
    raffleData?: Partial<RaffleData>;
    adminSendTokensData?: Partial<AdminSendTokensData>;
    sendTransactionData?: Partial<SendTransactionData>;
}
