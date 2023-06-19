FROM node:19
COPY . .
RUN npm i -D --legacy-peer-deps
RUN npm i -g serve

ENV PORT=9034
ENV NODE_ENV=production
ENV VIRTUAL_HOST=mincomk.com

CMD ["serve", "-s", "build", "-l", "0.0.0.0:9034"]
