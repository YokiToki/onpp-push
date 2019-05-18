import config from '../config';
import Push from '../src/Push';
import GraphQl from '../src/GraphQl';
import PayCalc from "./Models/PayCalc";

const graphQl = new GraphQl(config.graphQlUrl);
const push = new Push(config.FCMServerKey);

graphQl.getPayCalcs(data => {
  const payCalcs = (data.allPayCalcsList || []).map(payCalc => {
    return new PayCalc(payCalc || {});
  });

  payCalcs.forEach(payCalc => {
    const checkIn = payCalc.id || 0;
    const userId = payCalc.user.userId || 0;
    const token = payCalc.user.pushToken || null;
    const freeTime = payCalc.user.pushToken || 0;
    const parkingTime = payCalc.parkingTime || 0;
    const alertTime = freeTime > config.FCMAlertTime ? (freeTime - config.FCMAlertTime) : config.FCMAlertTime;
    if (token !== null) {
      if (parkingTime <= config.FCMWelcomeTime && payCalc.pushEvents.indexOf(config.FCMTypeWelcome) === -1) {
        push.send(token, 'Прива, ты заехал на парковку', `Время бесплатной парковки ${freeTime} минут!`);
        graphQl.createEventPush(checkIn, config.FCMTypeWelcome, data => {
          const pushEventId = data.createEventPush.eventPush.id || 0;
          console.info(`Sending push type: ${config.FCMTypeWelcome} userId: ${userId}. Crate push event with id ${pushEventId}.`);
        });
      }
      if (parkingTime >= alertTime && payCalc.pushEvents.indexOf(config.FCMTypeAlert) === -1) {
        push.send(token, 'Внимание!', `Время бесплатной парковки, заканчивается через ${freeTime} минут!`);
        graphQl.createEventPush(checkIn, config.FCMTypeWelcome, data => {
          const pushEventId = data.createEventPush.eventPush.id || 0;
          console.info(`Sending push type: ${config.FCMTypeAlert} userId: ${userId}. Crate push event with id ${pushEventId}.`);
        });
      }
    }
  });
});
