/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import multer from 'multer'
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: 'AKIA3I4LWLQ6VD2K577R',
  secretAccessKey: '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',
  region: 'sa-east-1',
})

const s3 = new AWS.S3()

const upload = (params) => {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export const multerConfig = {
  dest: path.resolve(__dirname, '..', 'tmps', 'imgs'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', 'tmps', 'imgs'))
    },
    filename: (req, file, cb) => {
      const fileName = Date.now().toString() + '-' + file.originalname
      cb(null, fileName)
    },
  }),
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpg', 'image/jpeg', 'image/pjpeg', 'image/png']

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid Format'))
    }
  },
}

export const compressImage = async (photo) => {
  try {
    const name = String(Date.now())
    const data = await sharp(photo)
      .resize(720)
      .toFormat('webp')
      .webp({ quality: 75 })
      .toBuffer()

    const params = {
      Bucket: 'msshopping',
      Key: name,
      Body: data,
      ACL: 'public-read',
      ContentEncoding: 'webp', // required
      ContentType: `image/webp`,
    }

    const finalPath = await upload(params)

    deleteImage(
      path.resolve(process.cwd(), 'src', 'temp', 'imgs', name + '.webp'),
    )

    return finalPath.Location
  } catch (err) {
    deleteImage(path.resolve(process.cwd(), 'src', 'temp', 'imgs', name))
  }
}

export const deleteImage = (filePath) => {
  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (!err) {
      const pathFile = filePath
      fs.unlink(pathFile, (err) => {
        console.log(err)
      })
    }
  })
}
