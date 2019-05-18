import FCM from 'fcm-push';

class Push {
  /**
   * @param serverKey
   */
  constructor(serverKey) {
    this.fcm = new FCM(serverKey);
  }

  /**
   * @param to
   * @param title
   * @param body
   * @param data
   */
  send(to, title, body, data = {}) {
    const message = {
      to: to,
      data: data,
      notification: {
        alert: title,
        title: title,
        body: body,
        vibrate: true,
      }
    };

    this.fcm.send(message)
      .then(function (response) {
        console.log("Successfully sent with response: ", response);
      })
      .catch(function (err) {
        console.log("Something has gone wrong!");
        console.error(err);
      })
  }
}

export default Push;