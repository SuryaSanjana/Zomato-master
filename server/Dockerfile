FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm i 

COPY . ./

ENV MONGO_URL = mongodb+srv://Sanjana:sanju@2610@zomato-master.ozqry.mongodb.net/zomato?retryWrites=true&w=majority


ENV GOOGLE_CLIENT_ID = 785787393239-fl3n52ptd20rgh56v26fis4hcv2crtbp.apps.googleusercontent.com

ENV GOOGLE_CLIENT_SECRET = AkepoAqnWbhS2m1JoZzfUaFq
ENV AWS_S3_ACCESS_KEY= AKIAXKMZXURZC3K4U3FC
ENV AWS_S3_SECRET_KEY=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
ENV RZR_PAY_ID=rzp_test_fCmJcxwCGTsgt8
ENV RZR_PAY_SECRET=7AOnPAScIQ4jXL09vywEYnE5

CMD ["npm", "run", "start"]