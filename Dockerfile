# 基于官方 Node.js Docker 镜像
FROM node:14

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json（如果存在）
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件和目录到工作目录
COPY . .

# 暴露容器运行时的端口
EXPOSE 8080

# 启动应用
CMD [ "npm", "run", "serve" ]







# # 基于官方 Node.js Docker 镜像
# # FROM node:14 as build
# FROM node:14

# # 设置工作目录
# WORKDIR /app

# # 复制package.json和package-lock.json（如果存在）
# COPY package*.json ./

# # 安装项目依赖
# RUN npm install

# # 复制项目文件和目录到工作目录
# COPY . .

# # 构建应用
# RUN npm run serve

# # 阶段二：使用 nginx 作为静态文件服务器
# FROM nginx:stable-alpine

# # 从构建阶段复制构建出的文件到 Nginx 服务目录
# COPY --from=build /app/dist /usr/share/nginx/html

# # 复制自定义的 Nginx 配置文件到容器
# COPY nginx.conf /etc/nginx/nginx.conf

# # 暴露 80 端口（nginx 默认）
# EXPOSE 80

# # 使用 Nginx 运行应用
# CMD ["nginx", "-g", "daemon off;"]
