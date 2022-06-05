const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack"); //env 사용 플러그인
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

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
    filename: "[name].bundle.js", // 번들파일 이름
    publicPath: "/", //output 위치 지정
  },

  // webpack 서버 설정
  devServer: {
    static: path.join(__dirname, "build"), // 이 경로에 있는 파일이 변경될 때 다시 컴파일
    port: 3000, // 서버 포트 지정
    historyApiFallback: {
      index: "/index.html",
    },
  },

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-report.html",
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: "bundle-status.json",
    }),
    new HtmlWebpackPlugin({
      // index.html에 output에서 만들어진 bundle.js를 적용하여, build에 새로운 html 파일 생성
      template: `./public/index.html`,

      meta: {
        description: {
          name: "description",
          contnet: "신조어도 배우고, 고민 해결책을 세대별로 얻어보세요!",
        },
        "og:title": {
          property: "og:title",
          content: "우리들의 플레이그라운드 SEESO",
        },
        "og:type": { property: "og:type", content: "website" },
        "og:url": { property: "og:url", content: "https://play-seeso.com" },
        "og:image": {
          property: "og:image",
          content:
            "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fl1fzW%2FbtrDiIPtqli%2FmrqSE5d7bttCPpnos8a35K%2Fimg.png",
        },
        "twitter:title": {
          name: "twitter:title",
          content: "우리들의 플레이그라운드 SEESO",
        },
        "twitter:description": {
          name: "twitter:description",
          content: "신조어도 배우고, 고민 해결책을 세대별로 얻어보세요!",
        },
        "twitter:image": {
          name: "twitter:image",
          content: "../asset/ogimage.png",
        },
      },
    }),
    new Dotenv(),
  ],
};
