import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useNavigation } from 'react-router-dom';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  UserItem,
  AppOrderTimeline,
  AppCurrentVisits,
  StatsChart,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

import { Specialists } from '../utils/dummyData/Specialists';

import { AppointmentDate, PhysicalCheckupsCount, OnlineConsultationsCount } from '../utils/dummyData/Appointments';

import { TopDoctors } from '../utils/dummyData/TopDoctors';

import { DiseasesNames, DiseasesValues } from '../utils/dummyData/Diseases';

import {baseUrl, getDashboardData} from '../utils/api';

import { useApi } from '../hooks/useApi';
import Loading from '../components/loading/Loading';
import Error from '../components/error/Error';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const navigate = useNavigate();

  const {
    data,
    error,
    isLoading,
    refetch: fetchData,
  } = useApi();

  const fetch = () => {
    fetchData(
      () => {
        return getDashboardData();
      }
    );
  }

  useEffect(() => {
    fetch();
  }, []);

  if(isLoading) return <Loading message="Loading Statistics..."/>

  if(error) return <Error message="Error loading stats" />

  if(data?.data) {

  return (
    <>
      <Helmet>
          <title> Dashboard | Minimal UI </title>
        </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Doctors" total={data.data.totalDoctors} icon={"ant-design:user-outlined"} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Patients" total={data.data.totalPatients} color="info" icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Booked Appointments"
              total={data.data.totalAppointments}
              color="warning"
              icon={'ant-design:calendar-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Complaints" total={data.data.totalComplaints} color="error" icon={
              'ant-design:warning-outlined'
            } />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <StatsChart
              title="Appointments Booked"
              subheader={`${(data?.data.online[data?.data.physical.length > data?.data.online.length ? data?.data.physical.length-1 : data?.data.online.length-1] || 0) + (data?.data.physical[data?.data.physical.length > data?.data.online.length ? data?.data.physical.length-1 : data?.data.online.length-1] || 0)} appointments booked this month`}
              chartLabels={data?.data.months}
              chartData={[
                {
                  name: 'Online Consultations',
                  type: 'bar',
                  fill: 'solid',
                  data: data?.data.online,
                },
                {
                  name: 'Physical Checkups',
                  type: 'bar',
                  fill: 'gradient',
                  data: data?.data.physical,
                },
                // {
                //   name: 'Team C',
                //   type: 'line',
                //   fill: 'solid',
                //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppConversionRates
              title="Specialities"
              subheader={`Total Specilities: ${data?.data.specialties.length}`}
              chartData={data?.data.specialties || []}
            />
          </Grid>

          <Grid item xs={12} md={8} lg={8}>
            <StatsChart
              title="Top Diseases"
              chartLabels={data?.data.diseases}
              chartData={[
                {
                  name: 'Count',
                  type: 'line',
                  fill: 'solid',
                  data: data?.data.diseasesCount,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <UserItem
              title="Most Popular Doctors"
              list={data?.data.topDoctors.map((_, index) => ({
                id: _._id,
                title: _.name,
                description: _.speciality,
                image: `${baseUrl}files/${_.avatar}`,
                pmcId: _.pmc.id,
              }))}
              isViewAll
              onClickViewAll={() => {
                navigate('/dashboard/doctors');
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

}
