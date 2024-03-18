const MTProto = require("../envs/node/index.js");

const path = require("path");
const builderMap = require("../src/tl/builder");


class EitaaClient {
    constructor() {
      this.mtproto = new MTProto({
        storageOptions: {
          path: path.resolve(__dirname, "./data/1.json"),
        },
      });
    }

async sendFile(file, target_user, target_hash, message) {
    let fileID = "";
    let media = null;

      const fileBuffer = Buffer.from(await fs.promises.readFile(file.path));
      const partsSizes = [
        1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288,
      ];

      for (let i = 0; i < 19; ++i) fileID += Math.floor(Math.random() * 10);

      const fileSize = Buffer.byteLength(fileBuffer);
      const partMaxSize =
        fileSize >= _.last(partsSizes)
          ? _.last(partsSizes)
          : partsSizes.find((size) => fileSize <= size);
      const chunks = Math.ceil(fileSize / partMaxSize);
      for (let i = 0; i < chunks; i++) {
        const partSize =
          i === chunks - 1 ? fileSize % partMaxSize : partMaxSize;
        const part = fileBuffer.slice(
          i * partMaxSize,
          i * partMaxSize + partSize
        );
        await this.mtproto.call(
          builderMap["upload.saveFilePart"],
          {
            file_id: fileID,
            file_part: i,
            bytes: part,
          }
        );
      }
      media = {
        _: "inputMediaUploadedDocument",
        file: {
          _: "inputFile",
          id: fileID,
          parts: chunks,
          name: file.originalname,
          md5Checksum: "",
        },
        mime_type: file.mimetype,
        attributes: [
          {
            _: "documentAttributeFilename",
            file_name: file.originalname,
          },
        ],
      };
    const response = await this.mtproto.call(
      builderMap["messages.sendMedia"],
      {
        media: media,
        peer: {
          _: "inputPeerUser",
          user_id: target_user,
          access_hash: target_hash,
        },
        message: message,
        random_id:
          Math.ceil(Math.random() * 0xffffff) +
          Math.ceil(Math.random() * 0xffffff),
      }
    );
    return response;
  }
}

module.exports = EitaaClient;