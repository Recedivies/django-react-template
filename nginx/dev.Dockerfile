FROM nginx:1.22.0-alpine

RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/