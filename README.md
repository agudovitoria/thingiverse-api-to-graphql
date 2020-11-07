# thingiverse-api-to-graphql
Thingiverse rest api to GraphQL transcoding application made just for learn

## Instructions
### Required dependencies:
#### PM2
Need install _pm2_ as *global*. Execute in a terminal:
```bash
yarn global add pm2
```

### Development:
#### Web client
Execute in `web` folder:
```bash
yarn install
```
and then
```bash
yarn start
```

#### Auth server
Execute in `auth-folder` folder:
```bash
yarn install
```
and then
```bash
yarn start:watch
```

#### Gateway
Execute in `gateway` folder:
```bash
yarn install
```
and then
```bash
yarn start
```

### Deployment on production
Execute in `root` folder:
```bash
pm2 startOrReload ./ecosystem.yml
```

