const config = require('config')
const fs = require('fs')



class FileService {

  createDir(file) {
    const filePath = `${config.get('rootFilesDir')}/${file.user}/${file.path}`

    return new Promise((resolve, reject) => {

      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath)
          return resolve({message: 'File was created successfully'})
        } else {
          return reject({message: 'File already exist'})
        }
      } catch (error) {
        console.log(error)
        return reject({message: 'File Error'})
      }

    })
  }
}


module.exports = new FileService()
