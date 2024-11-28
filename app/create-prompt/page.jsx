"use client" //form
import {useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation' // Updated import

import Form from '@components/Form'


const CreatePrompt = () => {

    const[submitting,setSubmitting]=useState(false);
    const[post,setPost]=useState({
        prompt:'',
        tag:'',

    })

    const { data: session } = useSession()
    const router = useRouter()
    
    const createPrompt=async(e)=>{
        e.preventDefault();
        setSubmitting(true);

        try{
            const response = await fetch('/api/prompt/new',{
                method:'POST',
                  body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag,
                  }),
            })
            if(response.ok){
                router.push('/')
            }else {
                console.log('Failed to create prompt')
              }
        }catch(error){
            console.log('error')

        }finally{
            setSubmitting(false);
        }

    }
  return (
    <Form 
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
    
    
    />
  )
}

export default CreatePrompt
