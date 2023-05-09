import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

const complaints = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  //   avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  complaineeName: faker.name.fullName(),
  complainantName: faker.name.fullName(),
  //   isVerified: faker.datatype.boolean(),
  status: sample(['On Hold', 'Resolved', 'Pending']),
  role: sample(['Doctor', 'Patient']),
  title: faker.lorem.sentence(5),
  type: sample(['Comment', 'Post', 'General']),
  description: faker.lorem.sentence(100),
  date: faker.date.past(),
  ticketNumber: faker.datatype.number(),
}));

export default complaints;
