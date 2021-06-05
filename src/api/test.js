
export default (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ aaa: 'test!!!', url })
        }, 100)
    })
}