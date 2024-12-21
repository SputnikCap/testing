import { MyContext } from '../../../types/context';
import { SessionData } from '../../../types/SessionData';

const adminSendTokensScene = new Scenes.WizardScene<MyContext>(
    'admin_send_tokens',
    async (ctx) => {
        logger.info('[adminSendTokensScene] Entering scene: admin_send_tokens');
        await ctx.reply(
            '📄 send tokens',
            {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [[{ text: 'Cancel', callback_data: 'cancel' }]]
                }
            }
        );
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (!isTextMessage(ctx)) {
            logger.warn('[adminSendTokensScene] Step 2: Expected text message with addresses.');
            await ctx.reply('❌ send text msg');
            return;
        }

        const raw = ctx.message.text.trim();
        logger.info(`[adminSendTokensScene] Received addresses input: "${raw}"`);

        let addresses = raw.includes('\n') ? raw.split('\n') : raw.split(',');
        addresses = addresses.map(a => a.trim()).filter(a => a.length > 0);

        if (addresses.length < 1 || addresses.length > 100) {
            logger.warn(`[adminSendTokensScene] Invalid number of addresses: ${addresses.length}`);
            await ctx.reply('❌ input 1 to 100 adresses');
            return;
        }

        const uniqueAddresses = Array.from(new Set(addresses));
        const invalidAddresses = uniqueAddresses.filter(addr => !validateAddress(addr).isValid);
        if (invalidAddresses.length > 0) {
            logger.warn('[adminSendTokensScene] Invalid addresses found.');
            await ctx.reply(`❌ invalid format:\n${invalidAddresses.join('\n')}`);
            return;
        }
        // THIS how i can access in addresses in adminSendTokensData without race conditions?
        (ctx.wizard.state as SessionData).adminSendTokensData = {
            addresses: uniqueAddresses
        }
        const sessionData = ctx.wizard.state as SessionData;
        sessionData.adminSendTokensData = {
            addresses: uniqueAddresses
        }
        ctx.wizard.state.adminSendTokensData
        logger.info(`[adminSendTokensScene] Valid addresses count: ${uniqueAddresses.length}`);
        await ctx.reply(
            `✅ uniq adresses: ${uniqueAddresses.length}\n\ninput tokens amount:`,
            {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [[{ text: 'Cancel', callback_data: 'cancel' }]]
                }
            }
        );
        return ctx.wizard.next();
    },
