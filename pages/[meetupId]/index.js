import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
  const { image, title, address, description } = props.meetupData;

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <MeetupDetail
        image={image}
        title={title}
        address={address}
        description={description}
      />
    </Fragment>
  );
}

/**
 * Use in Dynamic page and Only with getStaticProps
 * https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#dynamic-paths-getstaticpaths
 */
export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.API_URL);
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  //Get only Id for each Document in the Collection
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

/**
 *
 * @param {*} context => to get Id
 * @returns
 */
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(process.env.API_URL);
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  // Get a Single meetup
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}
export default MeetupDetails;
