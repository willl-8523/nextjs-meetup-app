import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

/**
 * Get Data Before the First rending Component
 * revalidate => The Time when Re-fetching the Latest Data  if the Page is requested
 * https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
 * @returns
 */
export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.API_URL);
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  // Get All the document in meetups collection
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
