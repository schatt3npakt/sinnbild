# activate error logging
set -e

# check for required binaries
node -v
mkcert -version

# create local certs, install dependencies
cd _system
npm i
mkcert -cert-file cert.pem -key-file key.pem localhost 127.0.0.1
npm run serve