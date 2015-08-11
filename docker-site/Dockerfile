FROM    centos:centos6

## Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
## Install Node.js and npm
RUN     yum install -y npm

## Bundle app source
COPY ./site/dist /evtrs

##Don't install devDependencies
RUN npm config set production

ENV NODE_ENV production
RUN cd /evtrs; npm install

EXPOSE  8080
CMD ["node", "evtrs/server/app.js"]