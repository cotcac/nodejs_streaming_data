const fs = require('fs')
module.exports = function (path, type) {
    return function (req, res, next) {
        const stat = fs.statSync(path)
        const fileSize = stat.size
        const range = req.headers.range

        if (range) {
            console.log("[Range]", range);

            const parts = range.replace(/bytes=/, "").split("-")
            console.log("[parts:]", parts);

            const start = parseInt(parts[0], 10)
            const end = parts[1] ?
                parseInt(parts[1], 10) :
                fileSize - 1

            const chunksize = (end - start) + 1
            console.log("[chunksize]", chunksize);

            const file = fs.createReadStream(path, {
                start,
                end
            })
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': type,
            }

            res.writeHead(206, head)
            file.pipe(res)
        } else {
            console.log("[first]", fileSize);
            const head = {
                'Content-Length': fileSize,
                'Content-Type': type,
            }
            res.writeHead(200, head)
            fs.createReadStream(path).pipe(res)
        }
    }
}