// @mui
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom'
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader, Avatar } from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

// ----------------------------------------------------------------------

UserItem.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
  isViewAll: PropTypes.bool,
  onClickViewAll: PropTypes.func,
};

export default function UserItem({ title, subheader, list, isViewAll, onClickViewAll, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </Stack>
      </Scrollbar>
{ 
isViewAll && (
      <><Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />} onClick={onClickViewAll}>
          View all
        </Button>
      </Box></>)}
    </Card>
  );
}

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
    title: PropTypes.string,
  }),
};

function NewsItem({ news }) {
  const { image, title, description, pmcId, id } = news;

  const navigate = useNavigate();


  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {/* <Box component="img" alt={title} src={image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} /> */}
      <Avatar src={image} alt={title} style={{ width: 48, height: 48, borderRadius: 100, flexShrink: 0 }} />
      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Button color="inherit" sx={{border: 'none', background: '#fff', padding: 0}} noWrap onClick={
          () => {
            navigate(`/dashboard/user-details/${id}`)
          }
        }>
          {title}
        </Button>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {pmcId}
      </Typography>
    </Stack>
  );
}
