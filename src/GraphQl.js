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
}

export default GraphQl;
