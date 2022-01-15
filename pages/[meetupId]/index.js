import Head from "next/head"
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient,ObjectId} from 'mongodb'

const MeetupDetails = (props) => {
  
  return (
    <>
           <Head>
               <title>{props.meetupData.title}</title>
               <meta name ='description' content={props.meetupData.address} description={props.meetupData.description}/>
           </Head>
      <MeetupDetail meetupsData={props.meetupData}  title={props.meetupData.title} address={props.meetupData.address} description={props.meetupData.description}/>
    </>
  );
};

export async function getStaticPaths(){
  const client =  await MongoClient.connect('mongodb+srv://Azathot111:Azathot@cluster0.qled7.mongodb.net/meetups?retryWrites=true&w=majority');

  const db = client.db()

  const meetupsCollection= db.collection('meetups')
  
  const meetups =  await meetupsCollection.find({},{_id:1}).toArray()

  client.close()
  return{
    fallback: 'blocking' ,
    paths:meetups.map(meetups =>({
      params:{
        meetupId:meetups._id.toString()
      }
    }))
  }
}

export async function getStaticProps(context){
  const meetupId = context.params.meetupId;
 
  const client = await MongoClient.connect(
    'mongodb+srv://Azathot111:Azathot@cluster0.qled7.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({_id:ObjectId( meetupId)});

  client.close();

  
  
  console.log(selectedMeetup)
  console.log(meetupId)
  return {
    props:{
      
      meetupData:{
        id: selectedMeetup._id.toString(),
        title:selectedMeetup.title,
        address:selectedMeetup.address,
        image:selectedMeetup.image,
        description:selectedMeetup.description

      }
    },
    revalidate:1
  }
}
export default MeetupDetails;
