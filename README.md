# SunnyPass.Webapp

SunnyPass allow you to keep your password and private notes safe... and one day allow you to access them easily on any of your devices.


## Build

    grunt
    docker build -t genuinegreg/sunnypass.webapp .


## Usage

    docker run -d \
        --restart=on-failure:3 \
        -p 8080 \
        --name sunnypass \
        genuinegreg/sunnypass.webapp