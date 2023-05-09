import React from 'react';
import { Avatar, Container, Grid, Typography, Divider, Chip } from '@mui/material';
// import { makeStyles } from '@mui/styles';
import { Icon } from '@iconify/react';
import classes from '../styles/UserDetail.module.css';
import { UserDetail, AppointmentsCount, RatingsCount } from '../utils/dummyData/UserDetail';
import { StatsChart } from '../sections/@dashboard/app';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     margin: theme.spacing(2),
//   },
//   avatar: {
//     width: theme.spacing(10),
//     height: theme.spacing(10),
//   },
//   name: {
//     marginTop: theme.spacing(2),
//     fontWeight: 'bold',
//   },
//   speciality: {
//     marginTop: theme.spacing(1),
//   },
//   divider: {
//     margin: theme.spacing(2),
//     width: '100%',
//   },
//   sectionTitle: {
//     margin: theme.spacing(2),
//   },
//   chip: {
//     margin: theme.spacing(1),
//   },
// }));

const UserDetailsPage = () => {
  return (
    <Container size="xl">
      <div className={classes.section}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          User Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar alt={UserDetail.name} src={UserDetail.avatar} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h5" component="h2">
                  {UserDetail.name}
                </Typography>
                <Typography variant="body2">{UserDetail.email}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {UserDetail.speciality}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {UserDetail.location}
                </Typography>
                <div className={classes.ratings}>
                  {[...Array(Math.floor(UserDetail.ratings))].map((_, index) => {
                    console.log(index);
                    return <Icon key={index} icon="mdi:star" className={classes.star} style={{ color: '#FFC107' }} />;
                  })}
                  {[...Array(5 - Math.floor(UserDetail.ratings))].map((_, index) => {
                    return <Icon key={index} icon="mdi:star" className={classes.star} style={{ color: '#E0E0E0' }} />;
                  })}
                  <Typography variant="body2" color="textSecondary" className={classes.ratingCount}>
                    {RatingsCount} reviews
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid item>
              <div className={classes.pmc}>
                <Typography variant="h8">{UserDetail.pmc.id}</Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>

      <Divider className={classes.divider} />

      <div className={classes.section}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Experiences
        </Typography>
        {UserDetail.experiences.map((experience, index) => (
          <div key={index}>
            <Typography variant="subtitle1">{experience.title}</Typography>
            <Typography variant="body2">{experience.hospital.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {new Date(experience.from).toLocaleDateString()} - {new Date(experience.to).toLocaleDateString()}
            </Typography>
          </div>
        ))}
      </div>
      <Divider className={classes.divider} />

      <div className={classes.section}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Treatments
        </Typography>
        <div className={classes.treatments}>
          {UserDetail.treatments.map((treatment) => (
            <Chip key={treatment} label={treatment} />
          ))}
        </div>
      </div>
      <Divider className={classes.divider} />

      <div className={classes.section}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          About
        </Typography>
        <Typography variant="body2">{UserDetail.about}</Typography>
      </div>
      <Divider className={classes.divider} />

      <div className={classes.section}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Stats
        </Typography>
        <Grid item xs={12} md={12} lg={12}>
          <StatsChart
            title="Appointments Booked"
            subheader="23 appointments booked this month"
            chartLabels={['Completed', 'Pending', 'Cancelled']}
            chartData={[
              {
                name: 'Total',
                type: 'bar',
                fill: 'solid',
                data: AppointmentsCount,
              },
            ]}
          />
        </Grid>
      </div>
      {/*
        <Typography variant="h6">
          Treatments
        </Typography>
        <div>
          {UserDetail.treatments.map((treatment) => (
            <Chip key={treatment} label={treatment} className={classes.chip} />
          ))}
        </div>
        <Divider className={classes.divider} />
        <Typography variant="h6">About</Typography>
        <Typography variant="body1">{UserDetail.about}</Typography> */}
    </Container>
  );
};

export default UserDetailsPage;
