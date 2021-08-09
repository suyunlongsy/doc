const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') // html模版
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 压缩 css 并合并成 文件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css & 去除注释  
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 删除 旧的文件 
const safeParser = require('postcss-safe-parser') // 添加前缀的规则

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

const MyPlugin = require('./my-plugin')

const HOST = '127.0.0.1'
const PORT = '8081'

const theme = require('./theme.json')
const resolve = dir => path.join(__dirname, dir)

module.exports = (env, argv) => {
  const { 
    mode,  // 通过 mode 判断 开发 和 生产
  } = argv

  const isDEV = mode === 'development'

  return {
    devServer: {
      // contentBase: [resolve('node_modules')],
      contentBase: __dirname,
      compress: true,
      inline: true,
      hot: true,
      port: PORT,
      host: HOST,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      noInfo: true,
      historyApiFallback: {
        disableDotRule: true
      },
      open: true,
      quiet: true,
      overlay: {
        errors: true
      },
    },
    entry: './src/index.js',
    output: {
      path: resolve('dist'),
      filename: '[name].js',
      chunkFilename: isDEV ? '[name].chunk.js' : '[name].[contenthash].js',
      publicPath: '/',
    },
    optimization: {
      ...(isDEV ? {} : {
        removeAvailableModules: true,
      }),
      splitChunks: {
        name: true,
        cacheGroups: {
          common: {
            test: /[\\/]node_modules[\\/] || src\//,
            chunks: 'all',
            name: 'common',
            minSize: 0,
            minChunks: 2,
            priority: 10, //优先级
            enforce: true,
          },
        },
      },
      minimizer: [ 
        ...(isDEV ? [] : [
          new TerserPlugin({
            parallel: true,
          }),
          new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessorOptions: {
              parser: safeParser,
              discardComments: {
                removeAll: true,
              },
            },
          }),
		  	])],
    },
    resolve: {
      alias: {
        src: resolve('src'),
        common: resolve('src/common'),
        images: resolve('src/images'),
        markdowns: resolve('src/markdowns'),
        mods: resolve('src/components'),
      },
      extensions: ['.js', '.jsx', 'css']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: resolve('src'),
          exclude: /node_modules/,
          use: ['babel-loader?cacheDirectory'],
        },
        {
          test: /\.(le|c)ss$/,
          use: [
            isDEV ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader', 
            { 
              loader: 'postcss-loader',
              options: {
                plugins: loader => [
                  require('autoprefixer')(), // CSS浏览器兼容 需要package.json 添加 对应的 browserslist,也有其他方式，自行搜索
                ]
              }
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  sourceMap: true, 
                  modifyVars: theme, 
                  javascriptEnabled: true
                }
              }
            }
          ], // 注意排列顺序，执行顺序与排列顺序相反
        },
        {
          test: /\.styl$/,
          use: [
            isDEV ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            { 
              loader: 'postcss-loader',
              options: {
                plugins: loader => [
                  require('autoprefixer')(), // CSS浏览器兼容 需要package.json 添加 对应的 browserslist,也有其他方式，自行搜索
                ]  
              },
            },
            'stylus-loader',
          ],
          include: [path.resolve(__dirname, 'src')],
          exclude: /node_modules/,
        }, 
        {
          test: /\.(jpg|jpeg|png|gif|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 1024 * 8, // 8k以下的base64内联，不产生图片文件
              fallback: 'file-loader', // 8k以上，用file-loader抽离（非必须，默认就是file-loader）
              name: '[name].[ext]?[hash]', // 文件名规则，默认是[hash].[ext]
              outputPath: 'images/', // 输出路径
              publicPath: ''  // 可访问到图片的引用路径(相对/绝对)
            }
          }
        }, 
        {
          test: /\.pdf$/,
          use: {
            loader: 'file-loader',
            // options: {
            //   name: 'doc/[name].[ext]'
            // }
          }
        },
        {
          test: /\.md$/,
          use: [
            'html-loader', 
            {
              loader: '@yunlong.syl/markdown-loader',
              options: {
                decodeImgSrc: true,
                decodeAHref: true,
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        jses: [
          // '/vendor/react/16.12.0/react.production.min.js',
          // '/vendor/react-dom/16.12.0/react-dom.production.min.js',
          // '/vendor/react-router-dom/5.1.2/react-router-dom.min.js',
          // '/vendor/moment/2.24.0/moment.min.js',
          // '/vendor/moment/2.24.0/locale/zh-cn.js',
          // '/vendor/antd/3.26.7/antd-with-locales.min.js',
          // '/service-worker-app.js'
        ],
        template: './template/index.html',
        minify: {
          collapseWhitespace: true, // 折叠空白
          removeComments: true, // 移除注释
          removeAttributeQuotes: true // 移除属性的引号
        }
      }),
      new webpack.DefinePlugin({
        __DEV__: isDEV,
      }),
      ...(isDEV ? 
        []
        : [
          new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, 'dist')]
          }),
          new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].[contenthash].css'
          }),
          new MyPlugin({
            files: [
              // '/vendor/react/16.12.0/react.production.min.js',
              // '/vendor/react-dom/16.12.0/react-dom.production.min.js',
              // '/vendor/react-router-dom/5.1.2/react-router-dom.min.js',
              // '/vendor/moment/2.24.0/moment.min.js',
              // '/vendor/moment/2.24.0/locale/zh-cn.js',
              // '/vendor/antd/3.26.7/antd-with-locales.min.js',
            ],
          }),
          // new CompressionWebpackPlugin({
          //   filename: "[path].gz[query]",
          //   algorithm: "gzip",
          //   test: productionGzipExtensions,
          //   threshold: 10240,
          //   minRatio: 0.8
          // })
          // new BundleAnalyzerPlugin({
          //   analyzerPort: 3000
          // })
        ]
      ),
    ],
  }
}
