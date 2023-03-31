import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Box, Button, Container, Heading, Textarea } from '@chakra-ui/react'
import { FormEvent, useCallback, useState } from 'react'
import { answers } from '@/data/answers'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [message, setMessage] = useState('')
  const [answer, setAnswer] = useState('')

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    navigator.geolocation.getCurrentPosition((position) => {
      const index = Math.floor(Math.random() * answers.length)
      setAnswer(
        answers[index]
          .replace('{latitude}', position.coords.latitude.toString())
          .replace('{longitude}', position.coords.longitude.toString())
      )
    })
  }, [])

  const title = 'ChatGPS'
  const description = 'ChatでGPSを確認できるChatGPSです。'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary"></meta>
      </Head>
      <Container mt={8}>
        <Heading>ChatGPS</Heading>
        <form onSubmit={onSubmit}>
          <Box mt={4}>GPSを尋ねてください。</Box>
          <Box>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </Box>
          <Box mt={4}>
            <Button type="submit" colorScheme="blue">
              GPSを確認する
            </Button>
          </Box>
        </form>

        <Box mt={8}>{answer}</Box>
      </Container>
    </>
  )
}
