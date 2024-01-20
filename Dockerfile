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
