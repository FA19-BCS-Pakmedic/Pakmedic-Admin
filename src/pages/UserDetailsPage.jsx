import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Avatar, Container, Grid, Typography, Divider, Chip } from '@mui/material';
// import { makeStyles } from '@mui/styles';
import { Icon } from '@iconify/react';
import classes from '../styles/UserDetail.module.css';
import { UserDetail, AppointmentsCount, RatingsCount } from '../utils/dummyData/UserDetail';
import { StatsChart } from '../sections/@dashboard/app';
import { useApi } from '../hooks/useApi';
import Loading from '../components/loading/Loading';
import Error from '../components/error/Error';
import { getDoctorData, baseUrl } from '../utils/api';


const UserDetailsPage = () => {

  const id = useParams().id;

  console.log("HERE");

  const {
    data,
    isLoading,
    error,
    refetch: fetchData,
  } = useApi();

  const [userData, setUserData] = useState(null);



  useEffect(() => {
    if(data && data.status === 'success')
      setUserData(data?.data.result);
  }, [data])

  useEffect(() => {
    console.log(userData);
  }, [userData])

  const fetch = () => {
    fetchData(
      () => {
        return getDoctorData(id);
      }
    );
  }

  useEffect(() => {
    fetch();
  }, []);

  if(isLoading) return <Loading message="Loading Statistics..."/>

  if(error) return <Error message="Error loading stats" />

  return (
    <>
    <Helmet>
      <title>User details | Pakmedic Admin</title>
    </Helmet>


    {userData && (
    <Container size="xl">
      <div className={classes.section}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          User Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar alt={userData.name} src={`${baseUrl}files/${userData.avatar}`} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h5" component="h2">
                  {userData.name}
                </Typography>
                <Typography variant="body2">{userData.email}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {userData.speciality}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {userData.location}
                </Typography>
                <div className={classes.ratings}>
                  {[...Array(Math.floor(userData.averageRating))].map((_, index) => {
                    console.log(index);
                    return <Icon key={index} icon="mdi:star" className={classes.star} style={{ color: '#FFC107' }} />;
                  })}
                  {[...Array(5 - Math.floor(userData.averageRating))].map((_, index) => {
                    return <Icon key={index} icon="mdi:star" className={classes.star} style={{ color: '#E0E0E0' }} />;
                  })}
                  <Typography variant="body2" color="textSecondary" className={classes.ratingCount}>
                    {userData.reviewCount} reviews
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid item>
              <div className={classes.pmc}>
                <Typography variant="h8">{userData.pmc.id}</Typography>
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
        {
        userData.experiences.length > 0 ?
        (
        userData.experiences.map((experience, index) => (
          <div key={index}>
            <Typography variant="subtitle1">{experience.title}</Typography>
            <Typography variant="body2">{experience.hospital.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {new Date(experience.from).toLocaleDateString()} - {new Date(experience.to).toLocaleDateString()}
            </Typography>
          </div>
        ))) : (
          <Typography variant="h6" color="textSecondary">
            No experiences added
          </Typography>
        )}
      </div>
      <Divider className={classes.divider} />

      <div className={classes.section}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Treatments
        </Typography>
        <div className={classes.treatments}>
          {
          userData.treatments.length > 0 ?
          userData.treatments.map((treatment) => (
            <Chip key={treatment} label={treatment} />
          )) : (
            <Typography variant="h6" color="textSecondary">
              No treatments added
            </Typography>
          )}
        </div>
      </div>
      <Divider className={classes.divider} />

      <div className={classes.section}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          About
        </Typography>
        {userData.about ? <Typography variant="body2">{userData.about}</Typography> : 
        <Typography variant="h6" color="textSecondary">No about added</Typography>
        }
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
                data: [userData.appointments.completed, userData.appointments.pending, userData.appointments.cancelled],
              },
            ]}
          />
        </Grid>
      </div>
    </Container>)
}
    </>
  );
};

export default UserDetailsPage;
