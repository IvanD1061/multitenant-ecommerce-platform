import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'


export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  })
  

  const data = await payload.find({
    collection: 'categories',
  })

  return NextResponse.json(data)
}
  
//http://localhost:3000/my-route
