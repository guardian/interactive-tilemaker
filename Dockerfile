# Start from ubuntu
FROM ubuntu:18.04

# Update repos and install dependencies
RUN apt-get update \
  && apt-get -y upgrade \
  && apt-get -y install build-essential libsqlite3-dev zlib1g-dev git wget unzip

# Build tippecanoe from source
RUN git clone --branch 2.28.1 --depth=1 https://github.com/felt/tippecanoe.git tippecanoe-src
WORKDIR /tippecanoe-src
RUN make && make install
WORKDIR /
RUN rm -r /tippecanoe-src

# Download and install AWS CLI
RUN  wget -O awscliv2.zip https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip
RUN unzip awscliv2.zip
RUN rm awscliv2.zip
RUN ./aws/install

CMD sleep infinity
