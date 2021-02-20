const FileService = require('../services/fileService')
const User = require('../models/User')
const config = require('config')
const File = require('../models/File')
const fs = require("fs");

class FileController {
  async createDir(request, response) {

    try {
      const {name, type, parent} = request.body

      const file = new File({type, name, parent, user: request.user.id})
      const fileParent = await File.findOne({_id: parent})

      if (!fileParent) {
        file.path = name
        await FileService.createDir(file)
      } else {
        file.path = `${fileParent.path}/${name}`
        await FileService.createDir(file)
        fileParent.children.push(file._id)
        await fileParent.save()
      }

      await file.save()
      return response.status(200).json(file)
    } catch (error) {
      console.log(error)
      return response.status.json({message: 'Server Error'})
    }
  }

  async getFiles(request, response) {
    try {
      const files = await File.find({user: request.user.id, parent: request.query.parent})

      return response.json(files)

    } catch (error) {
      console.log(error)
      return response.status.json({message: 'File get error'})
    }
  }

  async uploadFiles(request, response) {
    try {
      const file = request.files.file

      const parent = await File.findOne({user: request.user.id, _id: request.body.parent})
      const user = await User.findOne({_id: request.user.id})

      if (user.usedSpace + file.size > user.diskSpace) {
        return response.status(400).json({message: 'You have not enough space on disk'})
      }

      user.usedSpace = user.usedSpace + file.size

      if (!parent) {
        file.path = `${config.get('rootFilesDir')}/${user._id}/${file.name}`
      } else {
        file.path = `${config.get('rootFilesDir')}/${user._id}/${parent.path}/${file.name}`
      }
      const type = file.name.split('.').pop()

      if (fs.existsSync(file.path)) {
        return response.status(400).json({message: 'File already exist'})
      }
      await file.mv(file.path)

      const newFile = new File({
        name: file.name,
        type: type,
        size: file.size,
        path: parent?.path,
        parent: parent?._id,
        user: user._id
      })

      await newFile.save()
      await user.save()

      return response.json(newFile)
    } catch (error) {
      console.log(error)
      return response.status.json({message: 'File upload error'})
    }
  }
}

module.exports = new FileController()
