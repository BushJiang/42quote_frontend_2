# 第一阶段：构建应用
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 第二阶段：使用 Nginx 作为静态文件服务器
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# 复制自定义的 Nginx 配置文件到容器
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
