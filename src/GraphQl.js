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
   * @param chekIn
   * @param type
   * @param cb
   */
  createEventPush(chekIn, type, cb) {
    const query = `mutation {
        createEventPush(input: {eventPush: {type: 10, checkIn: 10}}) {
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
