#!/bin/bash
cd /portfolio/JD-Multiprocess-Services-Website || {
        echo "Unable to change directories."
        exit 1
}

sudo git pull origin master || {
        echo "Unable to pull latest update."
        exit 1
}

sudo docker-compose down || {
        echo "Unable to stop JDMP site container."
        exit 1
}

cd /portfolio/JD-Multiprocess-Services-Website/frontend || {
        echo "Unable to change directories."
        exit 1
}

npm run build || {
        echo "Build attempt failed."
        exit 1
}

sudo mv dist build || {
        echo "Rename failed."
        exit 1
}

rm -rf /portfolio/JD-Multiprocess-Services-Website/backend/build || {
        echo "Unable to delete build folder."
        exit 1
}

mv build /portfolio/JD-Multiprocess-Services-Website/backend || {
        echo "Unable to overwrite build folder."
        exit 1
}

cd /portfolio/JD-Multiprocess-Services-Website || {
        echo "Unable to change directories."
        exit 1
}

sudo docker-compose up --build -d || {
        echo "Unable to build and start JDMP site container."
        exit 1
}

echo "The JDMP frontend was rebuilt. The Docker container was started and is successfully serving the notary site!"
exit 1