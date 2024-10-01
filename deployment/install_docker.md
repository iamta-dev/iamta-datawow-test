ec2 Amazon Linux 2023

## Install Git
```sh
sudo dnf install git -y
```

## Install Make
```sh
sudo dnf install make -y
```

## Install Development Tools (Optional)
```sh
sudo dnf groupinstall "Development Tools" -y
```

## Install Docker
```sh
sudo dnf install docker
sudo systemctl start docker
sudo systemctl enable docker
sudo docker --version
groups
newgrp docker
sudo usermod -aG docker $USER
sudo chmod 666 /var/run/docker.sock
groups
exit
docker ps
```

## Install Docker Compose
```sh
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```
