# activate error logging
set -e

# check for required binaries
node -v

# create local certs, install dependencies
cd _system
npm i
npm run serve