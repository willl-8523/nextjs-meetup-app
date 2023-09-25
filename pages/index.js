import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80',
    adress: 'Some address 5, 12456 Smoe City',
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80',
    adress: 'Some address 10, 12456 Smoe City',
  },
];

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

/**
 * Excute always run in th Server after Deploiement
 * Use when the Data change Frequently or when you work with incoming request
 * https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#server-side-rendering-getserversideprops
 */
export async function getServerSideProps() {
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}

export default HomePage;
