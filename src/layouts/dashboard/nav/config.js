// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;


const getNavConfig = () => {

  const navConfig = [
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: icon('ic_analytics'),
    },
    {
      title: 'user',
      path: '/dashboard/user',
      icon: icon('ic_user'),
    },
    {
      title: 'complaints',
      path: '/dashboard/complaints',
      icon: icon('ic_complaint'),
    },
    {
      title: 'appointment requests',
      path: '/dashboard/appointment-requests',
      icon: icon('ic_appointment'),
    },
    {
      title: 'support communities',
      path: '/dashboard/support-communities',
      icon: icon('ic_community'),
    },
    {
      title: 'bert agent',
      path: '/dashboard/bert',
      icon: icon('ic_bert'),
    }
  ];
  return navConfig;
}


export default getNavConfig;
