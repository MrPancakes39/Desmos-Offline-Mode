FROM node

WORKDIR /app_server

COPY package*.json ./

RUN npm install

COPY index.js ./

RUN git clone https://github.com/MrPancakes39/Desmos-Offline-Mode.git app \
    && cd app \
    && git pull --all --force \
    && cd ..

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]