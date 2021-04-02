// Libraries
import {handleError as sendError} from '@antscorp/monitor-javascript';

import {appConfig} from 'Src/constant';
import {getCookie} from 'Src/utils';

export function handleError(error, payload) {
    try {
        if (error) {
            if (appConfig.APPLICATION_ENV) {
                switch (appConfig.APPLICATION_ENV) {
                    case 'development':
                        console.error(error);

                        sendMessageError({
                            error,
                            ...payload
                        });
                        break;
                    case 'sandbox':
                    case 'staging':
                    case 'production':
                        sendMessageError({
                            error,
                            ...payload
                        });
                        break;
                }
            }
        }
    } catch (error) {
        //
    }
}

function sendMessageError(payload) {
    try {
        if (payload.error) {
            let error = payload.error;
            let userInfo = getCookie(appConfig.U_OGS);
            let token = null,
                userId = null,
                accountId = null;

            if (userInfo) {
                userInfo = JSON.parse(userInfo);

                if (userInfo.user_id && userInfo.account_id && userInfo.token) {
                    token = userInfo.token;
                    userId = userInfo.user_id;
                    accountId = userInfo.account_id;
                }
            }

            let traceId = getCookie(appConfig.TRACE_ID_KEY);

            if (traceId) {
                traceId = JSON.parse(traceId);
            }

            // Logging info
            let logging = {
                ...payload,
                args: {
                    project: 'antalyser',
                    ...payload.args
                }
            };

            delete logging.error;

            sendError(error, {
                user_id: userId,
                account_id: accountId,
                token,
                trace_id: traceId,
                ...logging
            });
        }

    } catch (e) {
        // Error
    }
}
