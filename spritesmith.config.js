const fs = require('fs')
const path = require('path')
const SpritesmithPlugin = require('webpack-spritesmith')
const webp = require('webp-converter')
const ora = require('ora')

// this will grant 755 permission to webp executables
webp.grant_permission()
const timestamp = String(new Date().getTime()).slice(-4)

const spritesPath = path.resolve(__dirname, 'static/images/general/sprites')
const deleteOldSprites = () => {
  try {
    fs.rmSync(spritesPath, {
      recursive: true,
      force: true
    })
  } catch (err) {
    console.error(err)
  }
}
const spritesmithTasks = function () {
  const spritesmithTasks = []
  deleteOldSprites()
  fs.readdirSync(
    path.resolve(__dirname, './assets/images/general/spritesBefore')
    // eslint-disable-next-line array-callback-return
  ).map((dirname) => {
    if (
      fs
        .statSync(
          path.resolve(
            __dirname,
            `./assets/images/general/spritesBefore/${dirname}`
          )
        )
        .isDirectory()
    ) {
      spritesmithTasks.push(
        new SpritesmithPlugin({
          src: {
            cwd: path.resolve(
              __dirname,
              `./assets/images/general/spritesBefore/${dirname}`
            ), // 准备合并成sprit的图片存放文件夹
            glob: '*.png' // 哪类图片
          },
          target: {
            image: path.resolve(
              __dirname,
              `./static/images/general/sprites/${dirname}.${timestamp}.png`
            ), // sprite图片保存路径
            css: [
              [
                path.resolve(
                  __dirname,
                  `./assets/images/general/sprites/${dirname}.less`
                ),
                {
                  spritesheetName: dirname,
                  format: 'handlebars_based_template'
                }
              ]
            ] // 生成的less保存在哪里
          },
          apiOptions: {
            cssImageRef: `~/static/images/general/sprites/${dirname}.${timestamp}.png` // css根据该指引找到sprite图
          },
          // 让合成的每个图片有一定的距离，否则就会紧挨着，不好使用
          spritesmithOptions: {
            padding: 10
          },
          customTemplates: {
            handlebars_based_template: path.resolve(
              __dirname,
              './assets/images/general/sprites/less.template.handlebars'
            )
          }
        })
      )
    }
  })

  return spritesmithTasks
}

class GeneratingWebp {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('GeneratingWebp', async (compilation, cb) => {
      try {
        const files = fs.readdirSync(spritesPath)
        const spinner = ora('Generating Webp').start()
        await Promise.all(files.map((item) => this.generatingWebp(item)))
        spinner.succeed('Generated Webp')
      } catch (error) {
        console.error(error)
        spinner.stop()
      }
      cb()
    })
  }

  generatingWebp(item) {
    return webp.cwebp(
      path.resolve(spritesPath, item),
      path.resolve(spritesPath, item + '.webp'),
      '-q 75 -m 6 -mt'
    )
  }
}

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, `./assets/images/general/sprites/entry.js`),
  output: {
    path: path.resolve(__dirname, 'assets/images/general/sprites'),
    filename: 'output.js'
  },
  plugins: [...spritesmithTasks(), new GeneratingWebp()]
}
