const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack"); //env 사용 플러그인

module.exports = {
  // 개발모드, development or production
  mode: "development",

  // entry를 기준으로 연관된 모든 파일들을 번들링
  entry: "./src/index.jsx",

  // 번들링 될 파일 확장자 등록
  resolve: {
    extensions: [".js", ".jsx"],
  },

  // 바벨과 같은 로더 등록
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: "babel-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          sources: {
            list: [
              {
                tag: "meta",
                attribute: "content",
                type: "src",
                filter: (tag, attribute, attributes, resourcePath) => {
                  if (
                    attributes.value === "og:image" ||
                    attributes.name === "twitter:image"
                  ) {
                    return true;
                  }

                  return false;
                },
              },
            ],
          },
        },
      },
    ],
  },

  // 빌드 설정
  output: {
    path: path.resolve(__dirname, "build"), // 빌드되는 파일들이 만들어지는 위치, __dirname: 현재 디렉토리
    filename: "bundle.js", // 번들파일 이름
    publicPath: "/",
  },

  // webpack 서버 설정
  devServer: {
    static: path.join(__dirname, "build"), // 이 경로에 있는 파일이 변경될 때 다시 컴파일
    port: 3000, // 서버 포트 지정
    historyApiFallback: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      // index.html에 output에서 만들어진 bundle.js를 적용하여, build에 새로운 html 파일 생성
      template: `./public/index.html`,
    }),
    new Dotenv(),
  ],
};
