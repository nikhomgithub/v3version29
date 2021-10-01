echo "server_auth"
cd ~/Documents/Homework4/v3/server_auth
echo "nikhom" | sudo docker-compose up -d
echo "nikhom" | sudo docker-compose ps

echo "server_1"
cd ~/Documents/Homework4/v3/server_1
echo "nikhom" | sudo docker-compose up -d
echo "nikhom" | sudo docker-compose ps

echo "server_25"
cd ~/Documents/Homework4/v3/server_25
echo "nikhom" | sudo docker-compose up -d
echo "nikhom" | sudo docker-compose ps

echo "server_27"
cd ~/Documents/Homework4/v3/server_27
echo "nikhom" | sudo docker-compose up -d
echo "nikhom" | sudo docker-compose ps

echo "nginx"
cd ~/Documents/Homework4/v3/nginx
echo "nikhom" | sudo docker-compose up -d
echo "nikhom" | sudo docker-compose ps

#cd ~/Documents/Homework4/v3/server_27
#echo "nikhom" | sudo docker-compose down

#cd ~/Documents/Homework4/v3/server_27
#echo "nikhom" | sudo docker-compose upe