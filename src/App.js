import config from '../config';
import Push from '../src/Push';
import GraphQl from '../src/GraphQl';
import User from './Models/User';

const graphQl = new GraphQl(config.graphQlUrl);
// const push = new Push(config.FCMServerKey);
// const token = 'eA1bYqW3oiE:APA91bHW83DCofo4yPOmn-C3hGXlO_AUyKC3SF8wde01gdwIBzTqaHCDerCCi1YqBkVspUu_UzirWFETOxsBwORU-12mlF045Rwvs3BnQ2QzGMAsnnq2bsXy0MGh5EQ0h1Ds6Wjdvyq9';
//
//
// push.send(token, 'Testing', 'Body');

graphQl.getUsers(data => {
  const userList = (data.allUsersList || []).map(user => {
    return new User(user);
  });
  console.log(userList);
});