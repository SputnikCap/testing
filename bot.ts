import { MyContext } from './types/context';

export const bot = new Telegraf<MyContext>(config.telegram.BOT_TOKEN);

const stage = new Scenes.Stage<MyContext>([
  sendTransactionScene,
  confirmResetFaucetAllScene,
  createWhitelistWizard,
  addWhitelistAddressWizard,
  setWalletLimitScene,
  setTokenAmountScene,
  broadcastScene,
  adminSendTokensScene,
  createRaffleScene
]);
bot.use(session());
bot.use(stage.middleware());
bot.use(rateLimiterMiddleware);
