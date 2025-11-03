function getFileDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.addEventListener("load", function() {
      resolve(reader.result)
    })

    reader.addEventListener("error", function(error) {
      reject(error)
    })
  })
}