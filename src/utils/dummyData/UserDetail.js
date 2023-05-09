export const UserDetail = {
  email: 'jane.doe@example.com',
  password: 'password',
  role: 'DOCTOR',
  name: 'Jane Doe',
  phone: '1234567890',
  gender: 'FEMALE',
  location: 'DELHI',
  avatar: '/assets/images/avatars/avatar_1.jpg',
  pmc: {
    id: '123456',
  },
  speciality: 'Dermatologist',
  about: 'I am a highly skilled dermatologist with many years of experience.',
  experiences: [
    {
      title: 'Cardiologist',
      hospital: {
        name: 'ABC Hospital',
      },
      from: '2020-06-01',
      to: '2021-05-31',
    },
    {
      title: 'Neurosurgeon',
      hospital: {
        name: 'XYZ Hospital',
      },
      from: '2021-06-01',
      to: '2022-05-31',
    },
  ],
  treatments: ['SKIN CARE', 'ACNE', 'PSORIASIS'],
  services: [1, 2, 3, 4, 5],
  eSign: 'signature.png',
  communities: ['SKIN CARE COMMUNITY'],
  reviews: ['Dr. Jane is an excellent dermatologist.', 'I highly recommend Dr. Jane.'],
  isVerified: true,
  isThirdParty: false,
  resetPasswordToken: 'token',
  resetPasswordExpiry: new Date(),
  registeredOn: new Date('2022-07-15'),
  ratings: 4.5,
};

export const RatingsCount = 20;

export const AppointmentsCount = [50, 5, 30];
