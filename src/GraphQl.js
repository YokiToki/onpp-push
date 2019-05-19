import {request} from "graphql-request";

class GraphQl {
  constructor(graphQlUrl) {
    this.url = graphQlUrl;
  }

  /**
   * @param {function(data)} cb
   */
  getUsers(cb) {
    const query = `{
        allUsersList(orderBy: ID_ASC) {
            id
            token
            pushToken
            checkInsByUserIdList {
                id
                timeArr
                timeDep
                fareByFare {
                    freeTime
                    cost
                    parking
                }
            }
          }
        }`;

    request(this.url, query).then(data =>
      cb(data)
    )
  }

  /**
   * @param {function(data)} cb
   */
  getPayCalcs(cb) {
    const query = `{
        allPayCalcsList(filter: { timeDep: { isNull: true } }) {
            id
            parkingTime
            freeTime
            timeDep
            exitCheck
            userByUserId {
                id
                number
                pushToken
                token
            }
            pushEventsJson {
                type
            }
        }
      }`;

    request(this.url, query).then(data =>
      cb(data)
    )
  }

  /**
   * @param cb
   */
  getCheckinDepWithoutPushes(cb) {
    const query = `{
        allChkinDepWithoutPushesList {
            id
            timeArr
            timeDep
            userId
            userByUserId {
                pushToken
                token
                number
                id
            }
        }
    }`;

    request(this.url, query).then(data =>
      cb(data)
    )
  }

  /**
   * @param checkIn
   * @param type
   * @param cb
   */
  createEventPush(checkIn, type, cb) {
    const query = `mutation {
      createEventPush(input: {eventPush: {type: ${type}, checkIn: ${checkIn}}}) {
            eventPush {
                id
            }
          }
      }`;

    request(this.url, query).then(data =>
      cb(data)
    )
  }
}

export default GraphQl;
