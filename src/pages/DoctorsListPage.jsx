import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async';
import { UserItem } from '../sections/@dashboard/app';
import Error from '../components/error/Error';
import Loading from '../components/loading/Loading';
import { useApi } from '../hooks/useApi';
import { baseUrl, getAllDoctors } from '../utils/api';

const DoctorsListPage = () => {

    const {
        data,
        isLoading,
        error,
        refetch: fetchData
    } = useApi();

    const fetch = () => {
        fetchData(
            () => {
              return getAllDoctors();
            }
        );
    }

    useEffect(() => {
      fetch();
    }, []);
    


    if(isLoading) return <Loading message="Loading Doctors..."/>

    if(error) return <Error message="Error loading doctors" />

    console.log(data);

    return (
        <>
            <Helmet>
                <title> Dashboard | Minimal UI </title>
            </Helmet>
            {data && data.data && (
            <Container>
                <Grid item xs={12} md={6} lg={12}>
                    <UserItem
                    title="Doctors List"
                    list={data?.data.data.map((_, index) => ({
                        id: _._id,
                        title: _.name,
                        description: _.speciality,
                        image: `${baseUrl}files/${_.avatar}`,
                        pmcId: _.pmc.id
                    }))}
                    />
                </Grid>
            </Container>)}
        </>
    )

}

export default DoctorsListPage