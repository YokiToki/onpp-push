import {request} from "graphql-request";

class GraphQl {
  constructor(graphQlUrl) {
    this.url = graphQlUrl;
  }

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
}

export default GraphQl;