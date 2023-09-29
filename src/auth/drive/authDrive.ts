/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { readFile, writeFile } from 'node:fs/promises'
import path from 'path'
import fs from 'node:fs'
import process from 'process'
import { authenticate } from '@google-cloud/local-auth'
import { google } from 'googleapis'

const SCOPES = ['https://www.googleapis.com/auth/drive']

const TOKEN_PATH = path.join(process.cwd(), 'token.json')
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json')

async function loadSavedCredentialsIfExist() {
  try {
    const content = await readFile(TOKEN_PATH)
    const credentials = JSON.parse(content)
    return google.auth.fromJSON(credentials)
  } catch (err) {
    console.log(err)
  }
}

export async function saveCredentials(client) {
  const content = await readFile(CREDENTIALS_PATH)
  const keys = JSON.parse(content)
  const key = keys.installed || keys.web
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  })
  await writeFile(TOKEN_PATH, payload)
}

/**
 * Load or request or authorization to call APIs.
 *
 */
export async function authorize() {
  let client = await loadSavedCredentialsIfExist()
  if (client) {
    return client
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  })
  if (client.credentials) {
    await saveCredentials(client)
  }
  return client
}

export async function listFiles(authClient, data) {
  const drive = google.drive({ version: 'v3', auth: authClient })
  const notFound = []
  const files = []
  for (const item of data) {
    const res = await drive.files.list({
      pageSize: 1,
      q: `name="${item}"`,
      fields: 'nextPageToken, files(id, name)',
    })

    if (!res.data.files?.length) {
      notFound.push(item)
    } else {
      files.push(res?.data.files[0])
    }
  }

  if (files.length === 0) {
    console.log('No files found.')
    return
  }

  return files.map((file) => {
    return {
      name: file.name,
      id: file.id,
    }
  })
}

export async function donwloadPhotos(photos, authClient) {
  const drive = google.drive({ version: 'v3', auth: authClient })

  const images = []

  for (const i of photos) {
    const way = path.resolve(
      __dirname,
      '..',
      '..',
      'temp',
      'imgs',
      Date.now() + '.webp',
    )
    const dest = fs.createWriteStream(way)

    const res = await drive.files.get(
      {
        fileId: i.fileId,
        alt: 'media',
      },
      {
        responseType: 'stream',
      },
    )

    res.data.on('end', () => {
      images.push({
        ...i,
        path: way,
      })
    })

    res.data.pipe(dest)
  }

  return images
}
