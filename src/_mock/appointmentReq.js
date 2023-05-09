import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

const appointmentReqs = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  time: `${faker.datatype.number(24)}:${faker.datatype.number(60)}-${faker.datatype.number(24)}:${faker.datatype.number(
    60
  )}`,
  date: faker.date.past(),
  requestType: sample(['Reschedule', 'Cancel']),
  requestedBy: faker.name.fullName(),
  reason: faker.lorem.sentence(5),
  reasonDetails: faker.lorem.sentence(100),
  createdAt: faker.date.past(),
  isApproved: false,
  isRejected: false,
}));



const TABLE_HEAD = [
  { id: 'author', label: 'Requested By', alignRight: false },
  { id: 'type', label: 'Type', alignRight: false },
  { id: 'reason', label: 'Reason', alignRight: false },
  { id: 'time', label: 'Selected Time', alignRight: false },
  { id: 'date', label: 'Selected Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
];


export default appointmentReqs;
