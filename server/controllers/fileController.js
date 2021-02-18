const FileService = require('../services/fileService')
const User = require('../models/User')
const File = require('../models/File')

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

      return response.json({files: files})

    } catch (error) {
      console.log(error)
      return response.status.json({message: 'Server Error'})
    }
  }
}

module.exports = new FileController()
