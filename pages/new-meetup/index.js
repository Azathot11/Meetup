import Head from 'next/head'
import  { useRouter } from 'next/router'
import NewMeetup from '../../components/meetups/NewMeetupForm'
const NewMeetupPage = () => {
    const router = useRouter()

    const addMeetupHandler = async(enteredNeetupData)=>{
        console.log(enteredNeetupData)
        const response = await fetch('/api/new-meetup',{
            method:'POST',
            body: JSON.stringify(enteredNeetupData),
            headers:{'Content-Type':'application/json'}
        })

        const data = await response.json()

        console.log(data.message)
         if(data.message === 'meetup inserted'){
            router.replace('/')
         }
       
    }
    return (
        <>
         <Head>
               <title>Add Meetup</title>
               <meta name ='description' content='Add meetups to  a huge list of highly active meetups list'/>
           </Head>
            <NewMeetup onAddMeetup={addMeetupHandler}/>
        </>
    )
}

export default NewMeetupPage
